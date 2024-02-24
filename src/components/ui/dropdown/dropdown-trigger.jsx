import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';
import { useDropdownContext } from './use-dropdown-context';

export function DropdownTrigger({ className, children }) {
  const { handleToggle } = useDropdownContext();

  return (
    <div
      className={cn(className)}
      role="button"
      onClick={handleToggle}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

DropdownTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DropdownTrigger.defaultProps = {
  className: '',
};
