import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

/**
 * A wrapper component that redirects to the login page if the user is not authenticated.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component(s) to render if authenticated
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If authentication is required and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    // Pass the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authentication is NOT required and user IS authenticated, you can optionally
  // redirect them away from pages like login/register
  if (!requireAuth && isAuthenticated) {
    // This is optional - uncomment if you want to redirect authenticated users
    // away from login/register pages
    // return <Navigate to="/account" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;