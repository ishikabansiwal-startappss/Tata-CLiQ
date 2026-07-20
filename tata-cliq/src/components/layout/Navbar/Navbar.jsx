import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../../redux/slices/cartSlice';
import { selectWishlistCount } from '../../../redux/slices/wishlistSlice';
import './Navbar.scss';

const Navbar = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  }, [searchQuery, navigate]);

  const categories = ['Women', 'Men', 'Accessories', 'Footwear', 'Jewelry', 'Watches'];

  return (
    <header className="navbar">
      <div className="navbar__top">
        <div className="container navbar__top-inner">
          <span className="navbar__tagline">Luxury Redefined</span>
          <div className="navbar__top-links">
            <Link to="/help">Help</Link>
            <Link to="/stores">Stores</Link>
          </div>
        </div>
      </div>
      <div className="navbar__main">
        <div className="container navbar__main-inner">
          <button
            className="navbar__hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-text">TATA</span>
            <span className="navbar__logo-sub">CLiQ Luxury</span>
          </Link>

          <form className="navbar__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search luxury..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </form>

          <nav className="navbar__actions">
            <Link to="/wishlist" className="navbar__action" aria-label="Wishlist">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="navbar__badge">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="navbar__action" aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
            </Link>
            <Link to="/profile" className="navbar__action" aria-label="Profile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
      <nav className="navbar__categories">
        <div className="container">
          <ul className="navbar__category-list">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/products?category=${cat.toLowerCase()}`}
                  className="navbar__category-link"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;