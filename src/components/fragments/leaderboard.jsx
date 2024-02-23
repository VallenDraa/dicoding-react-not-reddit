import React from 'react';
import { useDispatch } from 'react-redux';
import { leaderboardThunks } from '@/store/leaderboard';
import { Card } from '@/components/ui/card';
import { cn, formatNumber } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useAsyncSelector } from '@/hooks';
import PropTypes from 'prop-types';

export function Leaderboard({ className }) {
  const dispatch = useDispatch();

  const [leaderboardData, isInitialized] = useAsyncSelector(
    React.useCallback((states) => states.leaderboard, []),
    React.useCallback(
      () => dispatch(leaderboardThunks.asyncSetLeaderboard()),
      [dispatch],
    ),
  );

  return (
    <Card className={cn('px-0', className)}>
      <header className="mb-4 px-4">
        <h4 className="text-gray-700">Leaderboard</h4>
      </header>
      <ul
        className={cn(
          'flex max-h-80 flex-col gap-2 overflow-y-auto px-4 text-gray-600',
          { 'divide-y divide-gray-200': !isInitialized },
        )}
      >
        {isInitialized ? (
          leaderboardData?.map(({ user, score }) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-2 pt-2 duration-300 animate-in fade-in"
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
        ) : (
          <Skeleton gap={8} className="h-12 w-full" amount={6} />
        )}
      </ul>
    </Card>
  );
}

Leaderboard.propTypes = {
  className: PropTypes.string.isRequired,
};
