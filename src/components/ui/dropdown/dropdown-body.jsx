import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';
import { useDropdownContext } from './use-dropdown-context';
import { Card } from '../card';

export function DropdownBody({ className, children }) {
  const { isOpen, isAnimating } = useDropdownContext();

  return isOpen || isAnimating ? (
    <Card
      className={cn(
        'absolute right-0 top-12 p-1 shadow transition duration-100',
        isOpen
          ? 'animate-in fade-in slide-in-from-bottom-0.5'
          : 'animate-out fade-out slide-out-to-bottom-0.5',
        className,
      )}
    >
      {children}
    </Card>
  ) : null;
}

DropdownBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DropdownBody.defaultProps = {
  className: '',
};
