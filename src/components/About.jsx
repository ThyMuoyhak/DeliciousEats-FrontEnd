// About.jsx
import React from 'react';
import './styles/About.css';

const About = () => {
    return (
        <section className="about-section">
            <div className="about-grid-overlay"></div>
            <div className="about-glow-orb about-glow-1"></div>
            <div className="about-glow-orb about-glow-2"></div>
            
            <div className="about-container">
                <div className="about-header">
                    <div className="about-badge">Est. 2025 • Phnom Penh</div>
                    <h2 className="about-title">
                        The Vision Behind
                        <span className="about-title-accent" data-text="DeliciousEats">DeliciousEats</span>
                    </h2>
                    <p className="about-subtitle">
                        Where futuristic cuisine meets innovative beverages for the digital generation
                    </p>
                </div>
                
                <div className="about-content">
                    <div className="about-image-container">
                        <div className="about-image-wrapper">
                            <div className="about-image-glow"></div>
                            <img src="https://tedboycnd-cdhwdbg6ard6f4cp.z01.azurefd.net/images/thumbs/0005435_soft-drink.jpeg" alt="Our futuristic beverages" className="about-image" />
                            <div className="about-image-badge">Established 2025</div>
                        </div>
                    </div>
                    
                    <div className="about-text-container">
                        <p className="about-text">
                            Founded in the vibrant tech district of Phnom Penh, DeliciousEats began with a bold vision: to create a complete culinary experience where food, drinks, and craft beer merge with cutting-edge technology.
                        </p>
                        
                        <p className="about-text">
                            Our team of culinary scientists and mixologists collaborate to craft unique flavor profiles that enhance your digital lifestyle. From neuro-enhancing craft beers to mood-balancing entrees and energy-boosting beverages, we've developed a menu that stands at the intersection of gastronomy and science.
                        </p>
                        
                        <div className="about-highlights">
                            <div className="about-highlight-item">
                                <div className="highlight-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <span className="highlight-text">Lab Crafted</span>
                            </div>
                            
                            <div className="about-highlight-item">
                                <div className="highlight-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65" />
                                    </svg>
                                </div>
                                <span className="highlight-text">Locally Sourced</span>
                            </div>
                            
                            <div className="about-highlight-item">
                                <div className="highlight-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="highlight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="highlight-text">Eco-Friendly</span>
                            </div>
                        </div>
                        
                        <div className="about-cta">
                            <a href="#our-story" className="about-cta-button">
                                <span className="cta-text">Our Full Story</span>
                                <span className="cta-pulse"></span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="about-stats">
                    <div className="about-stat-card">
                        <div className="stat-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">30+</span>
                            <span className="stat-label">Signature Dishes</span>
                        </div>
                    </div>
                    
                    <div className="about-stat-card">
                        <div className="stat-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">25+</span>
                            <span className="stat-label">Craft Beverages</span>
                        </div>
                    </div>
                    
                    <div className="about-stat-card">
                        <div className="stat-icon-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">50,000+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                    </div>
                </div>
                
                <div className="about-experience">
                    <h3 className="experience-title">Our <span className="experience-title-accent">Culinary Universe</span></h3>
                    
                    <div className="experience-grid">
                        <div className="experience-card">
                            <div className="experience-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="experience-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="experience-name">Digital Dining</h4>
                            <p className="experience-description">
                                Interactive food experiences with augmented reality presentations and flavor-enhancing tech
                            </p>
                        </div>
                        
                        <div className="experience-card">
                            <div className="experience-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="experience-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                            <h4 className="experience-name">Craft Brewery</h4>
                            <p className="experience-description">
                                Small-batch neuro-enhanced beers brewed with cognitive-boosting ingredients and exotic flavor profiles
                            </p>
                        </div>
                        
                        <div className="experience-card">
                            <div className="experience-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="experience-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h4 className="experience-name">Mixology Lab</h4>
                            <p className="experience-description">
                                Advanced beverage engineering with molecular techniques and mood-enhancing compounds
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="about-team">
                    <h3 className="team-title">Meet Our <span className="team-title-accent">Culinary Team</span></h3>
                    
                    <div className="team-members ">
                        <div className="team-member-card">
                            <div className="member-image-container">
                                <div className="member-image-glow"></div>
                                <img src="https://i.pinimg.com/736x/ed/0a/1e/ed0a1e01f31048314bbb5320acf9e813.jpg" alt="Team member" className="member-image" />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Thy Muoyhak</h4>
                                <p className="member-role">Programmer</p>
                                <p className="member-bio">Visionary behind DeliciousEats, with 15+ years in culinary innovation</p>
                            </div>
                        </div>
                        
                        <div className="team-member-card">
                            <div className="member-image-container">
                                <div className="member-image-glow"></div>
                                <img src="https://i.pinimg.com/736x/ed/0a/1e/ed0a1e01f31048314bbb5320acf9e813.jpg" alt="Team member" className="member-image" />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Rin Sreynich</h4>
                                <p className="member-role">Programmer</p>
                                <p className="member-bio">Expert drink engineer creating our signature beverage profiles</p>
                            </div>
                        </div>
                        
                        <div className="team-member-card">
                            <div className="member-image-container">
                                <div className="member-image-glow"></div>
                                <img src="https://i.pinimg.com/736x/ed/0a/1e/ed0a1e01f31048314bbb5320acf9e813.jpg" alt="Team member" className="member-image" />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Cheoun Daro</h4>
                                <p className="member-role">Programmer</p>
                                <p className="member-bio">Crafts our neuro-enhanced beers with cutting-edge brewing techniques</p>
                            </div>
                        </div>
                        <div className="team-member-card">
                            <div className="member-image-container">
                                <div className="member-image-glow"></div>
                                <img src="https://i.pinimg.com/736x/ed/0a/1e/ed0a1e01f31048314bbb5320acf9e813.jpg" alt="Team member" className="member-image" />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Vuth Kunthy</h4>
                                <p className="member-role">Programmer</p>
                                <p className="member-bio">Visionary behind DeliciousEats, with 15+ years in culinary innovation</p>
                            </div>
                        </div>
                        
                        <div className="team-member-card">
                            <div className="member-image-container">
                                <div className="member-image-glow"></div>
                                <img  src="https://i.pinimg.com/736x/ed/0a/1e/ed0a1e01f31048314bbb5320acf9e813.jpg" alt="Team member" className="member-image" />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Nheam Sokmean</h4>
                                <p className="member-role">Programmer</p>
                                <p className="member-bio">Expert drink engineer creating our signature beverage profiles</p>
                            </div>
                        </div>
                         <div className="team-member-card">
                            <div className="member-image-container">
                                <div className="member-image-glow"></div>
                                <img  src="https://i.pinimg.com/736x/ed/0a/1e/ed0a1e01f31048314bbb5320acf9e813.jpg" alt="Team member" className="member-image" />
                            </div>
                            <div className="member-info">
                                <h4 className="member-name">Nheam Sokmean</h4>
                                <p className="member-role">Programmer</p>
                                <p className="member-bio">Expert drink engineer creating our signature beverage profiles</p>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            
            <div className="about-shape-divider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
};

export default About;