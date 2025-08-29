"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './contact.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          message: ''
        });
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className={styles.contactPage}>
      <div className="container">
        <div className={styles.contactContainer}>
          {/* Header Section */}
          <div className={styles.header}>
            <h1 className={styles.title}>CONTACT US</h1>
            <p className={styles.subtitle}>
              Have questions about off-campus opportunities? We&apos;re here to help!
            </p>
          </div>

          <div className={styles.contentWrapper}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <div className={styles.infoCard}>
                <h3>Industrial Interaction Cell</h3>
                <p>National Institute of Technology Durgapur</p>
                
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <span className={styles.icon}>📧</span>
                    <div>
                      <strong>Email</strong>
                      <p> iic@nitdgp.ac.in</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <span className={styles.icon}>📍</span>
                    <div>
                      <strong>Address</strong>
                      <p>NIT Durgapur<br />Mahatma Gandhi Rd<br />Durgapur, West Bengal 713209</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <span className={styles.icon}>🕒</span>
                    <div>
                      <strong>Office Hours</strong>
                      <p>Monday - Friday<br />9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.formSection}>
              <div className={styles.formContainer}>
                <h2>Send us a Message</h2>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="mobile">Mobile Number *</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
