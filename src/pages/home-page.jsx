import React from 'react';
import { useSelector } from 'react-redux';
import { threadsThunks } from '@/store/threads';
import {
  Leaderboard,
  CategoryList,
  NewThreadButton,
} from '@/components/fragments';

import {
  useSearchParams,
  useParams,
  useOutletContext as useMainLayoutOutletContext,
} from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useVoteFactory } from '@/hooks';
import { Thread, ThreadsList } from '@/components/fragments/threads';

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
      <ThreadsList
        title="Latest Threads"
        className="w-full animate-in md:w-3/4"
      >
        {isInitialized &&
          filteredThreads.length > 0 &&
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
          ))}

        {isInitialized && filteredThreads.length === 0 && (
          <p className="my-5 text-center text-gray-500">
            There are no threads to be found.
          </p>
        )}

        {!isInitialized && (
          <Skeleton
            amount={4}
            gap={16}
            skeletonWrapperClassName="grow w-full basis-3/4 md:w-auto"
            className="h-60"
          />
        )}
      </ThreadsList>

      <hr className="w-full border-gray-300 md:hidden" />

      <aside className="top-20 flex w-full flex-col-reverse gap-4 md:sticky md:w-1/4 md:flex-col">
        <NewThreadButton />
        <CategoryList />
        <Leaderboard />
      </aside>
    </div>
  );
}
