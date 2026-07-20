import React from 'react';
import './Rating.scss';

const Rating = React.memo(({ value, count, showCount = true, size = 'sm' }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`rating rating-${size}`}>
      <div className="rating__stars">
        {stars.map((star) => (
          <svg
            key={star}
            className={`rating__star ${star <= Math.round(value) ? 'filled' : ''}`}
            width={size === 'sm' ? 14 : 18}
            height={size === 'sm' ? 14 : 18}
            viewBox="0 0 24 24"
            fill={star <= Math.round(value) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      {showCount && count > 0 && (
        <span className="rating__count">({count})</span>
      )}
    </div>
  );
});

Rating.displayName = 'Rating';
export default Rating;