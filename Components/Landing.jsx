import React from 'react'
import Navbar from './LandingPage/Navbar'
import HeroSection from './LandingPage/HeroSection'
import Features from './LandingPage/Features'
import Memes from './LandingPage/Memes'
import Footer from './Footer'

const Landing = () => {
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <Features/>
       <Memes/>
       <Footer/>
    </div>
  )
}

export default Landing
