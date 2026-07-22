import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../../redux/slices/cartSlice';
import { formatPrice } from '../../utils/format';
import Button from '../../components/common/Button/Button';
import './Checkout.scss';

const Checkout = React.memo(() => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (items.length === 0) {
    return (
      <div className="checkout-page"><div className="container"><div className="checkout__empty"><h2>Your cart is empty</h2><Link to="/products">Shop Now</Link></div></div></div>
    );
  }

  const handlePlaceOrder = () => {
    alert('Order placed successfully! (Demo)');
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout__steps">
          <span className={step >= 1 ? 'active' : ''}>Shipping</span>
          <span className={step >= 2 ? 'active' : ''}>Payment</span>
          <span className={step >= 3 ? 'active' : ''}>Review</span>
        </div>
        <div className="checkout__layout">
          <div className="checkout__form">
            {step === 1 && (
              <div className="checkout__address-form">
                <h3>Delivery Address</h3>
                <input placeholder="Full Name" value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
                <input placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} />
                <input placeholder="Street Address" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
                <div className="checkout__row">
                  <input placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
                  <input placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
                </div>
                <input placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} />
                <Button variant="accent" size="lg" fullWidth onClick={() => setStep(2)}>Continue to Payment</Button>
              </div>
            )}
            {step === 2 && (
              <div className="checkout__payment">
                <h3>Payment Method</h3>
                <label className="payment-option">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <span>Cash on Delivery</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                  <span>UPI</span>
                </label>
                <Button variant="accent" size="lg" fullWidth onClick={() => setStep(3)}>Continue to Review</Button>
              </div>
            )}
            {step === 3 && (
              <div className="checkout__review">
                <h3>Order Review</h3>
                <div className="checkout__review-address">
                  <h4>Delivering to:</h4>
                  <p>{address.fullName} - {address.phone}</p>
                  <p>{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                </div>
                <div className="checkout__review-payment">
                  <h4>Payment: {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Card' : 'UPI'}</h4>
                </div>
                <Button variant="accent" size="lg" fullWidth onClick={handlePlaceOrder}>Place Order</Button>
              </div>
            )}
          </div>
          <div className="checkout__summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="checkout__summary-item">
                <img src={item.images[0]} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <span>Qty: {item.quantity}</span>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="checkout__total"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
});

Checkout.displayName = 'Checkout';
export default Checkout;