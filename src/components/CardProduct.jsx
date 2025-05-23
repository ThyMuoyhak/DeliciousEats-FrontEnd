import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CardProduct.css';

const CardProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  // Polling interval in milliseconds (e.g., 30 seconds)
  const POLLING_INTERVAL = 30000;

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/products');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success' && result.data) {
        // Only update state if data has changed to avoid unnecessary renders
        setProducts((prevProducts) => {
          const isDataChanged = JSON.stringify(prevProducts) !== JSON.stringify(result.data);
          return isDataChanged ? result.data : prevProducts;
        });

        // Extract unique categories
        const uniqueCategories = ['all'];
        const categorySet = new Set();

        result.data.forEach((product) => {
          if (product.category && product.category.cat_name && !categorySet.has(product.category.cat_name)) {
            categorySet.add(product.category.cat_name);
            uniqueCategories.push(product.category.cat_name);
          }
        });

        setCategories(uniqueCategories);
        console.log('Categories extracted:', uniqueCategories);
      } else {
        throw new Error('Invalid data format received');
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error fetching products:', err);
    }
  }, []);

  // Initial fetch and polling setup
  useEffect(() => {
    // Initial fetch
    fetchProducts();

    // Set up polling
    const intervalId = setInterval(fetchProducts, POLLING_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchProducts]);

  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    console.log('Filtering products. Active category:', activeCategory);
    console.log('Total products:', products.length);

    if (activeCategory === 'all') {
      return products;
    } else {
      const filtered = products.filter((product) => {
        return (
          product.category &&
          product.category.cat_name &&
          product.category.cat_name.toLowerCase() === activeCategory.toLowerCase()
        );
      });

      console.log('Filtered products:', filtered.length);
      return filtered;
    }
  }, [products, activeCategory]);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    const originalPrice = parseFloat(price);
    const discountPercent = parseFloat(discount);
    const discountAmount = originalPrice * (discountPercent / 100);
    return (originalPrice - discountAmount).toFixed(2);
  };

  // Handle category filter click
  const handleCategoryFilter = (category) => {
    console.log('Category selected:', category);
    setActiveCategory(category);
  };

  // Handle view details click - Navigate to the detail page
  const handleViewDetails = (productId) => {
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (productCard) {
      productCard.classList.add('card-clicked');
      setTimeout(() => {
        navigate(`/products/${productId}`);
      }, 300);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    console.log(`Added product ${product.pro_id} to cart`);

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
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-error">
        <h3>Error Loading Products</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">Our Products</h2>
          <p className="products-description">
            Browse our selection of delicious foods and refreshing beverages. 
            We offer a wide variety of options to satisfy your cravings.
          </p>
        </div>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div 
                className="product-card" 
                key={product.pro_id}
                data-id={product.pro_id}
                onClick={() => handleViewDetails(product.pro_id)}
              >
                {parseFloat(product.discount) > 0 && (
                  <div className="product-badge discount-badge">
                    {product.discount}% OFF
                  </div>
                )}
                
                {product.qty > 0 && product.qty < 10 && (
                  <div className="product-badge limited-badge">
                    LIMITED
                  </div>
                )}
                
                {product.qty > 50 && (
                  <div className="product-badge bestseller-badge">
                    BEST SELLER
                  </div>
                )}
                
                <div className="product-image-wrapper">
                  <div className="product-image">
                    <img 
                      src={product.image?.startsWith('http') ? product.image : `http://localhost:8000${product.image}`} 
                      alt={product.pro_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
                      }}
                    />
                  </div>
                </div>
                
                <div className="product-info">
                  <div className="product-category">
                    {product.category?.cat_name || 'Uncategorized'}
                  </div>
                  <h3 className="product-name">{product.pro_name}</h3>
                  <div className="product-price-row">
                    {parseFloat(product.discount) > 0 ? (
                      <>
                        <div className="product-price discounted-price">
                          ${calculateDiscountedPrice(product.price, product.discount)}
                        </div>
                        <div className="product-price-original">
                          ${parseFloat(product.price).toFixed(2)}
                        </div>
                      </>
                    ) : (
                      <div className="product-price">
                        ${parseFloat(product.price).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="product-action-row">
                  <div className="product-quantity">
                    {product.qty > 0 ? (
                      <span className="in-stock">In Stock</span>
                    ) : (
                      <span className="out-of-stock">Out of Stock</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn" 
                    disabled={product.qty <= 0}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>
                
                <div className="product-details-action">
                  <div className="view-details">View Details</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardProduct;