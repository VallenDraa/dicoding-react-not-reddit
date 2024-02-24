import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { IconListDetails } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../ui/skeleton';

export function MenuHeader({ isStoreInitialized }) {
  const authUser = useSelector((states) => states.authUser);

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <header className="container sticky top-0 z-10 flex items-center justify-between gap-2 bg-white py-4 md:gap-4">
      {/* Logo */}
      <div className="hidden md:block">
        <h4 className="flex items-center gap-1 font-extrabold leading-tight text-teal-500">
          <IconListDetails />
          Not Reddit
        </h4>
      </div>

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
        )}
      </div>
    </header>
  );
}

MenuHeader.propTypes = {
  isStoreInitialized: PropTypes.bool.isRequired,
};
