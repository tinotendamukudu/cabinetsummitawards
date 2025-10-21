import React from 'react'
import { FaTrophy, FaMedal } from 'react-icons/fa'
import './PastWinners.css'

const PastWinners = () => {
  const winners = [
    {
      name: "Dr. Ngozi Okonjo-Iweala",
      country: "Nigeria",
      category: "Politics & Governance",
      achievement: "First African and first woman to lead the WTO",
      year: "2024",
      image: "👩🏿‍💼"
    },
    {
      name: "Elon Musk",
      country: "South Africa",
      category: "Business & Technology",
      achievement: "Pioneering innovation in space exploration and sustainable energy",
      year: "2024",
      image: "👨🏼‍💼"
    },
    {
      name: "Burna Boy",
      country: "Nigeria",
      category: "Arts & Culture",
      achievement: "Global African music ambassador and Grammy winner",
      year: "2023",
      image: "🎤"
    },
    {
      name: "Prof. Catherine Ngila",
      country: "Kenya",
      category: "Science & Research",
      achievement: "Groundbreaking work in nanotechnology and water purification",
      year: "2023",
      image: "👩🏿‍🔬"
    }
  ]

  return (
    <section id="past-winners" className="past-winners">
      <div className="container">
        <h2 className="section-title">Hall of Excellence</h2>
        <p className="section-subtitle">
          Celebrating our distinguished honorees and their remarkable achievements
        </p>

        <div className="winners-grid">
          {winners.map((winner, index) => (
            <div 
              key={winner.name}
              className="winner-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="winner-badge">
                <FaTrophy />
              </div>
              <div className="winner-image">{winner.image}</div>
              <div className="winner-info">
                <h3>{winner.name}</h3>
                <p className="winner-country">📍 {winner.country}</p>
                <div className="winner-category">
                  <FaMedal /> {winner.category}
                </div>
                <p className="winner-achievement">{winner.achievement}</p>
                <div className="winner-year">{winner.year}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="winners-cta">
          <p>Join the ranks of Africa's finest leaders</p>
          <button className="btn btn-primary">View All Winners</button>
        </div>
      </div>
    </section>
  )
}

export default PastWinners
