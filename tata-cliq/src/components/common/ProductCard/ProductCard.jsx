import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '../../../redux/slices/wishlistSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { formatPrice } from '../../../utils/format';
import { useToast } from '../Toast/Toast';
import Rating from '../Rating/Rating';
import './ProductCard.scss';

const ProductCard = React.memo(({ product }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
    }));
    addToast(`${product.name} added to cart`, 'success');
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={product.name}
          className="product-card__image-hover"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="product-card__badge">-{product.discount}%</span>
        )}
        {product.isNew && <span className="product-card__badge product-card__badge--new">New</span>}
        <button
          className={`product-card__wishlist ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label="Toggle wishlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="product-card__content">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="product-card__price">
          <span className="product-card__price-current">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-card__price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="product-card__colors">
          {product.colors.slice(0, 4).map((color) => (
            <span key={color} className="product-card__color" style={{ backgroundColor: color }} />
          ))}
          {product.colors.length > 4 && (
            <span className="product-card__color-more">+{product.colors.length - 4}</span>
          )}
        </div>
        <button className="product-card__add-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;