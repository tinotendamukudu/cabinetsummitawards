import React from 'react'
import { FaTrophy, FaGlobeAfrica, FaHandshake, FaStar } from 'react-icons/fa'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">
          Honoring the visionaries shaping Africa's future
        </p>

        <div className="about-content">
          <div className="about-main">
            <p className="about-text">
              The <strong>Honourable Cabinet Summit Awards</strong> is a prestigious recognition 
              of outstanding achievements and contributions by African high profiles in various fields, 
              including politics, business, arts, sports, and more.
            </p>
            <p className="about-text">
              Our mission is to honor and celebrate African leaders who have made significant impacts 
              on the continent and beyond. We believe in recognizing excellence, promoting African 
              values, and inspiring the next generation of leaders across all 54 African nations.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <div className="card-icon">
                <FaTrophy />
              </div>
              <h3>Excellence</h3>
              <p>Recognizing outstanding achievements across various fields</p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <FaGlobeAfrica />
              </div>
              <h3>Pan-African</h3>
              <p>Celebrating leaders from all 54 African nations</p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <FaHandshake />
              </div>
              <h3>Unity</h3>
              <p>Building bridges across borders and sectors</p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <FaStar />
              </div>
              <h3>Legacy</h3>
              <p>Inspiring future generations of African leaders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
