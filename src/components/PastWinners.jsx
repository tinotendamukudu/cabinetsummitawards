import React from 'react'
import { FaTrophy, FaMedal } from 'react-icons/fa'
import './PastWinners.css'

const PastWinners = () => {
  const winners = [
    {
      name: "Nelson Mandela",
      country: "South Africa",
      category: "Politics & Governance",
      achievement: "First democratically elected president and anti-apartheid revolutionary",
      year: "1994",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg",
      isImageUrl: true
    },
    {
      name: "Seretse Khama",
      country: "Botswana",
      category: "Politics & Governance",
      achievement: "First President of Botswana and founding father",
      year: "1966",
      image: "https://www.unisa.ac.za/static/corporate_web/Content/UHM/personalities/images/President%20Seretse%20Khama.jpg",
      isImageUrl: true
    },
    {
      name: "Oliver Mtukudzi",
      country: "Zimbabwe",
      category: "Arts & Culture",
      achievement: "Legendary musician and cultural icon",
      year: "2019",
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR0PZZBQRKxBAQob-naZxDnUWvP0_3IzR7-JMOFA8KS63ClaNAFyJbtRLHSdwUozxQtkj4KxUveJG9UUHFEBVZiWbDjX-OgpBxHphQCnP0",
      isImageUrl: true
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
              <div className="winner-image">
                {winner.isImageUrl ? (
                  <img src={winner.image} alt={winner.name} />
                ) : (
                  winner.image
                )}
              </div>
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
      </div>
    </section>
  )
}

export default PastWinners
