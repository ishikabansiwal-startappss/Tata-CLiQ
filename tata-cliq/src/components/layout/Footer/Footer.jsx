import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h3 className="footer__logo">
              <span className="footer__logo-main">TATA</span>
              <span className="footer__logo-sub">CLiQ Luxury</span>
            </h3>
            <p className="footer__desc">
              India's premier luxury shopping destination. Discover curated collections from the world's finest brands.
            </p>
          </div>
          <div className="footer__links">
            <h4>Shop</h4>
            <Link to="/products?category=women">Women</Link>
            <Link to="/products?category=men">Men</Link>
            <Link to="/products?category=accessories">Accessories</Link>
            <Link to="/products?category=footwear">Footwear</Link>
          </div>
          <div className="footer__links">
            <h4>Customer Service</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/shipping">Shipping Info</Link>
            <Link to="/returns">Returns & Exchanges</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer__links">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/press">Press</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 Tata CLiQ Luxury. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;