import { cn } from '@/utils';
import PropTypes from 'prop-types';
import React from 'react';

export function DropdownItem({ disabled, className, onClick, children }) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={cn(
        'my-1 flex w-full items-center gap-2 truncate rounded p-2 text-sm duration-200',
        '[&:not(&:disabled)]:cursor-pointer [&:not(&:disabled)]:hover:bg-gray-200',
        className,
      )}
    >
      {children}
    </button>
  );
}

DropdownItem.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DropdownItem.defaultProps = {
  disabled: undefined,
  onClick: undefined,
  className: '',
};
