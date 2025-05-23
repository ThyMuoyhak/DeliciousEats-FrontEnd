import React from 'react';
import './styles/Feature.css';

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <div className="features-header">
          <div className="features-title-wrapper">
            <span className="features-subtitle">Why Choose Us</span>
            <h2 className="features-title">The Best Food & Drink Experience</h2>
          </div>
          <p className="features-description">
            Discover what makes our food and beverage selection stand out from the rest. 
            We're committed to quality, freshness, and a delightful experience with every order.
          </p>
        </div>
        
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="feature-title">Fast Delivery</h3>
            <p className="feature-text">
              Your order arrives at your doorstep in 30 minutes or less, guaranteed fresh and ready to enjoy.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="feature-title">Quality Ingredients</h3>
            <p className="feature-text">
              We source only the freshest, highest quality ingredients from trusted local suppliers.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="feature-title">Special Offers</h3>
            <p className="feature-text">
              Enjoy weekly promotions, combo deals, and loyalty rewards to make your experience even better.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="feature-title">Customizable Orders</h3>
            <p className="feature-text">
              Personalize your meals and drinks with our wide range of options to suit your taste and dietary needs.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="feature-title">Secure Payment</h3>
            <p className="feature-text">
              Multiple payment options with secure processing, including credit cards, digital wallets, and cash on delivery.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="feature-title">Dedicated Support</h3>
            <p className="feature-text">
              Our friendly customer service team is available 24/7 to assist you with any questions or concerns.
            </p>
          </div>
        </div>
        
        <div className="features-highlight">
          <div className="highlight-content">
            <h3 className="highlight-title">Try Our Seasonal Specials</h3>
            <p className="highlight-text">
              Limited-time offers featuring the freshest seasonal ingredients. 
              Don't miss our chef's special creations that change every month!
            </p>
            <a href="#specials" className="highlight-button">View Specials</a>
          </div>
          <div className="highlight-image">
            <div className="highlight-circle">
                <img className='rounded-full' src="https://tse2.mm.bing.net/th/id/OIP.fWB5UxSBYkBbCuZQckxyVQHaHa?w=626&h=626&rs=1&pid=ImgDetMain" alt="" />
            </div>
            <div className="highlight-badge">Limited Time</div>
          </div>
        </div>
        
        <div className="features-testimonial">
          <div className="testimonial-quotes">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="quotes-icon">
              <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
            </svg>
          </div>
          <p className="testimonial-text">
            The quality of the food and quick delivery time is impressive! 
            I love how I can customize my order exactly how I want it. 
            This has become my go-to service for both casual meals and special occasions.
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">
                <img className='rounded-full' src="https://tse2.mm.bing.net/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?rs=1&pid=ImgDetMain" alt="" />
            </div>
            <div className="author-info">
              <h4 className="author-name">Sok Dara</h4>
              <p className="author-title">Regular Customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;