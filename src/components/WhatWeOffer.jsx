import React from 'react'
import { FaFlag, FaUsers, FaTshirt, FaCrown, FaBook, FaHandHoldingHeart } from 'react-icons/fa'
import './WhatWeOffer.css'

const WhatWeOffer = () => {
  const offerings = [
    {
      icon: <FaFlag />,
      title: "Country Recognition",
      description: "Individual country pages featuring national heroes, leaders, and their remarkable achievements across various sectors."
    },
    {
      icon: <FaUsers />,
      title: "Leadership Profiles",
      description: "Comprehensive profiles of distinguished African leaders showcasing their professions, contributions, and impact."
    },
    {
      icon: <FaTshirt />,
      title: "Presidential Outfit",
      description: "Exclusive opportunity to wear the iconic Presidential Outfit, symbolizing African excellence and leadership."
    },
    {
      icon: <FaCrown />,
      title: "Summit Events",
      description: "Access to prestigious summit events, networking opportunities, and exclusive country-specific packages."
    },
    {
      icon: <FaBook />,
      title: "Documentation",
      description: "Permanent recognition in our Hall of Fame, documenting the legacy of African excellence for future generations."
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Nomination Process",
      description: "Simple and transparent nomination process to recognize deserving African leaders and high-profile individuals."
    }
  ]

  return (
    <section id="what-we-offer" className="what-we-offer">
      <div className="container">
        <h2 className="section-title">What We Offer</h2>
        <p className="section-subtitle">
          Comprehensive recognition and celebration of African excellence
        </p>

        <div className="offerings-grid">
          {offerings.map((offer, index) => (
            <div key={index} className="offering-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="offering-icon">
                {offer.icon}
              </div>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeOffer
