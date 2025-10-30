import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import WhatWeOffer from './components/WhatWeOffer'
import AwardsCategories from './components/AwardsCategories'
import PastWinners from './components/PastWinners'
import PresidentialOutfit from './components/PresidentialOutfit'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import BookingPage from './pages/BookingPage'

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <WhatWeOffer />
              <AwardsCategories />
              <PastWinners />
              <PresidentialOutfit />
              <CTA />
              <FAQ />
            </>
          } />
          {/* <Route path="/booking" element={<BookingPage />} /> */}
          <Route path="/table-booking" element={<BookingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
