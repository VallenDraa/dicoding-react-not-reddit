import { cn } from '@/utils';
import PropTypes from 'prop-types';
import React from 'react';

export function DropdownItem({ className, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'my-1 flex cursor-pointer items-center gap-2 truncate rounded p-2 text-sm duration-200 hover:bg-gray-200',
        className,
      )}
    >
      {children}
    </button>
  );
}

DropdownItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DropdownItem.defaultProps = {
  onClick: undefined,
  className: '',
};
