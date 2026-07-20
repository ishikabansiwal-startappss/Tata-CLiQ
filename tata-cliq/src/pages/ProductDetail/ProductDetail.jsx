import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProduct } from '../../hooks/useProducts';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../redux/slices/wishlistSlice';
import { formatPrice } from '../../utils/format';
import Rating from '../../components/common/Rating/Rating';
import Button from '../../components/common/Button/Button';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import './ProductDetail.scss';

const ProductDetail = React.memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useProduct(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = data?.product;
  const reviews = data?.reviews || [];
  const isInWishlist = useSelector(selectIsInWishlist(Number(id)));

  if (isLoading) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="product-detail__skeleton">
            <div className="skeleton-el skeleton-image" style={{ height: 500 }} />
            <div style={{ padding: '24px' }}>
              <div className="skeleton-el skeleton-text skeleton-text--lg" />
              <div className="skeleton-el skeleton-text" style={{ width: '60%' }} />
              <div className="skeleton-el skeleton-text" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="product-detail__not-found">
            <h2>Product not found</h2>
            <Link to="/products">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity,
      selectedSize: selectedSize || product.sizes[0],
      selectedColor: selectedColor || product.colors[0],
    }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.categorySlug}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail__main">
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              <button className="product-detail__wishlist-btn" onClick={handleToggleWishlist}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <div className="product-detail__thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`product-detail__thumb ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail__info">
            <span className="product-detail__brand">{product.brand}</span>
            <h1 className="product-detail__name">{product.name}</h1>
            <Rating value={product.rating} count={product.reviewCount} size="lg" />

            <div className="product-detail__price">
              <span className="product-detail__price-current">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="product-detail__price-original">{formatPrice(product.originalPrice)}</span>
                  <span className="product-detail__discount">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="product-detail__description">{product.description}</p>

            <div className="product-detail__options">
              <div className="product-detail__colors">
                <h4>Color: {selectedColor}</h4>
                <div className="product-detail__color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`product-detail__color-swatch ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="product-detail__sizes">
                <h4>Size: {selectedSize}</h4>
                <div className="product-detail__size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`product-detail__size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-detail__quantity">
                <h4>Quantity</h4>
                <div className="product-detail__quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(10, quantity + 1))}>+</button>
                </div>
              </div>
            </div>

            <div className="product-detail__actions">
              <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" fullWidth onClick={handleToggleWishlist}>
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            <div className="product-detail__specs">
              <h4>Specifications</h4>
              <ul>
                {product.specifications.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="product-detail__reviews">
            <h3 className="section-title">Customer Reviews</h3>
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card__header">
                  <strong>{review.user}</strong>
                  <Rating value={review.rating} showCount={false} />
                  <span className="review-card__date">{review.date}</span>
                </div>
                <h4 className="review-card__title">{review.title}</h4>
                <p className="review-card__comment">{review.comment}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
});

ProductDetail.displayName = 'ProductDetail';
export default ProductDetail;