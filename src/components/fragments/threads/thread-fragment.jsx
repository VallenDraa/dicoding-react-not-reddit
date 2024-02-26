/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { ownerValidator } from '@/utils/validator';
import {
  IconArrowBigUpFilled,
  IconArrowBigUp,
  IconArrowBigDownFilled,
  IconArrowBigDown,
  IconMessage,
} from '@tabler/icons-react';
import { cn } from '@/utils';

export function ThreadFragment({
  className,
  thread,
  authUserId,
  onUpvote,
  onDownvote,
}) {
  const {
    id: threadId,
    title,
    body,
    owner,
    upVotesBy,
    downVotesBy,
    totalComments,
    category,
    createdAt,
  } = thread;

  const date = new Date(createdAt).toDateString();

  return (
    <Card className={cn(className)}>
      <Button
        to={`/nr/${category}`}
        variant="link"
        className="mb-0.5 inline-block px-0 font-bold text-teal-500"
      >
        {`nr/${category}`}
      </Button>

      <div className="mb-3">
        <h3 className="break-words text-gray-700">
          <Link
            className="underline-offset-2 hover:underline"
            to={`/threads/${threadId}`}
          >
            {title}
          </Link>
        </h3>

        <div className="flex items-center gap-2 pt-1 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Avatar className="size-5" image={owner.avatar} name={owner.name} />
            <p className="max-w-32 truncate text-sm">{owner.name}</p>
          </div>
          <span>•</span>
          <time dateTime={createdAt}>{date}</time>
        </div>
      </div>

      <div
        className="mb-4 w-full break-words border-b border-gray-200 py-2 text-gray-600"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="flex grow items-center justify-between gap-2">
        <div className="flex gap-1">
          <Button disabled={!authUserId} withIcon pill onClick={onUpvote}>
            <span className="sr-only">Upvote</span>
            {upVotesBy.includes(authUserId) ? (
              <IconArrowBigUpFilled size={20} />
            ) : (
              <IconArrowBigUp size={20} />
            )}

            <span>{upVotesBy.length}</span>
          </Button>
          <Button disabled={!authUserId} withIcon pill onClick={onDownvote}>
            <span className="sr-only">Downvote</span>
            {downVotesBy.includes(authUserId) ? (
              <IconArrowBigDownFilled size={20} />
            ) : (
              <IconArrowBigDown size={20} />
            )}
            <span>{downVotesBy.length}</span>
          </Button>
        </div>

        <Button
          to={`/threads/${threadId}`}
          variant="link"
          className="flex items-center gap-2 px-2 text-teal-500"
        >
          <span className="sr-only">Total Comments</span>
          <IconMessage />
          <span>{totalComments}</span>
        </Button>
      </div>
    </Card>
  );
}

ThreadFragment.propTypes = {
  className: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  authUserId: PropTypes.string,
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape(ownerValidator),
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

ThreadFragment.defaultProps = {
  className: '',
  authUserId: undefined,
};
