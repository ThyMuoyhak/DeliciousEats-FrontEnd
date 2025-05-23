import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the useCart hook
import './styles/DetailProduct.css';

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the cart context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success' && result.data) {
          setProduct(result.data);
          // Fetch related products based on category
          fetchRelatedProducts(result.data.category.cat_id);
        } else {
          throw new Error('Invalid data format received');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching product details:', err);
      }
    };

    const fetchRelatedProducts = async (categoryId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/products?category=${categoryId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success' && result.data) {
          // Filter out the current product and limit to 4 related products
          const filtered = result.data
            .filter((item) => item.pro_id !== parseInt(id))
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    if (id) {
      fetchProductDetail();
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!price || !discount) return price;
    const originalPrice = parseFloat(price);
    const discountPercent = parseFloat(discount);
    const discountAmount = originalPrice * (discountPercent / 100);
    return (originalPrice - discountAmount).toFixed(2);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && product && newQuantity <= product.qty) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product && product.qty > 0) {
      addToCart(product, quantity); // Add product and quantity to cart
      console.log(`Added ${quantity} of product ID ${id} to cart`);

      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.textContent = 'Added to cart!';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      }, 100);
    }
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/products/${productId}`);
    // Reset state for new product
    setQuantity(1);
    setActiveImage(0);
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="detail-loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <h3>Error Loading Product</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-error">
        <h3>Product Not Found</h3>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  // Mock additional images (in a real app, these would come from the API)
  const productImages = [
    product.image.startsWith('http') ? product.image : `http://localhost:8000${product.image}`,
    product.image.startsWith('http') ? product.image : `http://localhost:8000${product.image}`,
    product.image.startsWith('http') ? product.image : `http://localhost:8000${product.image}`,
    product.image.startsWith('http') ? product.image : `http://localhost:8000${product.image}`,
  ];

  return (
    <section className="detail-section">
      <div className="detail-grid-overlay"></div>
      <div className="detail-glow-orb detail-glow-1"></div>
      <div className="detail-glow-orb detail-glow-2"></div>

      <div className="detail-container">
        <div className="detail-breadcrumb">
          <button onClick={() => navigate('/products')} className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="back-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Products
          </button>
          <div className="breadcrumb-trail">
            <span>Home</span>
            <span className="breadcrumb-separator">/</span>
            <span>Products</span>
            <span className="breadcrumb-separator">/</span>
            <span>{product.category.cat_name}</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.pro_name}</span>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-gallery">
            <div className="detail-main-image-container">
              {parseFloat(product.discount) > 0 && (
                <div className="detail-badge discount-badge">{product.discount}% OFF</div>
              )}
              <div className="detail-main-image">
                <img
                  src={productImages[activeImage]}
                  alt={product.pro_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Available';
                  }}
                />
                <div className="image-glow"></div>
              </div>
            </div>

            <div className="detail-thumbnails">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`detail-thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.pro_name} - view ${index + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150x150?text=Thumbnail';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <div className="detail-header">
              <div className="detail-category">{product.category.cat_name}</div>
              <h1 className="detail-title">{product.pro_name}</h1>

              <div className="detail-meta">
                <div className="detail-id">Product ID: {product.pro_id}</div>
                <div className="detail-stock">
                  {product.qty > 0 ? (
                    <span className="in-stock">In Stock ({product.qty} available)</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="detail-price-container">
                {parseFloat(product.discount) > 0 ? (
                  <>
                    <div className="detail-price-original">${parseFloat(product.price).toFixed(2)}</div>
                    <div className="detail-price discounted">
                      ${calculateDiscountedPrice(product.price, product.discount)}
                      <span className="price-save">
                        You save: $
                        {(parseFloat(product.price) - parseFloat(calculateDiscountedPrice(product.price, product.discount))).toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="detail-price">${parseFloat(product.price).toFixed(2)}</div>
                )}
              </div>
            </div>

            <div className="detail-description">
              <h3 className="description-title">Description</h3>
              <p className="description-text">
                {product.description ||
                  'Experience the amazing quality and taste of our premium product. Perfect for any occasion, this product delivers exceptional value and satisfaction every time.'}
              </p>
            </div>

            <div className="detail-features">
              <h3 className="features-title">Features</h3>
              <ul className="features-list">
                <li className="feature-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Premium Quality
                </li>
                <li className="feature-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Satisfaction Guaranteed
                </li>
                <li className="feature-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fast Shipping
                </li>
                <li className="feature-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feature-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Easy Returns
                </li>
              </ul>
            </div>

            <div className="detail-actions">
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="btn-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={!product.qty || quantity >= product.qty}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="btn-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={!product.qty || product.qty <= 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
                Add to Cart
              </button>

              <button className="favorite-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Save
              </button>
            </div>

            <div className="detail-additional-info">
              <div className="info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="info-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                  <path
                    d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a2 2 0 011.732 1H14a2 2 0 011.732 1H16a1 1 0 001-1v-1a2 2 0 00-2-2h-3V8a1 1 0 00-1-1H4a1 1 0 00-1-1V5a1 1 0 011-1h7a1 1 0 001-1V2a1 1 0 00-1-1H3a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <div className="info-content">
                  <span className="info-title">Free Shipping</span>
                  <span className="info-text">On orders over $50</span>
                </div>
              </div>

              <div className="info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="info-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="info-content">
                  <span className="info-title">Secure Payment</span>
                  <span className="info-text">100% secure checkout</span>
                </div>
              </div>

              <div className="info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="info-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="info-content">
                  <span className="info-title">24/7 Support</span>
                  <span className="info-text">Chat with us anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-title">Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map((relatedProduct) => (
                <div
                  className="related-product-card"
                  key={relatedProduct.pro_id}
                  onClick={() => handleRelatedProductClick(relatedProduct.pro_id)}
                >
                  <div className="related-image">
                    <img
                      src={
                        relatedProduct.image.startsWith('http')
                          ? relatedProduct.image
                          : `http://localhost:8000${relatedProduct.image}`
                      }
                      alt={relatedProduct.pro_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="related-info">
                    <h3 className="related-name">{relatedProduct.pro_name}</h3>
                    <div className="related-price">
                      {parseFloat(relatedProduct.discount) > 0 ? (
                        <>${calculateDiscountedPrice(relatedProduct.price, relatedProduct.discount)}</>
                      ) : (
                        <>${parseFloat(relatedProduct.price).toFixed(2)}</>
                      )}
                    </div>
                  </div>
                  <div className="related-hover">View Product</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailProduct;