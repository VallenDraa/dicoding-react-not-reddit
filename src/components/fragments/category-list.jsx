import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  useOutletContext as useMainLayoutOutletContext,
  useParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function CategoryList({ className }) {
  const { category: activeCategory } = useParams();

  const threads = useSelector((state) => state.threads);
  const { isInitialized } = useMainLayoutOutletContext();

  const categories = React.useMemo(
    () =>
      [...(new Set(threads?.map((thread) => thread.category)) ?? [])].slice(
        0,
        6,
      ),
    [threads],
  );

  return (
    <Card className={className}>
      <header className="mb-2">
        <h4>Top Categories</h4>
      </header>

      <ul className="flex flex-wrap items-center gap-2">
        {isInitialized ? (
          categories.map((category) => (
            <li key={category} className="duration-300 animate-in fade-in">
              <Button
                size="small"
                to={activeCategory === category ? '/' : `/${category}`}
                variant={
                  activeCategory === category ? 'primary' : 'outline-primary'
                }
              >
                {`nr/${category}`}
              </Button>
            </li>
          ))
        ) : (
          <Skeleton
            amount={5}
            className="m-1 h-8 w-20 grow"
            skeletonWrapperClassName="flex-wrap flex-row"
          />
        )}
      </ul>
    </Card>
  );
}

CategoryList.propTypes = {
  className: PropTypes.string,
};

CategoryList.defaultProps = {
  className: '',
};
