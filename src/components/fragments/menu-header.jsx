import React from 'react';
import { useSelector } from 'react-redux';
import { IconListDetails } from '@tabler/icons-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function MenuHeader() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const authUser = useSelector((states) => states.authUser);

  return (
    <header className="container flex items-center justify-between gap-2 py-4 md:gap-4">
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
        {authUser ? (
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
        ) : (
          <Button pill to="/login">
            Log In
          </Button>
        )}
      </div>
    </header>
  );
}
