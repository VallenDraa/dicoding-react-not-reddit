/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSend } from '@tabler/icons-react';
import { cn } from '@/utils';

export function CommentInput({ className, onSubmit }) {
  const [newComment, setNewComment] = React.useState('');
  const editorRef = React.useRef(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.innerHTML);
  };

  const handleSubmit = () => {
    onSubmit(newComment);
    setNewComment('');
    editorRef.current.innerHTML = '';
  };

  return (
    <Card className={cn(className)}>
      <h4 className="mb-2 text-gray-700">New Comment</h4>

      <div
        ref={editorRef}
        className={cn(
          'mb-4 max-h-72 min-h-20 overflow-y-auto overflow-x-hidden rounded-md bg-gray-200/50 p-2 text-gray-600 transition duration-200',
          // Add custom place holder to the contenteditable div
          '[&[placeholder]]:empty:before:text-gray-400 [&[placeholder]]:empty:before:content-[attr(placeholder)]',
        )}
        contentEditable
        suppressContentEditableWarning
        placeholder="Type WYSIWYG comment here.."
        onInput={handleCommentChange}
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
