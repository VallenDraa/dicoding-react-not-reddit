/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { commentValidator } from '@/utils/validator';
import { useSelector } from 'react-redux';
import { useHandleCommentVote } from '@/hooks';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  IconArrowBigUpFilled,
  IconArrowBigUp,
  IconArrowBigDownFilled,
  IconArrowBigDown,
} from '@tabler/icons-react';

export function Comment({
  comment,
  authUserId,
  threadId,
  className,
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
}) {
  const {
    id: commentId,
    content,
    createdAt,
    upVotesBy,
    downVotesBy,
    owner,
  } = comment;

  const users = useSelector((state) => state.users);
  const commenter = React.useMemo(
    () => users.find((user) => user.id === owner.id),
    [users, owner.id],
  );

  const date = new Date(createdAt).toDateString();

  const { handleDownvoteLogic, handleUpvoteLogic } = useHandleCommentVote({
    authUserId,
    onUpvote,
    onDownvote,
    onNeutralizeUpvote,
    onNeutralizeDownvote,
    downVotesBy,
    upVotesBy,
    commentId,
    threadId,
  });

  return (
    <Card className={cn(className)}>
      <div className="flex items-center gap-2 pt-1 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Avatar
            className="size-5"
            image={commenter?.avatar}
            name={commenter?.name ?? owner.name}
          />
          <p className="max-w-32 truncate text-sm">{owner.name}</p>
        </div>
        <span>•</span>
        <time dateTime={createdAt}>{date}</time>
      </div>

      <div
        className="mb-4 border-b border-gray-200 py-2 text-gray-600"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="flex grow items-center gap-1">
        <Button
          disabled={!authUserId}
          withIcon
          pill
          onClick={handleUpvoteLogic}
        >
          <span className="sr-only">Upvote</span>
          {upVotesBy.includes(authUserId) ? (
            <IconArrowBigUpFilled size={20} />
          ) : (
            <IconArrowBigUp size={20} />
          )}

          {upVotesBy.length}
        </Button>
        <Button
          disabled={!authUserId}
          withIcon
          pill
          onClick={handleDownvoteLogic}
        >
          <span className="sr-only">Downvote</span>
          {downVotesBy.includes(authUserId) ? (
            <IconArrowBigDownFilled size={20} />
          ) : (
            <IconArrowBigDown size={20} />
          )}
          {downVotesBy.length}
        </Button>
      </div>
    </Card>
  );
}

Comment.propTypes = {
  threadId: PropTypes.string.isRequired,
  authUserId: PropTypes.string,
  className: PropTypes.string,
  comment: PropTypes.shape(commentValidator).isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeUpvote: PropTypes.func.isRequired,
  onNeutralizeDownvote: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  authUserId: '',
  className: '',
};
