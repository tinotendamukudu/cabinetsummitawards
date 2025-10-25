import React, { useState } from 'react'
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaGlobeAfrica, FaComment } from 'react-icons/fa'
import './ContactUs.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: 'nomination',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        subject: 'nomination',
        message: ''
      })
    }, 3000)
  }

  return (
    <section id="contact" className="contact-us">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">
          Get in touch to nominate a leader, book an outfit, or inquire about our events
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p className="contact-intro">
              We're here to answer your questions and help you participate in celebrating African excellence.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="detail-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@cabinetsummitawards.com</p>
                  <p>nominations@cabinetsummitawards.com</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="detail-icon">
                  <FaPhone />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+263 71 321 9733</p>
                  <p>Mon - Fri: 9AM - 6PM (CAT)</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="detail-icon">
                  <FaGlobeAfrica />
                </div>
                <div>
                  <h4>Address</h4>
                  <p>123 Excellence Boulevard</p>
                  <p>Pan-African Plaza, Suite 500</p>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">💼</a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    <FaUser /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaPhone /> Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+263 71 321 9733"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FaGlobeAfrica /> Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaComment /> Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="nomination">Submit Nomination</option>
                      <option value="outfit">Book Presidential Outfit</option>
                      <option value="event">Event Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <FaComment /> Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
