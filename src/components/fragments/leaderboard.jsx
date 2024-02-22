import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { leaderboardThunks } from '@/store/leaderboard';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/toast';
import { cn, formatNumber } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function Leaderboard() {
  const leaderboardData = useSelector((states) => states.leaderboard);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        await dispatch(leaderboardThunks.asyncSetLeaderboard());
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <Card className="max-w-72 px-0">
      <header className="mb-4 px-4">
        <h4 className="text-gray-700">Leaderboard</h4>
      </header>
      <ul
        className={cn(
          'flex max-h-80 flex-col gap-2 overflow-y-auto px-4 text-gray-600',
          { 'divide-y divide-gray-200': !loading },
        )}
      >
        {loading ? (
          <Skeleton gap={8} className="h-12 w-full" amount={6} />
        ) : (
          leaderboardData.map(({ user, score }) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-2 pt-2"
            >
              <div className="flex items-center gap-2">
                <img
                  className="size-9 rounded-full"
                  src={user.avatar}
                  alt={user.name}
                />
                <p className="max-w-32 truncate text-sm">{user.name}</p>
              </div>

              <p className="text-base">{formatNumber(score)}</p>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
}
