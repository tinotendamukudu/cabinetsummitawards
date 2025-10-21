import React from 'react'
import './AfricanFlags.css'

const AfricanFlags = () => {
  const countries = [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
    "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros",
    "Congo", "DR Congo", "Ivory Coast", "Djibouti", "Egypt", "Equatorial Guinea",
    "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
    "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
    "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique",
    "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal",
    "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan",
    "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
  ]

  const getFlagEmoji = (country) => {
    const flags = {
      "Algeria": "🇩🇿", "Angola": "🇦🇴", "Benin": "🇧🇯", "Botswana": "🇧🇼",
      "Burkina Faso": "🇧🇫", "Burundi": "🇧🇮", "Cameroon": "🇨🇲", "Cape Verde": "🇨🇻",
      "Central African Republic": "🇨🇫", "Chad": "🇹🇩", "Comoros": "🇰🇲", "Congo": "🇨🇬",
      "DR Congo": "🇨🇩", "Ivory Coast": "🇨🇮", "Djibouti": "🇩🇯", "Egypt": "🇪🇬",
      "Equatorial Guinea": "🇬🇶", "Eritrea": "🇪🇷", "Eswatini": "🇸🇿", "Ethiopia": "🇪🇹",
      "Gabon": "🇬🇦", "Gambia": "🇬🇲", "Ghana": "🇬🇭", "Guinea": "🇬🇳",
      "Guinea-Bissau": "🇬🇼", "Kenya": "🇰🇪", "Lesotho": "🇱🇸", "Liberia": "🇱🇷",
      "Libya": "🇱🇾", "Madagascar": "🇲🇬", "Malawi": "🇲🇼", "Mali": "🇲🇱",
      "Mauritania": "🇲🇷", "Mauritius": "🇲🇺", "Morocco": "🇲🇦", "Mozambique": "🇲🇿",
      "Namibia": "🇳🇦", "Niger": "🇳🇪", "Nigeria": "🇳🇬", "Rwanda": "🇷🇼",
      "São Tomé and Príncipe": "🇸🇹", "Senegal": "🇸🇳", "Seychelles": "🇸🇨",
      "Sierra Leone": "🇸🇱", "Somalia": "🇸🇴", "South Africa": "🇿🇦",
      "South Sudan": "🇸🇸", "Sudan": "🇸🇩", "Tanzania": "🇹🇿", "Togo": "🇹🇬",
      "Tunisia": "🇹🇳", "Uganda": "🇺🇬", "Zambia": "🇿🇲", "Zimbabwe": "🇿🇼"
    }
    return flags[country] || "🏴"
  }

  return (
    <section id="african-flags" className="african-flags">
      <div className="container">
        <h2 className="section-title">African Nations</h2>
        <p className="section-subtitle">
          Celebrating excellence across all 54 African countries
        </p>

        <div className="flags-grid">
          {countries.map((country, index) => (
            <div 
              key={country}
              className="flag-card"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              <div className="flag-emoji">{getFlagEmoji(country)}</div>
              <p className="flag-name">{country}</p>
            </div>
          ))}
        </div>

        <div className="flags-cta">
          <p>Explore leaders and heroes from each nation</p>
          <button className="btn btn-primary">Browse Countries</button>
        </div>
      </div>
    </section>
  )
}

export default AfricanFlags
