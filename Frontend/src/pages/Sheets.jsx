import React from 'react'
import Navbar from '../components/dashboard/Navbar'
import SheetsList from '../components/sheets/SheetsList'
import Footer from '../components/dashboard/Footer'

const Sheets = () => {
  return (
    <div>
      <Navbar/>
      <SheetsList/>
      <Footer/>
    </div>
  )
}

export default Sheets
