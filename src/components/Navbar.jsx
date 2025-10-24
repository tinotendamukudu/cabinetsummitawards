import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaTrophy } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo" onClick={() => scrollToSection('hero')}>
            {!logoError ? (
              <img 
                src="/images/logo.png" 
                alt="HCSA Logo" 
                className="logo-image"
                onError={() => setLogoError(true)}
              />
            ) : (
              <>
                <FaTrophy className="logo-icon" />
                <span className="logo-text">HCSA</span>
              </>
            )}
          </div>

          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li onClick={() => scrollToSection('hero')}>Home</li>
            <li onClick={() => scrollToSection('about')}>About Us</li>
            <li onClick={() => scrollToSection('what-we-offer')}>What We Offer</li>
            <li onClick={() => scrollToSection('awards')}>Awards</li>
            <li onClick={() => scrollToSection('contact')}>Contact</li>
            <li>
              <button 
                className="nav-btn"
                onClick={() => scrollToSection('contact')}
              >
                Book Now
              </button>
            </li>
          </ul>

          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
