import "./styles/PopureProduct.css";

const PopureProduct = () => {
    return (
        <section className="popure-section">
            <div className="popure-grid-overlay"></div>
            <div className="popure-glow-orb popure-glow-1"></div>
            <div className="popure-glow-orb popure-glow-2"></div>
            
            <div className="popure-container">
                <div className="popure-header">
                    <div className="popure-badge">Trending • Most Ordered</div>
                    <h2 className="popure-title">
                        Popular
                        <span className="popure-title-accent" data-text="Products">Products</span>
                    </h2>
                    <p className="popure-subtitle">
                        Discover our most sought-after items, engineered for maximum satisfaction
                    </p>
                </div>
                
                <div className="popure-grid">
                    {/* Product Card 1 */}
                    <div className="popure-product-card">
                        <div className="product-badge bestseller">Best Seller</div>
                        <div className="product-image-container">
                            <div className="product-glow"></div>
                            <img src="/api/placeholder/400/400" alt="Neon Surge" className="product-image" />
                        </div>
                        <div className="product-info">
                            <div className="product-meta">
                                <div className="product-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="rating-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span>4.9</span>
                                    <span className="rating-count">(420)</span>
                                </div>
                                <div className="product-category">Energy Drink</div>
                            </div>
                            <h3 className="product-name">Neon Surge</h3>
                            <p className="product-description">Electrifying citrus energy boost with neural enhancers</p>
                            <div className="product-footer">
                                <div className="product-price">$8.99</div>
                                <button className="product-add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="btn-text">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Card 2 */}
                    <div className="popure-product-card">
                        <div className="product-badge new">New</div>
                        <div className="product-image-container">
                            <div className="product-glow"></div>
                            <img src="/api/placeholder/400/400" alt="Quantum Bowl" className="product-image" />
                        </div>
                        <div className="product-info">
                            <div className="product-meta">
                                <div className="product-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="rating-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span>4.7</span>
                                    <span className="rating-count">(128)</span>
                                </div>
                                <div className="product-category">Power Bowl</div>
                            </div>
                            <h3 className="product-name">Quantum Bowl</h3>
                            <p className="product-description">Multi-dimensional ramen with brain-boosting compounds</p>
                            <div className="product-footer">
                                <div className="product-price">$14.99</div>
                                <button className="product-add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="btn-text">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Card 3 */}
                    <div className="popure-product-card">
                        <div className="product-image-container">
                            <div className="product-glow"></div>
                            <img src="/api/placeholder/400/400" alt="Cyber Sushi" className="product-image" />
                        </div>
                        <div className="product-info">
                            <div className="product-meta">
                                <div className="product-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="rating-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span>4.6</span>
                                    <span className="rating-count">(89)</span>
                                </div>
                                <div className="product-category">Sushi Platter</div>
                            </div>
                            <h3 className="product-name">Cyber Sushi</h3>
                            <p className="product-description">Precision-crafted rolls with neural-enhancing omega compounds</p>
                            <div className="product-footer">
                                <div className="product-price">$18.49</div>
                                <button className="product-add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="btn-text">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Product Card 4 */}
                    <div className="popure-product-card">
                        <div className="product-badge discount">-15%</div>
                        <div className="product-image-container">
                            <div className="product-glow"></div>
                            <img src="/api/placeholder/400/400" alt="Matrix Pizza" className="product-image" />
                        </div>
                        <div className="product-info">
                            <div className="product-meta">
                                <div className="product-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="rating-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span>4.9</span>
                                    <span className="rating-count">(215)</span>
                                </div>
                                <div className="product-category">Pizza</div>
                            </div>
                            <h3 className="product-name">Matrix Pizza</h3>
                            <p className="product-description">Reality-bending crust with adaptive toppings and smart herbs</p>
                            <div className="product-footer">
                                <div className="product-price">
                                    <span className="discounted-price">$15.49</span>
                                    <span className="original-price">$18.99</span>
                                </div>
                                <button className="product-add-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="btn-text">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="popure-cta-container">
                    <a href="#view-all-products" className="popure-cta-button">
                        <span className="cta-text">View All Products</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default PopureProduct;