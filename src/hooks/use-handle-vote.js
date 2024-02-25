export function useHandleVote({
  upVotesBy,
  downVotesBy,
  authUserId,
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
  threadId,
}) {
  const handleUpvoteLogic = () => {
    if (!authUserId) {
      return;
    }

    if (upVotesBy.includes(authUserId)) {
      onNeutralizeUpvote(threadId);
    } else {
      onNeutralizeDownvote(threadId);
      onUpvote(threadId);
    }
  };

  const handleDownvoteLogic = () => {
    if (!authUserId) {
      return;
    }

    if (downVotesBy.includes(authUserId)) {
      onNeutralizeDownvote(threadId);
    } else {
      onNeutralizeUpvote(threadId);
      onDownvote(threadId);
    }
  };

  return { handleDownvoteLogic, handleUpvoteLogic };
}
