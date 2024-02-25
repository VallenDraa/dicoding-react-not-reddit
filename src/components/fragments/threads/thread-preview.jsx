/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { threadValidator } from '@/utils/validator';
import { useSelector } from 'react-redux';
import { useHandleThreadVote } from '@/hooks/use-handle-thread-vote';
import { ThreadFragment } from './thread-fragment';

export function Thread({
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
  className,
  thread,
  authUserId,
}) {
  const { ownerId, downVotesBy, id: threadId, upVotesBy } = thread;

  const users = useSelector((states) => states.users);
  const owner = React.useMemo(
    () => users.find((user) => user?.id === ownerId),
    [ownerId, users],
  );

  const { handleDownvoteLogic, handleUpvoteLogic } = useHandleThreadVote({
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
    <li className={className}>
      <ThreadFragment
        authUserId={authUserId}
        onDownvote={handleDownvoteLogic}
        onUpvote={handleUpvoteLogic}
        thread={{ ...thread, owner }}
      />
    </li>
  );
}

Thread.propTypes = {
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onNeutralizeUpvote: PropTypes.func,
  onNeutralizeDownvote: PropTypes.func,
  className: PropTypes.string,
  thread: PropTypes.shape(threadValidator).isRequired,
};

Thread.defaultProps = {
  authUserId: undefined,
  className: '',
  onUpvote: undefined,
  onDownvote: undefined,
  onNeutralizeUpvote: undefined,
  onNeutralizeDownvote: undefined,
};
