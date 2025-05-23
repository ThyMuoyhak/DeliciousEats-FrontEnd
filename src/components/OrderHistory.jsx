import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import "./styles/OrderHistory.css";

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login', { state: { from: '/account/orders' } });
      return;
    }

    // Fetch user orders
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/orders', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success') {
          setOrders(result.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle order cancellation
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        // Update order status in the UI
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: 'cancelled' } 
              : order
          )
        );
        
        // Show success notification
        showNotification('Order cancelled successfully', 'success');
      } else {
        throw new Error(result.message || 'Failed to cancel order');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      showNotification(err.message || 'Failed to cancel order', 'error');
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `order-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 400);
      }, 3000);
    }, 100);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <section className="order-history-section">
      <div className="order-history-grid-overlay"></div>
      <div className="order-history-glow-orb order-history-glow-1"></div>
      <div className="order-history-glow-orb order-history-glow-2"></div>

      <div className="order-history-container">
        <div className="order-history-header">
          <h1 className="order-history-title">Your Orders</h1>
          <p className="order-history-subtitle">
            Track and manage your purchase history
          </p>
        </div>

        {error && (
          <div className="order-history-error">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="order-history-loading">
            <div className="loading-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h2>No Orders Found</h2>
            <p>You haven't placed any orders yet. Start shopping to see your order history.</p>
            <button 
              className="start-shopping-btn"
              onClick={() => navigate('/products')}
            >
              <span>Start Shopping</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div className="order-id-date">
                    <div className="order-number">Order #{order.id}</div>
                    <div className="order-date">Placed on {formatDate(order.created_at)}</div>
                  </div>
                  <div className="order-status-actions">
                    <div className={`order-status ${getStatusBadgeClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                    {order.status === 'pending' && (
                      <button 
                        className="cancel-order-btn"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div className="order-summary">
                  <div className="order-total">
                    <span>Total:</span> ${parseFloat(order.total).toFixed(2)}
                  </div>
                  <button 
                    className="toggle-details-btn"
                    onClick={() => toggleOrderDetails(order.id)}
                    aria-expanded={expandedOrderId === order.id}
                  >
                    {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={expandedOrderId === order.id ? "rotate-180" : ""}>
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {expandedOrderId === order.id && (
                  <div className="order-details">
                    <div className="order-items">
                      <h3 className="items-title">Order Items</h3>
                      {order.items && order.items.map((item) => (
                        <div className="order-item" key={item.id}>
                          <div className="item-info">
                            <span className="item-quantity">{item.quantity}x</span>
                            <span className="item-name">{item.product_name}</span>
                          </div>
                          <div className="item-price">${parseFloat(item.price).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="order-cost-breakdown">
                      <h3 className="breakdown-title">Cost Breakdown</h3>
                      <div className="cost-row">
                        <span>Subtotal</span>
                        <span>${parseFloat(order.subtotal).toFixed(2)}</span>
                      </div>
                      <div className="cost-row">
                        <span>Shipping</span>
                        <span>${parseFloat(order.shipping).toFixed(2)}</span>
                      </div>
                      <div className="cost-row">
                        <span>Tax</span>
                        <span>${parseFloat(order.tax).toFixed(2)}</span>
                      </div>
                      {parseFloat(order.discount) > 0 && (
                        <div className="cost-row discount">
                          <span>Discount</span>
                          <span>-${parseFloat(order.discount).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="cost-row total">
                        <span>Total</span>
                        <span>${parseFloat(order.total).toFixed(2)}</span>
                      </div>
                    </div>

                    {order.promo_code && (
                      <div className="order-promo">
                        <span className="promo-label">Promo code applied:</span>
                        <span className="promo-code">{order.promo_code}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderHistory;