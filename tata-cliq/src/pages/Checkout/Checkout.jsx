import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../../redux/slices/cartSlice';
import { formatPrice } from '../../utils/format';
import Button from '../../components/common/Button/Button';
import { trackBeginCheckout, trackAddShippingInfo, trackAddPaymentInfo, trackPurchase } from '../../services/analytics';
import './Checkout.scss';
import { openRazorpayCheckout } from "../../services/payment/razorpay";

const Checkout = React.memo(() => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout__empty">
            <h2>Your cart is empty</h2>
            <Link to="/products">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }

  const validateAddress = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    if (!address.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!address.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(address.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!address.street.trim()) newErrors.street = 'Street address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!address.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!pincodeRegex.test(address.pincode.replace(/\s/g, ''))) newErrors.pincode = 'Enter a valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = () => {
    if (validateAddress()) {
      setStep(2);
      trackAddShippingInfo(items, total);
    }
  };

  const handlePaymentSubmit = () => {
    setStep(3);
    trackAddPaymentInfo(items, total, paymentMethod);
  };

  // const handlePlaceOrder = () => {
  //   const txnId = `TXN${Date.now()}`;
  //   trackPurchase(items, total, txnId);
  //   alert(`Order placed successfully! Transaction ID: ${txnId}`);
  // };
 const handlePlaceOrder = async () => {
  try {
    await openRazorpayCheckout({
      amount: total,
      customerName: address.fullName,
      customerPhone: address.phone,
    });
  } catch (error) {
    console.error(error);
  }
};
  const getFieldClass = (fieldName) => `checkout__input ${errors[fieldName] ? 'checkout__input--error' : ''}`;

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
                <div className="checkout__field">
                  <input type="text" placeholder="Full Name *" value={address.fullName}
                    onChange={(e) => { setAddress({ ...address, fullName: e.target.value }); if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' })); }}
                    className={getFieldClass('fullName')} required />
                  {errors.fullName && <span className="checkout__error">{errors.fullName}</span>}
                </div>
                <div className="checkout__field">
                  <input type="text" placeholder="Phone Number *" value={address.phone}
                    onChange={(e) => { setAddress({ ...address, phone: e.target.value }); if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' })); }}
                    className={getFieldClass('phone')} required />
                  {errors.phone && <span className="checkout__error">{errors.phone}</span>}
                </div>
                <div className="checkout__field">
                  <input type="text" placeholder="Street Address *" value={address.street}
                    onChange={(e) => { setAddress({ ...address, street: e.target.value }); if (errors.street) setErrors((prev) => ({ ...prev, street: '' })); }}
                    className={getFieldClass('street')} required />
                  {errors.street && <span className="checkout__error">{errors.street}</span>}
                </div>
                <div className="checkout__row">
                  <div className="checkout__field">
                    <input type="text" placeholder="City *" value={address.city}
                      onChange={(e) => { setAddress({ ...address, city: e.target.value }); if (errors.city) setErrors((prev) => ({ ...prev, city: '' })); }}
                      className={getFieldClass('city')} required />
                    {errors.city && <span className="checkout__error">{errors.city}</span>}
                  </div>
                  <div className="checkout__field">
                    <input type="text" placeholder="State *" value={address.state}
                      onChange={(e) => { setAddress({ ...address, state: e.target.value }); if (errors.state) setErrors((prev) => ({ ...prev, state: '' })); }}
                      className={getFieldClass('state')} required />
                    {errors.state && <span className="checkout__error">{errors.state}</span>}
                  </div>
                </div>
                <div className="checkout__field">
                  <input type="text" placeholder="Pincode *" value={address.pincode}
                    onChange={(e) => { setAddress({ ...address, pincode: e.target.value }); if (errors.pincode) setErrors((prev) => ({ ...prev, pincode: '' })); }}
                    className={getFieldClass('pincode')} required />
                  {errors.pincode && <span className="checkout__error">{errors.pincode}</span>}
                </div>
                <Button variant="accent" size="lg" fullWidth onClick={handleAddressSubmit}>Continue to Payment</Button>
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
                <Button variant="accent" size="lg" fullWidth onClick={handlePaymentSubmit}>Continue to Review</Button>
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
                <div><p>{item.name}</p><span>Qty: {item.quantity}</span></div>
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