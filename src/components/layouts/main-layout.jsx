import React from 'react';
import { ScrollRestoration, Outlet } from 'react-router-dom';
import { MenuHeader } from '@/components/fragments';
import { useDispatch } from 'react-redux';
import { usersThunks } from '@/store/users';
import { threadsThunks } from '@/store/threads';
import { authUserThunks } from '@/store/auth-user';
import { leaderboardThunks } from '@/store/leaderboard';
import { toast } from '@/components/ui/toast';
import { tokenHandler } from '@/utils';

export function MainLayout() {
  // Initialize store
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (!isInitialized) {
        try {
          if (tokenHandler.getAccessToken()) {
            await dispatch(authUserThunks.asyncGetAuthUser());
          }

          await dispatch(leaderboardThunks.asyncSetLeaderboard());
          await dispatch(usersThunks.asyncSeeAllUsers());
          await dispatch(threadsThunks.asyncSet());
        } catch (error) {
          toast.error(error.message);
        }

        setIsInitialized(true);
      }
    })();
  }, [isInitialized, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <MenuHeader isStoreInitialized={isInitialized} />
      <main className="grow">
        <Outlet context={{ isInitialized }} />
        <ScrollRestoration/>
      </main>
      <footer className="container flex items-center justify-between py-4 font-bold text-teal-500">
        <span className="text-sm">Not Blocked, Not Reddit.</span>
        <span className="text-sm">Made by VallenDra</span>
      </footer>
    </div>
  );
}
