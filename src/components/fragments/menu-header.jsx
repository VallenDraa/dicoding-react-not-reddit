import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconListDetails, IconLogout } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dropdown } from '@/components/ui/dropdown';
import { toast } from '@/components/ui/toast';
import { authUserThunks } from '@/store/auth-user';
import { Link } from 'react-router-dom';

export function MenuHeader({ isStoreInitialized }) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogout = async () => {
    try {
      await dispatch(authUserThunks.asyncLogout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="container sticky top-0 z-10 flex items-center justify-between gap-2 bg-white py-4 md:gap-4">
      {/* Logo */}
      <h4 className="font-extrabold leading-tight text-teal-500 ">
        <Link
          to="/"
          className="flex items-center gap-1 font-extrabold leading-tight text-teal-500"
        >
          <IconListDetails />

          <span className="hidden md:inline">Not Reddit</span>
        </Link>
      </h4>

      {/* Search bar */}
      <Input
        pill
        type="search"
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Posts"
        className="grow"
      />
      {/* User  */}
      <div>
        {!isStoreInitialized && (
          <Skeleton amount={1} className="h-11 w-24 rounded-3xl px-4 py-2" />
        )}

        {isStoreInitialized && !authUser && (
          <Button pill to="/login">
            Log In
          </Button>
        )}

        {isStoreInitialized && authUser && (
          <Dropdown open={isUserMenuOpen} onToggle={setIsUserMenuOpen}>
            <Dropdown.Trigger>
              <Button
                pill
                variant="outline-primary"
                size="small"
                className="flex items-center gap-2"
              >
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="size-8 rounded-full border border-white"
                />
                <p className="max-w-32 truncate">{authUser.name}</p>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Body>
              <Dropdown.Item onClick={handleLogout}>
                <IconLogout size={20} />
                Log Out
              </Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        )}
      </div>
    </header>
  );
}

MenuHeader.propTypes = {
  isStoreInitialized: PropTypes.bool.isRequired,
};
