import "./styles/Imagesgrid.css"

const Imagesgrid = () => {
    return (
        <section className="images-section">
            <div className="images-grid-overlay"></div>
            <div className="images-glow-orb images-glow-1"></div>
            <div className="images-glow-orb images-glow-2"></div>
            
            <div className="images-container">
                <div className="images-header">
                    <div className="images-badge">Visual Showcase • Our Creations</div>
                    <h2 className="images-title">
                        Explore Our
                        <span className="images-title-accent" data-text="Digital Menu">Digital Menu</span>
                    </h2>
                    <p className="images-subtitle">
                        A gallery of our most visually stunning culinary innovations
                    </p>
                </div>
                
                <div className="images-grid">
                    <div className="grid-item large">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://image.isu.pub/221202111849-ed89bda5ac2e943c88ae107d4f5d60ca/jpg/page_1.jpg" alt="Neon Surge Drink" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Hanumna Beer</h3>
                                <p className="image-description">Our signature energy drink with neural enhancers</p>
                            </div>
                            <div className="image-badge">Featured</div>
                        </div>
                    </div>
                    
                    <div className="grid-item">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://th.bing.com/th/id/OIP.zYeCBcaDVIpV8SznHSdzqAHaIV?rs=1&pid=ImgDetMain" alt="Quantum Bowl" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Sting</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid-item">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://filebroker-cdn.lazada.co.th/kf/S859b8243aff1445bac637659a846dbccm.jpg" alt="Digital Donut" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Chamption</h3>
                            </div>
                            <div className="image-badge new">New</div>
                        </div>
                    </div>
                    
                    <div className="grid-item">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://th.bing.com/th/id/OIP.oA2dQKcRiqQnXYk5tYx9GQHaHq?w=702&h=726&rs=1&pid=ImgDetMain" alt="Binary Burger" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Milk</h3>
                                <p className="image-description">Dual-layered plant/beef hybrid with cognitive enhancers</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid-item">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://th.bing.com/th/id/OIP.8ClaVSSiHKgysrVueW6lygHaIV?w=960&h=1080&rs=1&pid=ImgDetMain" alt="Cyber Sushi" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Sting Blue</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid-item">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1/uk/cuisines/pizza-0.jpg" alt="Matrix Pizza" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Matrix Pizza</h3>
                            </div>
                            <div className="image-badge discount">-15%</div>
                        </div>
                    </div>
                    
                    <div className="grid-item horizontal">
                        <div className="image-container">
                            <div className="image-glow"></div>
                            <img src="https://www.researchgate.net/profile/Mohammed_Messaoudi2/post/What_do_you_think_about_the_idea_for_coffee_compositions_chemical_elements/attachment/5a83139fb53d2f0bba51ab72/AS:593612593172480%401518539679852/download/bag-coffee-beans-shoulder-cup.jpg" alt="Neural Coffee" className="grid-image" />
                            <div className="image-overlay">
                                <h3 className="image-title">Neural Coffee</h3>
                                <p className="image-description">Enhanced with focus-boosting nootropic compounds</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="images-cta-container">
                    <a href="#view-all" className="images-cta-button">
                        <span className="cta-text">View Full Gallery</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Imagesgrid;