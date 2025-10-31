import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCrown, FaTshirt, FaStar } from 'react-icons/fa'
import './PresidentialOutfit.css'

const PresidentialOutfit = () => {
  const navigate = useNavigate()

  const handleBooking = () => {
    navigate('/table-booking')
  }

  return (
    <section id="presidential-outfit" className="presidential-outfit">
      <div className="container">
        <div className="outfit-content">
          <div className="outfit-image">
            <img src="/images/b-2.png" alt="Presidential Outfit" />
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

            <button 
              className="btn btn-primary text-white outfit-btn"
              onClick={handleBooking}
            >
              <FaTshirt /> Book Your Presidential Outfit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PresidentialOutfit
