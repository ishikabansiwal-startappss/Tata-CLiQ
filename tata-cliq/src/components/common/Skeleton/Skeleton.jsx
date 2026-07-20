import React from 'react';
import './Skeleton.scss';

const Skeleton = React.memo(({ type = 'text', width, height, count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={`skeleton-el skeleton-${type}`}
          style={{ width, height }}
        />
      ))}
    </>
  );
});

export const ProductCardSkeleton = React.memo(() => (
  <div className="product-card-skeleton">
    <div className="skeleton-el skeleton-image" />
    <div className="product-card-skeleton__content">
      <div className="skeleton-el skeleton-text skeleton-text--sm" />
      <div className="skeleton-el skeleton-text skeleton-text--md" />
      <div className="skeleton-el skeleton-text skeleton-text--sm" style={{ width: '60%' }} />
      <div className="skeleton-el skeleton-text skeleton-text--sm" style={{ width: '40%' }} />
    </div>
  </div>
));

ProductCardSkeleton.displayName = 'ProductCardSkeleton';
Skeleton.displayName = 'Skeleton';
export default Skeleton;