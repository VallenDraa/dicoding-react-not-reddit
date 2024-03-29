import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils';

export function Skeleton({ amount, gap, className, skeletonWrapperClassName }) {
  return (
    <div
      style={{ gap }}
      className={cn('flex flex-col', skeletonWrapperClassName)}
    >
      {new Array(amount).fill(null).map((item, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          role="presentation"
          className={cn('animate-pulse rounded-md bg-gray-200/60', className)}
        />
      ))}
    </div>
  );
}

Skeleton.propTypes = {
  amount: PropTypes.number,
  gap: PropTypes.number,
  className: PropTypes.string,
  skeletonWrapperClassName: PropTypes.string,
};

Skeleton.defaultProps = {
  amount: 1,
  gap: 0,
  className: '',
  skeletonWrapperClassName: '',
};
