import React from 'react';
import { useAuth } from '../AuthContext';

/**
 * This is a debugging component to test if authentication is working.
 * You can place this on any page to see the current auth state.
 */
const AuthDebugPanel = () => {
  const auth = useAuth();
  
  const debugStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#00f5ff',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #00f5ff',
    zIndex: 9999,
    fontFamily: 'monospace',
    boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
    maxWidth: '400px',
    fontSize: '12px'
  };
  
  const titleStyle = {
    margin: '0 0 10px 0',
    borderBottom: '1px solid #00f5ff',
    paddingBottom: '5px',
    color: '#ff00ea'
  };
  
  const propStyle = {
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between'
  };
  
  const buttonStyle = {
    backgroundColor: '#18181b',
    color: '#00f5ff',
    border: '1px solid #00f5ff',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    margin: '5px 5px 0 0',
    fontSize: '11px'
  };
  
  const handleLoginTest = () => {
    auth.login({ 
      email: 'test@example.com', 
      password: 'password123' 
    });
  };
  
  const handleLogoutTest = () => {
    auth.logout();
  };
  
  return (
    <div style={debugStyles}>
      <h4 style={titleStyle}>Auth Debug Panel</h4>
      
      <div style={propStyle}>
        <span>isAuthenticated:</span> 
        <span>{auth.isAuthenticated ? '✅ true' : '❌ false'}</span>
      </div>
      
      <div style={propStyle}>
        <span>loading:</span> 
        <span>{auth.loading ? '⏳ true' : '✅ false'}</span>
      </div>
      
      <div style={propStyle}>
        <span>user:</span> 
        <span>{auth.user ? '✅ present' : '❌ null'}</span>
      </div>
      
      {auth.user && (
        <div style={{marginTop: '10px', borderTop: '1px dashed rgba(0, 245, 255, 0.3)', paddingTop: '10px'}}>
          <div style={propStyle}>
            <span>name:</span> 
            <span>{auth.user.name}</span>
          </div>
          <div style={propStyle}>
            <span>email:</span> 
            <span>{auth.user.email}</span>
          </div>
        </div>
      )}
      
      <div style={{marginTop: '15px'}}>
        <button style={buttonStyle} onClick={handleLoginTest}>
          Test Login
        </button>
        <button style={buttonStyle} onClick={handleLogoutTest}>
          Test Logout
        </button>
      </div>
    </div>
  );
};

export default AuthDebugPanel;