import React, { useState, useEffect } from 'react';
import './styles/Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/slide-heroes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API Response:', result);
        if (result.status === 'success' && result.data.length > 0) {
          setHeroData(result.data[0]);
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Base URL for images
  const baseUrl = 'http://localhost:8000/storage/';

  // Log image URLs for debugging
  console.log('Image 1 URL:', heroData?.image1 ? `${baseUrl}${heroData.image1}` : 'Fallback');
  console.log('Image 2 URL:', heroData?.image2 ? `${baseUrl}${heroData.image2}` : 'Fallback');
  console.log('Image 3 URL:', heroData?.image3 ? `${baseUrl}${heroData.image3}` : 'Fallback');

  return (
    <section className="hero-section">
      <div className="hero-grid-overlay"></div>
      <div className="hero-glow-orb hero-glow-1"></div>
      <div className="hero-glow-orb hero-glow-2"></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">Premium Quality • Fast Delivery</div>
          <h1 className="hero-title">
            {heroData?.main_title || 'Futuristic Drinks'}
            <span className="hero-title-accent">For The Digital Age</span>
          </h1>
          <p className="hero-description">
            {heroData?.description || 'Experience our curated selection of next-gen beverages and energy formulas. Engineered for maximum refreshment and delivered at lightspeed to your location.'}
          </p>
          <div className="hero-cta-group">
            <Link to="/products" className="hero-cta-primary">
              <span className="cta-text">Shop Now</span>
              <span className="cta-pulse"></span>
            </Link>
            <Link to="/products" className="hero-cta-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hero-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Browse Menu
            </Link>
          </div>
          <div className="hero-features">
            <div className="hero-feature-item">
              <div className="feature-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span>Hyper Delivery</span>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span>Premium Formula</span>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-feature-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span>Secure Transaction</span>
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-product-showcase">
            <div className="hero-product-item hero-product-main">
              <div className="hero-product-badge">BEST SELLER</div>
              <div className="hero-product-image-wrapper">
                <div className="hero-product-glow"></div>
                <div className="hero-product-image">
                  <img
                    src={
                      heroData?.image1
                        ? filterUrl(heroData.image1)
                          ? heroData.image1
                          : `${baseUrl}${heroData.image1}`
                        : 'https://www.swirecocacola.com/sbcorpweb/uploads/newsletter/images/source/402660493_1000.jpg'
                    }
                    alt="Main product"
                    onError={(e) => console.log('Image 1 failed to load:', e.target.src)}
                  />
                </div>
              </div>
              <div className="hero-product-info">
                <h3 className="hero-product-name">{heroData?.main_title || 'Coca-Cola Classic'}</h3>
              </div>
            </div>

            <div className="hero-product-item hero-product-secondary hero-product-2">
              <div className="hero-product-image-wrapper">
                <div className="hero-product-glow small"></div>
                <img
                  src={
                    heroData?.image2
                      ? filterUrl(heroData.image2)
                        ? heroData.image2
                        : `${baseUrl}${heroData.image2}`
                      : 'https://www.thedrinksbusiness.com/content/uploads/2022/06/2519EE4F-7B22-4A4B-B22A-1040C324D784-640x592.jpeg'
                  }
                  alt="Energy drink"
                  onError={(e) => console.log('Image 2 failed to load:', e.target.src)}
                />
              </div>
            </div>

            <div className="hero-product-item hero-product-secondary hero-product-3">
              <div className="hero-product-image-wrapper">
                <div className="hero-product-glow small"></div>
                <img
                  src={
                    heroData?.image3
                      ? filterUrl(heroData.image3)
                        ? heroData.image3
                        : `${baseUrl}${heroData.image3}`
                      : 'https://fabnews.live/wp-content/uploads/2023/11/Sting-Red_Cambodia-Can-min.png'
                  }
                  alt="Sting energy drink"
                  onError={(e) => console.log('Image 3 failed to load:', e.target.src)}
                />
              </div>
            </div>

            <div className="hero-product-floating-elements">
              <div className="hero-floating-element hero-float-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-element-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="hero-floating-element hero-float-2">+</div>
              <div className="hero-floating-element hero-float-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-element-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-number">5,000+</span>
              <span className="hero-stat-label">Daily Orders</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">15 min</span>
              <span className="hero-stat-label">Average Delivery</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">4.9/5</span>
              <span className="hero-stat-label">Customer Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-shape-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};

// Helper function to check if a string is a valid URL
const filterUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default Hero;