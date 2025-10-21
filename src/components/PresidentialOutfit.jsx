import React, { useState } from 'react'
import { FaCrown, FaTshirt, FaStar } from 'react-icons/fa'
import './PresidentialOutfit.css'

const PresidentialOutfit = () => {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <section id="presidential-outfit" className="presidential-outfit">
      <div className="container">
        <div className="outfit-content">
          <div className="outfit-image">
            <div className="image-placeholder">
              <FaCrown className="crown-icon" />
              <div className="outfit-icon">👔</div>
              <p>Presidential Outfit</p>
            </div>
          </div>

          <div className="outfit-info">
            <div className="outfit-badge">
              <FaStar /> Exclusive Experience
            </div>
            <h2>The Presidential Outfit</h2>
            <p className="outfit-tagline">
              Symbol of African Excellence and Leadership
            </p>

            <div className="outfit-features">
              <div className="feature">
                <FaTshirt />
                <div>
                  <h4>Premium Design</h4>
                  <p>Crafted with traditional African fabrics and modern elegance</p>
                </div>
              </div>
              <div className="feature">
                <FaCrown />
                <div>
                  <h4>Symbolic Significance</h4>
                  <p>Represents leadership, excellence, and African pride</p>
                </div>
              </div>
              <div className="feature">
                <FaStar />
                <div>
                  <h4>Exclusive Access</h4>
                  <p>Available for award ceremonies and special summit events</p>
                </div>
              </div>
            </div>

            <div className="outfit-description">
              <p>
                The Presidential Outfit is more than clothing—it's a statement of African excellence. 
                Designed to symbolize leadership and cultural pride, this iconic outfit is available 
                for honorees and distinguished guests at our summit events.
              </p>
            </div>

            <button 
              className="btn btn-primary outfit-btn"
              onClick={() => setShowBooking(!showBooking)}
            >
              <FaTshirt /> Book Your Outfit
            </button>

            {showBooking && (
              <div className="booking-note">
                <p>✨ Scroll down to the contact section to book your Presidential Outfit experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PresidentialOutfit
