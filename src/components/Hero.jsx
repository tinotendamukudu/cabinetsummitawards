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
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
