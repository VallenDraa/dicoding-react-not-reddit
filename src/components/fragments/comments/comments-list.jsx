import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';

export function CommentsList({ totalComments, children, className }) {
  return (
    <div>
      <h4 className="mb-2 text-gray-700">{`Comments (${totalComments})`}</h4>
      <ul className={cn('space-y-4', className)}>{children}</ul>
    </div>
  );
}

CommentsList.propTypes = {
  totalComments: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CommentsList.defaultProps = {
  className: '',
};
