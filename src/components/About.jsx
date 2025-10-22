import React from 'react'
import { FaTrophy, FaGlobeAfrica, FaHandshake, FaStar } from 'react-icons/fa'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-badge">Get To Know About Us</div>
        
        <div className="about-layout">
          <div className="about-left">
            <h2 className="about-title">
              We Are Here to Celebrate African Excellence
            </h2>
            
            <p className="about-description">
              The Honourable Cabinet Summit Awards recognizes outstanding achievements and 
              contributions by African high profiles across politics, business, arts, sports, 
              and innovation, inspiring the next generation of leaders.
            </p>

            <div className="about-stats-grid">
              <div className="stat-box">
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Nominated Leaders</p>
                <span className="stat-detail">Across All Sectors</span>
              </div>

              <div className="stat-box">
                <h3 className="stat-number">98%</h3>
                <p className="stat-label">Impact Recognition</p>
                <span className="stat-detail">Continental Reach</span>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-images">
              <div className="image-card image-1">
                <img 
                  src="/images/first.png" 
                  alt="African leaders meeting"
                />
              </div>
              <div className="image-card image-2">
                <img 
                  src="/images/sec.png" 
                  alt="Team collaboration"
                />
              </div>
              <div className="image-card image-3">
                <img 
                  src="/images/third.png" 
                  alt="Leadership excellence"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-values">
          <div className="value-card">
            <div className="value-icon">
              <FaTrophy />
            </div>
            <h3>Excellence</h3>
            <p>Recognizing outstanding achievements across various fields</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaGlobeAfrica />
            </div>
            <h3>Pan-African</h3>
            <p>Celebrating leaders from all 54 African nations</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaHandshake />
            </div>
            <h3>Unity</h3>
            <p>Building bridges across borders and sectors</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <FaStar />
            </div>
            <h3>Legacy</h3>
            <p>Inspiring future generations of African leaders</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
