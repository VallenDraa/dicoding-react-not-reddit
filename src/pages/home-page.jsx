import React from 'react';
import { useSelector } from 'react-redux';
import { threadsThunks } from '@/store/threads';
import {
  Thread,
  ThreadsList,
  Leaderboard,
  CategoryList,
} from '@/components/fragments';

import {
  useSearchParams,
  useParams,
  useOutletContext as useMainLayoutOutletContext,
} from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useVoteFactory } from '@/hooks';

export function HomePage() {
  const { isInitialized } = useMainLayoutOutletContext();
  const authUser = useSelector((states) => states.authUser);

  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const threadVoteFactory = useVoteFactory();
  const threads = useSelector((states) => states.threads);
  const filteredThreads = React.useMemo(() => {
    let finalResult = threads ?? [];

    if (category) {
      finalResult = finalResult?.filter(
        (thread) => thread.category === category,
      );
    }

    if (keyword) {
      const lowerCasedKeyword = keyword.toLowerCase();

      finalResult = finalResult.filter(
        (thread) =>
          thread.title.toLowerCase().includes(lowerCasedKeyword) ||
          thread.body.toLowerCase().includes(lowerCasedKeyword),
      );
    }

    return finalResult;
  }, [threads, category, keyword]);

  return (
    <div className="container mt-4 flex flex-col-reverse items-start gap-6 md:flex-row md:gap-4">
      <ThreadsList title="Latest Threads" className="grow basis-3/4 animate-in">
        {isInitialized ? (
          filteredThreads?.map((thread) => (
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

      <aside className="top-20 flex w-full flex-col-reverse gap-4 md:sticky md:w-auto md:basis-72 md:flex-col">
        <CategoryList />
        <Leaderboard />
      </aside>
    </div>
  );
}
