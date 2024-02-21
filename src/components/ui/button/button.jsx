/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';
import { Link } from 'react-router-dom';

export function Button({
  to,
  className,
  disabled,
  variant,
  children,
  icon,
  type,
  pill,
}) {
  const classNames = cn(
    'flex cursor-pointer items-end justify-center rounded-md px-6 py-3 transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    {
      'gap-3': icon !== null,
      'rounded-3xl': pill,
    },
    {
      'bg-red-500 text-white hover:bg-red-600 disabled:hover:bg-red-500':
        variant === 'danger',
      'bg-teal-500 text-white hover:bg-teal-600 disabled:hover:bg-teal-500':
        variant === 'primary',
      'text-teal-500 decoration-teal-500 underline-offset-4 hover:underline disabled:hover:no-underline':
        variant === 'link',
    },
    className,
  );

  return to ? (
    <Link to={to} disabled={disabled} className={classNames}>
      {icon} {children}
    </Link>
  ) : (
    <button type={type} disabled={disabled} className={classNames}>
      {icon}
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  pill: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  to: undefined,
  type: 'button',
  variant: 'primary',
  pill: false,
  icon: undefined,
  disabled: undefined,
};
