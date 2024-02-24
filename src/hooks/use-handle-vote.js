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
    if (upVotesBy.includes(authUserId)) {
      onNeutralizeUpvote(threadId);
    } else {
      onNeutralizeDownvote(threadId);
      onUpvote(threadId);
    }
  };

  const handleDownvoteLogic = () => {
    if (downVotesBy.includes(authUserId)) {
      onNeutralizeDownvote(threadId);
    } else {
      onNeutralizeUpvote(threadId);
      onDownvote(threadId);
    }
  };

  return { handleDownvoteLogic, handleUpvoteLogic };
}
