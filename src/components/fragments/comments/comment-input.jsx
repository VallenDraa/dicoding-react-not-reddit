/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSend } from '@tabler/icons-react';
import { cn } from '@/utils';
import { Wysiwg } from '@/components/ui/wysiwyg';

export function CommentInput({ authUserId, className, onSubmit }) {
  const [newComment, setNewComment] = React.useState('');

  const handleCommentChange = (newInputComment) => {
    setNewComment(newInputComment === '<p><br></p>' ? '' : newInputComment);
  };

  const handleSubmit = () => {
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <Card className={cn(className)}>
      <h4 className="mb-2 text-gray-700">New Comment</h4>

      {authUserId ? (
        <>
          <Wysiwg
            className="mb-4"
            value={newComment}
            onChange={handleCommentChange}
          />

          <Button
            disabled={!newComment}
            onClick={handleSubmit}
            pill
            withIcon
            className="w-full"
          >
            <IconSend size={20} />
            Send
          </Button>
        </>
      ) : (
        <div className="my-3 flex flex-col items-center">
          <h3 className="text-gray-700">Login to add a comment!</h3>
          <p className="flex items-center text-gray-500">
            You can follow this{' '}
            <Button to="/login" variant="link" className="px-1 font-bold">
              Link
            </Button>
            to login.
          </p>
        </div>
      )}
    </Card>
  );
}

CommentInput.propTypes = {
  authUserId: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {
  authUserId: '',
  className: '',
};
