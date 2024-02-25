import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Leaderboard, CategoryList } from '@/components/fragments';
import { useAsyncSelector, useVoteFactory } from '@/hooks';
import {
  useOutletContext as useMainLayoutOutletContext,
  useParams,
} from 'react-router-dom';
import { threadDetailThunks } from '@/store/thread-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { ThreadDetail } from '@/components/fragments/threads';

export function ThreadDetailPage() {
  const dispatch = useDispatch();
  const { isInitialized } = useMainLayoutOutletContext();

  const authUser = useSelector((states) => states.authUser);

  const { threadId } = useParams();
  const threadVoteFactory = useVoteFactory();
  const [threadDetail, isThreadDetailInitialized] = useAsyncSelector(
    (states) => states.threadDetail,
    () => dispatch(threadDetailThunks.asyncSet(threadId)),
  );

  return (
    <div className="container mt-4 flex flex-col-reverse items-start gap-6 md:flex-row md:gap-4">
      {isInitialized && isThreadDetailInitialized ? (
        <ThreadDetail
          className="grow basis-3/4 duration-300 animate-in fade-in"
          authUserId={authUser?.id}
          threadDetail={threadDetail}
          onUpvote={threadVoteFactory(threadDetailThunks.asyncUpvote)}
          onDownvote={threadVoteFactory(threadDetailThunks.asyncDownvote)}
          onNeutralizeUpvote={threadVoteFactory(
            threadDetailThunks.asyncNeutralizeUpvote,
          )}
          onNeutralizeDownvote={threadVoteFactory(
            threadDetailThunks.asyncNeutralizeDownvote,
          )}
        />
      ) : (
        <Skeleton
          amount={1}
          skeletonWrapperClassName="grow w-full basis-3/4 md:w-auto"
          className="h-60"
        />
      )}

      <hr className="w-full border-gray-300 md:hidden" />

      <div className="top-20 flex w-full flex-col-reverse gap-4 md:sticky md:w-auto md:basis-72 md:flex-col">
        <CategoryList />
        <Leaderboard />
      </div>
    </div>
  );
}
