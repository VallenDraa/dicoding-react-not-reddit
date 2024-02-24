import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';

export function ThreadsList({ className, children }) {
  return <ul className={cn('space-y-4', className)}>{children}</ul>;
}

ThreadsList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ThreadsList.defaultProps = {
  className: '',
};
