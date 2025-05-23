import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import "./styles/Cart.css";

const Cart = () => {
  const { cartItems, cartCount, addToCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showContactSection, setShowContactSection] = useState(false); // New state for contact section

  // Auto-open contact section after login redirect
  useEffect(() => {
    if (user && location.state?.openContact) {
      setShowContactSection(true);
      // Clear location state to prevent re-opening
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [user, location, navigate]);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.1;
  const taxes = subtotal * taxRate;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const discountAmount = subtotal * (promoDiscount / 100);
  const total = subtotal + taxes + shippingCost - discountAmount;

  // Handle quantity change
  const handleQuantityChange = (item, change) => {
    if (item.quantity + change <= 0) {
      removeFromCart(item.id);
    } else {
      addToCart({
        pro_id: item.id,
        pro_name: item.name,
        price: item.price,
        image: item.image
      }, change);
    }
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Handle apply promo code
  const handleApplyPromo = () => {
    const promoCodes = {
      'CYBER10': 10,
      'NEON20': 20,
      'WELCOME15': 15
    };
    const trimmedCode = promoCode.trim().toUpperCase();

    if (promoCodes[trimmedCode]) {
      setPromoDiscount(promoCodes[trimmedCode]);
      setPromoApplied(true);
      showNotification(`Promo code ${trimmedCode} applied successfully!`, 'success');
    } else if (trimmedCode) {
      setPromoApplied(false);
      setPromoDiscount(0);
      showNotification('Invalid promo code. Please try again.', 'error');
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `promo-notification ${type}`;
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

  // Handle checkout click
  const handleCheckoutClick = () => {
    if (!user) {
      showNotification('Please log in to proceed to checkout.', 'error');
      navigate('/login', { state: { from: '/cart', openContact: true } }); // Updated to openContact
    } else {
      setShowContactSection(true); // Show contact section
    }
  };

  // Close contact section
  const handleCloseContactSection = () => {
    setShowContactSection(false);
  };

  return (
    <section className="cart-section">
      <div className="cart-grid-overlay"></div>
      <div className="cart-glow-orb cart-glow-1"></div>
      <div className="cart-glow-orb cart-glow-2"></div>

      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">
            {cartCount > 0
              ? `You have ${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart`
              : 'Your cart is empty'}
          </p>
        </div>

        {cartCount > 0 ? (
          <div className="cart-content">
            <div className="cart-items-container">
              <div className="cart-items-header">
                <div className="header-product">Product</div>
                <div className="header-price">Price</div>
                <div className="header-quantity">Quantity</div>
                <div className="header-total">Total</div>
                <div className="header-actions"></div>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-product">
                      <div className="item-image">
                        <img
                          src={item.image?.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <Link to={`/products/${item.id}`} className="view-product-link">View product</Link>
                      </div>
                    </div>

                    <div className="item-price" data-label="Price:">${item.price.toFixed(2)}</div>

                    <div className="item-quantity">
                      <div className="quantity-control">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item, -1)}
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item, 1)}
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="item-total" data-label="Total:">${(item.price * item.quantity).toFixed(2)}</div>

                    <div className="item-actions">
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary">
              <div className="summary-header">
                <h2>Order Summary</h2>
              </div>

              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <span className="free-shipping">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="summary-row discount">
                    <span>Discount ({promoDiscount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="promo-code-container">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="promo-input"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    aria-label="Promo code"
                  />
                  <button
                    className="apply-promo-btn"
                    onClick={handleApplyPromo}
                    aria-label="Apply promo code"
                  >
                    Apply
                  </button>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="checkout-btn"
                  onClick={handleCheckoutClick}
                  aria-label="Proceed to checkout"
                  disabled={cartCount === 0}
                >
                  <span>Proceed to Checkout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <p className="security-note">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="security-icon">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Checkout. All information is encrypted and secure.</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="continue-shopping-btn" aria-label="Continue shopping">
              <span>Continue Shopping</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}

        <div className="cart-cta">
          <Link to="/products" className="back-to-shopping" aria-label="Back to shopping">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Continue Shopping</span>
          </Link>
        </div>

        {showContactSection && user && (
          <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
            <div className="contact-form-container">
              <button
                className="close-contact-btn"
                onClick={handleCloseContactSection}
                aria-label="Close contact section"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <h2 className="contact-title" id="contact-title">Contact Us to Complete Your Order</h2>
              <p className="contact-subtitle">
                Please reach out to us via Telegram or Email to finalize your purchase.
              </p>
              <div className="contact-options">
                <a
                  href="https://t.me/thymuoyhak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-option"
                  aria-label="Contact via Telegram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.664 6.549l-1.828 8.627c-.134.632-.486.796-.984.498l-2.785-2.048-1.336 1.287c-.148.143-.274.262-.546.262l.198-2.805 5.098-4.614c.222-.2-.049-.31-.343-.114L8.39 10.54l-2.706-.837c-.582-.18-.595-.632.123-.896l10.582-4.058c.482-.185.902.224.675.9z" />
                  </svg>
                  <span>Contact via Telegram</span>
                </a>
                <a
                  href="mailto:support@yourstore.com"
                  className="contact-option"
                  aria-label="Contact via Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="contact-icon">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contact via Email</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;