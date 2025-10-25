import React, { useState, useEffect } from 'react'
import { FaAward, FaStar, FaGlobe, FaPlayCircle } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = [
    '/images/first.png',
    '/images/sec.png',
    '/images/third.png',
    '/images/4th.png'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      {/* Background Image Slideshow */}
      <div className="hero-background-slider">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`hero-background-image ${
              index === currentImageIndex ? 'active' : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <FaStar className="badge-icon" />
            <span>CELEBRATING EXCELLENCE</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-subtitle-top">HONOURABLE CABINET</span>
            <span className="gradient-text">SUMMIT</span>
            <span className="gradient-text">AWARDS</span>
          </h1>

          <p className="hero-description">
            Recognizing and celebrating outstanding achievements and contributions by 
            African leaders in politics, business, arts, sports, and innovation. 
            Every award is a masterpiece of excellence, honoring those who shape our continent's future.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              BOOK YOUR SEAT
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-images-wrapper">
            {/* Main Large Arch Image */}
            <div className="hero-main-arch">
              <img src="/images/first.png" alt="Awards Ceremony" />
            </div>
            
            {/* Top Circle Image */}
            <div className="hero-circle top-circle">
              <img src="/images/sec.png" alt="Excellence Recognition" />
            </div>
            
            {/* Bottom Left Circle Image */}
            <div className="hero-circle bottom-circle">
              <img src="/images/third.png" alt="Leadership Award" />
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
