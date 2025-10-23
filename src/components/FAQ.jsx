import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqData = [
    {
      question: "What is the Honourable Cabinet Summit Awards?",
      answer: "The HCSA is a prestigious recognition platform celebrating outstanding leadership and innovation across African government sectors. We honor cabinet members, ministers, and senior government officials who have demonstrated exceptional service, transformative policies, and positive impact on their nations and the continent."
    },
    {
      question: "Who can nominate candidates for the awards?",
      answer: "Nominations are open to government institutions, civil society organizations, professional associations, and citizens. Self-nominations are also accepted. All nominees must be current or former cabinet members, ministers, or senior government officials from African nations who have made significant contributions to their respective sectors."
    },
    {
      question: "What are the award categories?",
      answer: "Our categories include Excellence in Economic Development, Innovation in Healthcare, Education Transformation, Infrastructure Development, Environmental Sustainability, Digital Innovation, Youth Empowerment, Women's Advancement, and Lifetime Achievement Award, among others. Each category recognizes specific areas of governmental excellence."
    },
    {
      question: "How are winners selected?",
      answer: "Winners are selected through a rigorous multi-stage process. Our independent panel of experts, including former heads of state, academics, and civil society leaders, evaluates all nominations based on criteria such as impact, innovation, sustainability, and leadership. Public voting also contributes to the final selection in certain categories."
    },
    {
      question: "When and where is the awards ceremony held?",
      answer: "The annual HCSA ceremony is held in a different African capital each year, rotating across regions to ensure continental representation. The event typically takes place in the fourth quarter of the year and includes a two-day summit featuring policy discussions, networking sessions, and the awards gala."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faq" className="faq">
      <div className="faq-background">
        <div className="faq-pattern"></div>
      </div>

      <div className="container">
        <div className="faq-header">
          <div className="faq-badge">
            <span>FAQ</span>
          </div>
          <h2>Answers to Common Questions of our Services</h2>
        </div>

        <div className="faq-content">
          <div className="faq-accordion">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openIndex === index ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="question-number">{index + 1}.</span>
                  <span className="question-text">{faq.question}</span>
                  <span className="faq-icon">
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-image-card">
            <img 
              src="/images/cta.png" 
              alt="HCSA Awards Ceremony" 
              className="faq-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
