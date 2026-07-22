import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, selectUser, selectIsAuthenticated } from '../../redux/slices/userSlice';
import Button from '../../components/common/Button/Button';
import './Profile.scss';

const Profile = React.memo(() => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogin = () => {
    dispatch(setUser({
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      memberSince: '2024',
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile__login-prompt">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <h2>Sign In to Your Account</h2>
            <p>Access your profile, orders, and wishlist.</p>
            <Button variant="primary" size="lg" onClick={handleLogin}>Sign In (Demo)</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>
        <div className="profile__card">
          <div className="profile__avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile__info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p className="profile__member">Member since {user.memberSince}</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>Sign Out</Button>
        </div>
        <div className="profile__section">
          <h3>Order History</h3>
          <div className="profile__empty">
            <p>No orders yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Profile.displayName = 'Profile';
export default Profile;