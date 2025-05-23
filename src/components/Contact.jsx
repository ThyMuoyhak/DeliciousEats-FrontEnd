import { useState } from 'react';
import emailjs from '@emailjs/browser';
import "./styles/Contact.css";
 
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Using the provided EmailJS template and service IDs
            const result = await emailjs.send(
                '',        // Your service ID
                '',         // Your template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject || 'Contact Form Submission',
                    message: formData.message,
                    to_email: 'example@gmail.com'
                },
                ''          // Your public key / user ID
            );
            
            if (result.text === 'OK') {
                setSubmitStatus('success');
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Clear status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        }
    };
    
    return (
        <section className="contact-section">
            <div className="contact-grid-overlay"></div>
            <div className="contact-glow-orb contact-glow-1"></div>
            <div className="contact-glow-orb contact-glow-2"></div>
            
            <div className="contact-container">
                <div className="contact-header">
                    <div className="contact-badge">24/7 Support • Digital Interface</div>
                    <h2 className="contact-title">
                        Connect With
                        <span className="contact-title-accent" data-text="Our Network">Our Network</span>
                    </h2>
                    <p className="contact-subtitle">
                        Reach out through our secure communication channels for orders, support, or partnership inquiries
                    </p>
                </div>
                
                <div className="contact-content">
                    <div className="contact-form-container">
                        <div className="form-header">
                            <div className="form-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="form-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="form-title">Send Transmission</h3>
                        </div>
                        
                        {submitStatus === 'success' && (
                            <div className="form-status-message success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <p>Message transmitted successfully!</p>
                            </div>
                        )}
                        
                        {submitStatus === 'error' && (
                            <div className="form-status-message error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="status-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <p>Transmission failed. Please try again.</p>
                            </div>
                        )}
                        
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="form-input" 
                                        placeholder=" " 
                                        required
                                        value={formData.name}
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <div className="input-glow"></div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="form-input" 
                                        placeholder=" " 
                                        required
                                        value={formData.email}
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <div className="input-glow"></div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <select 
                                        id="subject" 
                                        className="form-input form-select" 
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select Subject</option>
                                        <option value="Order Inquiry">Place an Order</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Business Partnership">Business Partnership</option>
                                        <option value="Feedback">Feedback</option>
                                    </select>
                                    <div className="input-glow"></div>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <textarea 
                                        id="message" 
                                        className="form-input form-textarea" 
                                        rows="5" 
                                        placeholder=" " 
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    <label htmlFor="message" className="form-label">Your Message</label>
                                    <div className="input-glow"></div>
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                className={`form-submit-btn ${isSubmitting ? 'submitting' : ''}`} 
                                disabled={isSubmitting}
                            >
                                <span className="btn-text">
                                    {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
                                </span>
                                {!isSubmitting && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                                <span className="btn-pulse"></span>
                            </button>
                        </form>
                    </div>
                    
                    <div className="contact-info-container">
                        <div className="info-card">
                            <div className="info-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h4 className="info-title">Location</h4>
                                <p className="info-text">Eats District, Level 42</p>
                                <p className="info-text">Phnom Penh, Cambodia</p>
                            </div>
                        </div>
                        
                        <div className="info-card">
                            <div className="info-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h4 className="info-title">Open Hours</h4>
                                <p className="info-text">Monday - Friday: 24/7</p>
                                <p className="info-text">Weekend: 10:00 - 02:00</p>
                            </div>
                        </div>
                        
                        <div className="info-card">
                            <div className="info-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h4 className="info-title">Contact</h4>
                                <p className="info-text">Phone: +855 (0) 969 420 333</p>
                                <p className="info-text">Email: thymuoyhak.biu@gmail.com</p>
                            </div>
                        </div>
                        
                        <div className="social-links">
                            <h4 className="social-title">Connect With Us</h4>
                            <div className="social-icons">
                                <a href="#" className="social-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="social-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="contact-map">
                    <div className="map-header">
                        <h3 className="map-title">Our <span className="map-title-accent">Location</span></h3>
                    </div>
                    <div className="map-container">
                        <div className="map-overlay">
                            <div className="map-marker"></div>
                            <div className="map-pulse"></div>
                        </div>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250151.94732948628!2d104.7340319545897!3d11.552552384962324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1684930946039!5m2!1sen!2skh" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
            
            <div className="contact-shape-divider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
}

export default Contact;