import React from 'react'
import { FaTrophy, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaTrophy className="footer-logo-icon" />
              <span>HCSA</span>
            </div>
            <p className="footer-description">
              Celebrating African Excellence and Leadership across all 54 nations. 
              Honoring those who inspire and shape the future of our continent.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li onClick={() => scrollToSection('hero')}>Home</li>
              <li onClick={() => scrollToSection('about')}>About Us</li>
              <li onClick={() => scrollToSection('what-we-offer')}>What We Offer</li>
              <li onClick={() => scrollToSection('awards')}>Awards Categories</li>
              <li onClick={() => scrollToSection('contact')}>Contact</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Awards</h4>
            <ul className="footer-links">
              <li>Politics & Governance</li>
              <li>Business & Entrepreneurship</li>
              <li>Arts & Culture</li>
              <li>Sports & Fitness</li>
              <li>Science & Technology</li>
              <li>Education & Research</li>
              <li>Community Development</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FaMapMarkerAlt />
                <span>123 Excellence Boulevard<br />Pan-African Plaza, Suite 500</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope />
                <span>info@hcsa-awards.org</span>
              </div>
              <div className="footer-contact-item">
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Honourable Cabinet Summit Awards. All rights reserved.
          </p>
          <p className="footer-tagline">
            Made with <FaHeart className="heart-icon" /> for Africa
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
