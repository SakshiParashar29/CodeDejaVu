import React from 'react'
// import AddForm from '../Components/DashBoard/AddForm.jsx'
import Navbar from '../Components/DashBoard/Navbar.jsx'
// import Problems from '../Components/DashBoard/Problems.jsx'
// import Profile from '../Components/DashBoard/Profile.jsx'
import Footer from '../Components/Footer.jsx' 
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
      {/* <Profile/>
      <Problems/>
      <AddForm/> */}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
