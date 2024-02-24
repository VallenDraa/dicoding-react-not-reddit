/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconMessage,
  IconArrowBigDownFilled,
  IconArrowBigUpFilled,
} from '@tabler/icons-react';
import { threadValidator } from '@/utils/validator';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Thread({
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
  className,
  thread,
  authUserId,
}) {
  const {
    id,
    title,
    body,
    ownerId,
    upVotesBy,
    downVotesBy,
    totalComments,
    category,
    createdAt,
  } = thread;

  const users = useSelector((states) => states.users);
  const owner = React.useMemo(
    () => users.find((user) => user?.id === ownerId),
    [ownerId, users],
  );
  const date = new Date(createdAt).toDateString();

  const handleUpvoteLogic = () => {
    if (upVotesBy.includes(authUserId)) {
      onNeutralizeUpvote(id);
    } else {
      onNeutralizeDownvote(id);
      onUpvote(id);
    }
  };

  const handleDownvoteLogic = () => {
    if (downVotesBy.includes(authUserId)) {
      onNeutralizeDownvote(id);
    } else {
      onNeutralizeUpvote(id);
      onDownvote(id);
    }
  };

  return (
    <li className={className}>
      <Card>
        <Button
          to={`/${category}`}
          variant="link"
          className="mb-0.5 inline-block px-0 font-bold text-teal-500"
        >
          {`nr/${category}`}
        </Button>

        <div className="mb-3">
          <h3 className="text-gray-700">
            <Link
              className="underline-offset-2 hover:underline"
              to={`/threads/${id}`}
            >
              {title}
            </Link>
          </h3>
          <time className="text-sm text-gray-400" dateTime={createdAt}>
            {date}
          </time>
        </div>

        <div
          className="mb-4 border-b border-gray-200 pb-4 text-gray-600"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex grow gap-1">
            <Button withIcon pill onClick={handleUpvoteLogic}>
              <span className="sr-only">Upvote</span>
              {upVotesBy.includes(authUserId) ? (
                <IconArrowBigUpFilled size={20} />
              ) : (
                <IconArrowBigUp size={20} />
              )}

              <span>{upVotesBy.length}</span>
            </Button>
            <Button withIcon pill onClick={handleDownvoteLogic}>
              <span className="sr-only">Downvote</span>
              {downVotesBy.includes(authUserId) ? (
                <IconArrowBigDownFilled size={20} />
              ) : (
                <IconArrowBigDown size={20} />
              )}
              <span>{downVotesBy.length}</span>
            </Button>
            <div className="flex items-center gap-2 px-2 text-teal-500">
              <span className="sr-only">Total Comments</span>
              <IconMessage />
              <span>{totalComments}</span>
            </div>
          </div>

          <p className="text-sm">
            Thread by: <strong>{owner?.name}</strong>
          </p>
        </div>
      </Card>
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
