import React from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const AuthStatus = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="auth-status">
      {isAuthenticated ? (
        <div className="user-status">
          <span className="welcome-message">Welcome, {user?.name || 'User'}!</span>
          <div className="auth-buttons">
            <Link to="/account" className="account-link">
              My Account
            </Link>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;
