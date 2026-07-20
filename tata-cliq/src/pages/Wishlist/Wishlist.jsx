import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWishlistItems, removeFromWishlist, clearWishlist } from '../../redux/slices/wishlistSlice';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Button from '../../components/common/Button/Button';
import './Wishlist.scss';

const Wishlist = React.memo(() => {
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistItems);

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <EmptyState
            icon={
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            }
            title="Your wishlist is empty"
            message="Save your favorite items and come back to them later."
            action={
              <Link to="/products">
                <Button variant="primary">Discover Products</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-page__header">
          <h1>My Wishlist ({items.length})</h1>
          <Button variant="ghost" onClick={() => dispatch(clearWishlist())}>
            Clear All
          </Button>
        </div>
        <div className="wishlist-page__grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
});

Wishlist.displayName = 'Wishlist';
export default Wishlist;