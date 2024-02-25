import PropTypes from 'prop-types';
import React from 'react';
import { cn } from '@/utils';

export function Avatar({ className, image, name }) {
  return (
    <img
      className={cn(
        'size-5 rounded-full ring-[1px] ring-teal-500 ring-offset-2',
        className,
      )}
      src={image}
      alt={name}
    />
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  className: '',
};
