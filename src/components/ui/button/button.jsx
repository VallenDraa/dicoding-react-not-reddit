/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';
import { Link } from 'react-router-dom';

export function Button({
  onClick,
  size,
  to,
  className,
  disabled,
  variant,
  children,
  icon,
  type,
  pill,
  square,
}) {
  const classNames = cn(
    'flex cursor-pointer items-center justify-center rounded-md transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    {
      'gap-3': icon !== null,
      'rounded-3xl': pill,
      'px-2 py-1 text-sm': size === 'small',
      'px-4 py-2': size === 'normal',
      'px-6 py-3': size === 'big',
      'aspect-square': square,
    },
    {
      'font-bold bg-transparent border border-teal-500 hover:bg-teal-50 text-teal-500':
        variant === 'outline-primary',
      'font-bold bg-transparent border border-red-500 hover:bg-red-50 text-red-500 focus-within:ring-red-500':
        variant === 'outline-danger',
      'font-bold bg-red-500 text-white hover:bg-red-600 disabled:hover:bg-red-500 focus-within:ring-red-500':
        variant === 'danger',
      'font-bold bg-teal-500 text-white hover:bg-teal-600 disabled:hover:bg-teal-500':
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
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames}
    >
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
  square: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: undefined,
  to: undefined,
  type: 'button',
  variant: 'primary',
  pill: false,
  square: false,
  onClick: undefined,
  size: 'normal',
  icon: undefined,
  disabled: undefined,
};
