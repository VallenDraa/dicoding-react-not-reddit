import React from 'react';
import { useSelector } from 'react-redux';
import { threadsThunks } from '@/store/threads';
import {
  Thread,
  ThreadsList,
  Leaderboard,
  CategoryList,
} from '@/components/fragments';

import { useOutletContext as useMainLayoutOutletContext } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useVoteFactory } from '@/hooks';

export function HomePage() {
  const { isInitialized } = useMainLayoutOutletContext();
  const authUser = useSelector((states) => states.authUser);

  const threads = useSelector((states) => states.threads);
  const threadVoteFactory = useVoteFactory();

  return (
    <div className="container mt-4 flex flex-col-reverse items-start gap-6 md:flex-row md:gap-4">
      <ThreadsList title="Latest Threads" className="grow basis-3/4 animate-in">
        {isInitialized ? (
          threads?.map((thread) => (
            <Thread
              authUserId={authUser?.id}
              onUpvote={threadVoteFactory(threadsThunks.asyncUpvote)}
              onDownvote={threadVoteFactory(threadsThunks.asyncDownvote)}
              onNeutralizeUpvote={threadVoteFactory(
                threadsThunks.asyncNeutralizeUpVote,
              )}
              onNeutralizeDownvote={threadVoteFactory(
                threadsThunks.asyncNeutralizeDownVote,
              )}
              className="duration-300 animate-in fade-in"
              key={thread.id}
              thread={thread}
            />
          ))
        ) : (
          <Skeleton gap={16} amount={4} className="h-60 w-full" />
        )}
      </ThreadsList>

      <hr className="w-full border-gray-300 md:hidden" />

      <div className="top-20 flex w-full flex-col gap-4 md:sticky md:w-auto md:basis-72">
        <Leaderboard />
        <CategoryList />
      </div>
    </div>
  );
}
