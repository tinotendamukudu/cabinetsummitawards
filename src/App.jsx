import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeOffer from './components/WhatWeOffer'
import AwardsCategories from './components/AwardsCategories'
import PastWinners from './components/PastWinners'
import PresidentialOutfit from './components/PresidentialOutfit'
import CTA from './components/CTA'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <WhatWeOffer />
      <AwardsCategories />
      <PastWinners />
      <PresidentialOutfit />
      <CTA />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default App
