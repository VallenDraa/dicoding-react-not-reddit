import { cn } from '@/utils';
import PropTypes from 'prop-types';

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        'rounded-md border border-gray-100 bg-gray-50 p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  className: '',
};
