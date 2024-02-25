import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import {
  Leaderboard,
  CategoryList,
  NewThreadButton,
} from '@/components/fragments';
import { useAsyncSelector, useVoteFactory } from '@/hooks';
import {
  useOutletContext as useMainLayoutOutletContext,
  useParams,
} from 'react-router-dom';
import { threadDetailThunks } from '@/store/thread-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { ThreadDetail } from '@/components/fragments/threads';
import {
  CommentInput,
  CommentsList,
  Comment,
} from '@/components/fragments/comments';
import { toast } from '@/components/ui/toast';
import { leaderboardThunks } from '@/store/leaderboard';

export function ThreadDetailPage() {
  const dispatch = useDispatch();
  const { isInitialized } = useMainLayoutOutletContext();

  const authUser = useSelector((states) => states.authUser);

  const voteFactory = useVoteFactory();

  const { threadId } = useParams();
  const [threadDetail, isThreadDetailInitialized] = useAsyncSelector(
    (states) => states.threadDetail,
    () => dispatch(threadDetailThunks.asyncSet(threadId)),
  );

  const handleComment = async (newComment) => {
    try {
      await dispatch(
        threadDetailThunks.asyncAddComment({ threadId, content: newComment }),
      );
      await dispatch(leaderboardThunks.asyncSetLeaderboard());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-4 flex flex-col items-start gap-6 md:flex-row md:gap-4">
      {isInitialized && isThreadDetailInitialized ? (
        <div className="w-full md:w-3/4">
          <ThreadDetail
            className="rounded-b-none border-b-0 duration-300 animate-in fade-in"
            authUserId={authUser?.id}
            threadDetail={threadDetail}
            onUpvote={voteFactory(threadDetailThunks.asyncUpvote)}
            onDownvote={voteFactory(threadDetailThunks.asyncDownvote)}
            onNeutralizeUpvote={voteFactory(
              threadDetailThunks.asyncNeutralizeUpvote,
            )}
            onNeutralizeDownvote={voteFactory(
              threadDetailThunks.asyncNeutralizeDownvote,
            )}
          />

          <CommentInput
            onSubmit={handleComment}
            className="rounded-t-none border-t-0 duration-300 animate-in fade-in"
          />

          <hr className="my-4 w-full border-gray-300" />

          <CommentsList totalComments={threadDetail?.comments.length}>
            {threadDetail?.comments.map((comment) => (
              <Comment
                threadId={threadId}
                authUserId={authUser?.id}
                comment={comment}
                key={comment.id}
                onUpvote={voteFactory(threadDetailThunks.asyncUpvoteComment)}
                onDownvote={voteFactory(
                  threadDetailThunks.asyncDownvoteComment,
                )}
                onNeutralizeUpvote={voteFactory(
                  threadDetailThunks.asyncNeutralizeUpvoteComment,
                )}
                onNeutralizeDownvote={voteFactory(
                  threadDetailThunks.asyncNeutralizeDownvoteComment,
                )}
              />
            ))}
          </CommentsList>
        </div>
      ) : (
        <div className="w-full grow basis-3/4 md:w-auto">
          <Skeleton
            amount={1}
            skeletonWrapperClassName="w-full mb-4"
            className="mb-4 h-96"
          />

          <Skeleton
            amount={4}
            gap={8}
            skeletonWrapperClassName="w-full"
            className="h-20"
          />
        </div>
      )}

      <hr className="w-full border-gray-300 md:hidden" />

      <div className="top-20 flex w-full flex-col gap-4 md:sticky md:w-1/4">
        <NewThreadButton />
        <CategoryList />
        <Leaderboard />
      </div>
    </div>
  );
}
