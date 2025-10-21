import React from 'react'
import { FaAward, FaStar, FaGlobe } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <FaStar className="badge-icon" />
            <span>Est. 2025</span>
          </div>

          <h1 className="hero-title">
            Welcome to the<br />
            <span className="gradient-text">Honourable Cabinet Summit Awards</span>
          </h1>

          <p className="hero-subtitle">
            Celebrating African Excellence and Leadership
          </p>

          <p className="hero-description">
            Recognizing outstanding achievements and contributions by African high profiles 
            in politics, business, arts, sports, and innovation across the continent.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              <FaAward /> Nominate Now
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <FaGlobe className="stat-icon" />
              <h3>54</h3>
              <p>African Nations</p>
            </div>
            <div className="stat">
              <FaAward className="stat-icon" />
              <h3>7</h3>
              <p>Award Categories</p>
            </div>
            <div className="stat">
              <FaStar className="stat-icon" />
              <h3>100+</h3>
              <p>Honorees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
