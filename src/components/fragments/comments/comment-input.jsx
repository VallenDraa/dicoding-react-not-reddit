/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSend } from '@tabler/icons-react';
import { cn } from '@/utils';
import { Wysiwg } from '@/components/ui/wysiwyg';

export function CommentInput({ className, onSubmit }) {
  const [newComment, setNewComment] = React.useState('');

  const handleCommentChange = (newInputComment) => {
    setNewComment(newInputComment);
  };

  const handleSubmit = () => {
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <Card className={cn(className)}>
      <h4 className="mb-2 text-gray-700">New Comment</h4>

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
    </Card>
  );
}

CommentInput.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {
  className: '',
};
