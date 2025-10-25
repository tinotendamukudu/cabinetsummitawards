import React from 'react'
import { FaAward, FaEnvelope, FaPhone } from 'react-icons/fa'
import './CTA.css'

const CTA = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="cta">
      <div className="cta-background">
        <div className="cta-pattern"></div>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <div className="cta-icon">
            <FaAward />
          </div>
          
          <h2>Be Part of African Excellence</h2>
          <p className="cta-subtitle">
            Nominate a deserving leader or register for our prestigious summit events
          </p>

          <div className="cta-buttons">
            <button className="btn btn-primary cta-btn" onClick={scrollToContact}>
              <FaAward /> Submit Nomination
            </button>
          </div>

          <div className="cta-contact-info">
            <div className="cta-contact-item">
              <FaEnvelope />
              <span>info@cabinetsummitawards.com</span>
            </div>
            <div className="cta-contact-item">
              <FaPhone />
              <span>+263 71 321 9733</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
