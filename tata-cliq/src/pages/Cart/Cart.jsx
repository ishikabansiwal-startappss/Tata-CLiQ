import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';
import { formatPrice } from '../../utils/format';
import Button from '../../components/common/Button/Button';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { trackViewCart, trackRemoveFromCart, trackEngagement } from '../../services/analytics';
import './Cart.scss';

const Cart = React.memo(() => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const tracked = useRef(false);

  useEffect(() => {
    if (items.length > 0 && !tracked.current) {
      tracked.current = true;
      trackViewCart(items, total);
    }
  }, [items, total]);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <EmptyState
            icon={
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
            title="Your cart is empty"
            message="Add items to your cart to get started."
            action={
              <Link to="/products">
                <Button variant="primary">Shop Now</Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize, selectedColor: item.selectedColor }));
    trackRemoveFromCart(item);
  };

  const handleQuantity = (item, newQty) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQty, selectedSize: item.selectedSize, selectedColor: item.selectedColor }));
    trackEngagement('update_quantity', `${item.name}: ${newQty}`);
  };

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__header">
          <h1>Shopping Cart ({items.length})</h1>
          <Button variant="ghost" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
        </div>
        <div className="cart-page__layout">
          <div className="cart-page__items">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item__image">
                  <img src={item.images[0]} alt={item.name} />
                </Link>
                <div className="cart-item__content">
                  <span className="cart-item__brand">{item.brand}</span>
                  <h3 className="cart-item__name">{item.name}</h3>
                  <div className="cart-item__options">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && (
                      <span className="cart-item__color">
                        Color: <span style={{ backgroundColor: item.selectedColor, width: 14, height: 14, display: 'inline-block', borderRadius: '50%', verticalAlign: 'middle' }} />
                      </span>
                    )}
                  </div>
                  <div className="cart-item__price">{formatPrice(item.price)}</div>
                </div>
                <div className="cart-item__actions">
                  <div className="cart-item__quantity">
                    <button onClick={() => handleQuantity(item, Math.max(1, item.quantity - 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantity(item, Math.min(10, item.quantity + 1))}>+</button>
                  </div>
                  <div className="cart-item__subtotal">{formatPrice(item.price * item.quantity)}</div>
                  <button className="cart-item__remove" onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-page__summary">
            <h3>Order Summary</h3>
            <div className="cart-summary__row"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <div className="cart-summary__row"><span>Shipping</span><span>Free</span></div>
            <div className="cart-summary__row cart-summary__total"><span>Total</span><span>{formatPrice(total)}</span></div>
            <Link to="/checkout"><Button variant="accent" size="lg" fullWidth>Proceed to Checkout</Button></Link>
            <Link to="/products" className="cart-page__continue">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';
export default Cart;