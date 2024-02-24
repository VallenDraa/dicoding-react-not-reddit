/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React from 'react';
import { threadDetailValidator } from '@/utils/validator';
import { useHandleVote } from '@/hooks/use-handle-vote';
import { cn } from '@/utils';
import { ThreadFragment } from './thread-fragment';

export function ThreadDetail({
  className,
  threadDetail,
  authUserId,
  onDownvote,
  onNeutralizeDownvote,
  onNeutralizeUpvote,
  onUpvote,
}) {
  const { id: threadId, upVotesBy, downVotesBy, comments } = threadDetail;

  const { handleDownvoteLogic, handleUpvoteLogic } = useHandleVote({
    threadId,
    authUserId,
    downVotesBy,
    onDownvote,
    onNeutralizeDownvote,
    onNeutralizeUpvote,
    onUpvote,
    upVotesBy,
  });

  return (
    <ThreadFragment
      className={cn(className)}
      authUserId={authUserId}
      onDownvote={handleDownvoteLogic}
      onUpvote={handleUpvoteLogic}
      thread={{ ...threadDetail, totalComments: comments.length }}
    />
  );
}

ThreadDetail.propTypes = {
  authUserId: PropTypes.string.isRequired,
  className: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeUpvote: PropTypes.func.isRequired,
  onNeutralizeDownvote: PropTypes.func.isRequired,
  threadDetail: PropTypes.shape(threadDetailValidator).isRequired,
};

ThreadDetail.defaultProps = {
  className: '',
};
