import React from 'react'
import { FaBriefcase, FaPalette, FaRunning, FaFlask, FaGraduationCap, FaHeart, FaBalanceScale } from 'react-icons/fa'
import './AwardsCategories.css'

const AwardsCategories = () => {
  const categories = [
    {
      icon: <FaBalanceScale />,
      title: "Politics and Governance",
      description: "Honoring visionary leaders who have transformed governance and public policy across Zimbabwe"
    },
    {
      icon: <FaBriefcase />,
      title: "Business and Entrepreneurship",
      description: "Celebrating innovators and entrepreneurs driving economic growth and job creation"
    },
    {
      icon: <FaPalette />,
      title: "Arts and Culture",
      description: "Recognizing artists, musicians, and cultural ambassadors promoting Zimbabwean heritage"
    },
    {
      icon: <FaRunning />,
      title: "Sports and Fitness",
      description: "Applauding athletes and sports figures who have brought glory to the nation"
    },
    {
      icon: <FaFlask />,
      title: "Science and Technology",
      description: "Honoring innovators and researchers advancing technological progress in Zimbabwe"
    },
    {
      icon: <FaGraduationCap />,
      title: "Education and Research",
      description: "Celebrating educators and scholars shaping minds and driving knowledge"
    },
    {
      icon: <FaHeart />,
      title: "Community Development",
      description: "Recognizing philanthropists and community leaders making positive social impact"
    }
  ]

  return (
    <section id="awards" className="awards-categories">
      <div className="container">
        <h2 className="section-title">Awards Categories</h2>
        <p className="section-subtitle">
          Recognizing excellence across diverse fields of achievement
        </p>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <button className="category-btn">Nominate</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AwardsCategories
