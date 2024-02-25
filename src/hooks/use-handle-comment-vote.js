export function useHandleCommentVote({
  upVotesBy,
  downVotesBy,
  authUserId,
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
  commentId,
  threadId,
}) {
  const handleUpvoteLogic = () => {
    if (!authUserId) {
      return;
    }

    if (upVotesBy.includes(authUserId)) {
      onNeutralizeUpvote({ commentId, threadId });
    } else {
      onNeutralizeDownvote({ commentId, threadId });
      onUpvote({ commentId, threadId });
    }
  };

  const handleDownvoteLogic = () => {
    if (!authUserId) {
      return;
    }

    if (downVotesBy.includes(authUserId)) {
      onNeutralizeDownvote({ commentId, threadId });
    } else {
      onNeutralizeUpvote({ commentId, threadId });
      onDownvote({ commentId, threadId });
    }
  };

  return { handleDownvoteLogic, handleUpvoteLogic };
}
