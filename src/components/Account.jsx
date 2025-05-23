import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/Account.css";

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: ''
    });
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    
    // Fetch user data on component mount
    useEffect(() => {
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        
        if (!userData) {
            // Redirect to login if not logged in
            navigate('/login');
            return;
        }
        
        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            
            // Initialize edit form with current values
            setEditForm({
                name: parsedUser.name || '',
                email: parsedUser.email || ''
            });
            
            setIsLoading(false);
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Redirect to login if user data is invalid
            navigate('/login');
        }
    }, [navigate]);
    
    // Handle tab switching
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Reset editing mode when switching tabs
        setIsEditing(false);
    };
    
    // Handle edit mode toggle
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset form to current user values when toggling
        if (!isEditing) {
            setEditForm({
                name: user.name || '',
                email: user.email || ''
            });
        }
    };
    
    // Handle form input changes
    const handleInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };
    
    // Handle save profile changes
    const handleSaveChanges = () => {
        // Validate form
        if (!editForm.name.trim() || !editForm.email.trim()) {
            showNotification('Name and email are required.', 'error');
            return;
        }
        
        // Update user in local storage or session storage
        const updatedUser = {
            ...user,
            name: editForm.name,
            email: editForm.email
        };
        
        // Update in the same storage that was used previously
        if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        // Update state
        setUser(updatedUser);
        setIsEditing(false);
        
        // Show success notification
        showNotification('Profile updated successfully!', 'success');
    };
    
    // Handle logout
    const handleLogout = () => {
        if (!logoutConfirm) {
            setLogoutConfirm(true);
            return;
        }
        
        // Clear user data from storage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Show notification
        showNotification('Logged out successfully!', 'success');
        
        // Redirect to login page after short delay
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };
    
    // Cancel logout
    const cancelLogout = () => {
        setLogoutConfirm(false);
    };
    
    // Show notification
    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `account-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }, 100);
    };
    
    // Render loading state
    if (isLoading) {
        return (
            <div className="account-loading">
                <div className="account-loading-spinner"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }
    
    return (
        <section className="account-section">
            <br /><br /><br /><br />
            <div className="account-grid-overlay"></div>
            <div className="account-glow-orb account-glow-1"></div>
            <div className="account-glow-orb account-glow-2"></div>
            
            <div className="account-container">
                <div className="account-header">
                    <h1 className="account-title">Your Account</h1>
                    <p className="account-subtitle">Manage your profile and preferences</p>
                </div>
                
                <div className="account-content">
                    <div className="account-sidebar">
                        <div className="account-user-info">
                            <div className="account-avatar">
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="account-user-details">
                                <h3 className="account-user-name">{user.name}</h3>
                                <p className="account-user-email">{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="account-tabs">
                            <button 
                                className={`account-tab ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => handleTabChange('profile')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tab-icon">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span>Profile</span>
                            </button>
                            
                            <button 
                                className={`account-tab ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => handleTabChange('orders')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tab-icon">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span>Orders</span>
                            </button>
                            
                            <button 
                                className={`account-tab ${activeTab === 'security' ? 'active' : ''}`}
                                onClick={() => handleTabChange('security')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tab-icon">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Security</span>
                            </button>
                            
                            <button 
                                className={`account-tab ${activeTab === 'preferences' ? 'active' : ''}`}
                                onClick={() => handleTabChange('preferences')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tab-icon">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                <span>Preferences</span>
                            </button>
                        </div>
                        
                        <div className="account-actions">
                            <button 
                                className={`logout-button ${logoutConfirm ? 'confirm' : ''}`}
                                onClick={handleLogout}
                            >
                                {logoutConfirm ? 'Confirm Logout' : 'Logout'}
                                {logoutConfirm && (
                                    <button
                                        className="cancel-logout"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            cancelLogout();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className="account-tab-content">
                        {activeTab === 'profile' && (
                            <div className="profile-tab">
                                <div className="tab-header">
                                    <h2>Profile Information</h2>
                                    <button 
                                        className={`edit-toggle ${isEditing ? 'save' : ''}`}
                                        onClick={isEditing ? handleSaveChanges : handleEditToggle}
                                    >
                                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                                    </button>
                                </div>
                                
                                {isEditing ? (
                                    <div className="profile-edit-form">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    id="name" 
                                                    name="name" 
                                                    value={editForm.name}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="input-icon">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                                <div className="input-focus-effect"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <div className="input-wrapper">
                                                <input 
                                                    type="email" 
                                                    id="email" 
                                                    name="email" 
                                                    value={editForm.email}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="input-icon">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                                <div className="input-focus-effect"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-actions">
                                            <button 
                                                type="button" 
                                                className="cancel-button"
                                                onClick={handleEditToggle}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="profile-info">
                                        <div className="info-group">
                                            <div className="info-label">Full Name</div>
                                            <div className="info-value">{user.name}</div>
                                        </div>
                                        
                                        <div className="info-group">
                                            <div className="info-label">Email Address</div>
                                            <div className="info-value">{user.email}</div>
                                        </div>
                                        
                                        <div className="info-group">
                                            <div className="info-label">Account Created</div>
                                            <div className="info-value">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not available'}
                                            </div>
                                        </div>
                                        
                                        <div className="membership-status">
                                            <div className="status-badge">Active Member</div>
                                            <div className="status-text">Your account is in good standing</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {activeTab === 'orders' && (
                            <div className="orders-tab">
                                <div className="tab-header">
                                    <h2>Your Orders</h2>
                                </div>
                                
                                <div className="no-orders">
                                    <div className="no-orders-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3>No Orders Yet</h3>
                                    <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
                                    <button className="shop-now-btn" onClick={() => navigate('/products')}>
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'security' && (
                            <div className="security-tab">
                                <div className="tab-header">
                                    <h2>Security Settings</h2>
                                </div>
                                
                                <div className="security-info">
                                    <div className="password-section">
                                        <h3>Password</h3>
                                        <p>Your password was last changed on: <span>Never</span></p>
                                        <button className="change-password-btn">
                                            Change Password
                                        </button>
                                    </div>
                                    
                                    <div className="login-activity">
                                        <h3>Recent Login Activity</h3>
                                        <div className="activity-item">
                                            <div className="activity-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="activity-details">
                                                <div className="activity-title">Current Login Session</div>
                                                <div className="activity-info">
                                                    <span>Today at {new Date().toLocaleTimeString()}</span>
                                                    <span className="device-info">Web Browser</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="security-options">
                                        <h3>Account Security</h3>
                                        <div className="option-item">
                                            <div className="option-left">
                                                <div className="option-title">Two-Factor Authentication</div>
                                                <div className="option-description">Add an extra layer of security to your account</div>
                                            </div>
                                            <div className="option-action">
                                                <button className="enable-btn">Enable</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'preferences' && (
                            <div className="preferences-tab">
                                <div className="tab-header">
                                    <h2>Your Preferences</h2>
                                </div>
                                
                                <div className="preferences-section">
                                    <h3>Communication Preferences</h3>
                                    
                                    <div className="preference-item">
                                        <div className="preference-left">
                                            <div className="preference-title">Email Notifications</div>
                                            <div className="preference-description">Receive updates about your orders, promotions, and more</div>
                                        </div>
                                        <div className="preference-action">
                                            <label className="toggle-switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="preference-item">
                                        <div className="preference-left">
                                            <div className="preference-title">Marketing Communications</div>
                                            <div className="preference-description">Receive special offers and promotional emails</div>
                                        </div>
                                        <div className="preference-action">
                                            <label className="toggle-switch">
                                                <input type="checkbox" />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="preferences-section">
                                    <h3>Display Preferences</h3>
                                    
                                    <div className="preference-item">
                                        <div className="preference-left">
                                            <div className="preference-title">Dark Mode</div>
                                            <div className="preference-description">Switch between light and dark themes</div>
                                        </div>
                                        <div className="preference-action">
                                            <label className="toggle-switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="preference-item">
                                        <div className="preference-left">
                                            <div className="preference-title">Animations</div>
                                            <div className="preference-description">Enable or disable interface animations</div>
                                        </div>
                                        <div className="preference-action">
                                            <label className="toggle-switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;