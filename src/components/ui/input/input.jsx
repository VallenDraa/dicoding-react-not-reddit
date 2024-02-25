import PropTypes from 'prop-types';
import React from 'react';
import { cn } from '@/utils';

export function Input({
  className,
  pill,
  id,
  value,
  onChange,
  type,
  placeholder,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        'bg-gray-100 px-4 py-2 text-gray-600 transition duration-200 placeholder:text-gray-400 focus-within:outline-none',
        pill ? 'rounded-3xl' : 'rounded-md',
        className,
      )}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  pill: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  pill: true,
  id: undefined,
  placeholder: undefined,
};
