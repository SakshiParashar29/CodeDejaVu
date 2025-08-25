import './App.css'
import Landing from '../Components/Landing.jsx'
import Home from '../Components/Home.jsx'
import SignUp from '../Components/SignUp.jsx'
import SignIn from '../Components/SignIn.jsx'
import Analytics from '../Components/Analytics/Analytics.jsx'
import DashBoard from '../Components/DashBoard/DashBoard.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Setting from '../Components/Settings/Setting.jsx'
function App() {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route element={<Home/>}>
               <Route path='/analytics' element={<Analytics/>}/>
               <Route path='/dashboard' element={<DashBoard/>}/>
               <Route path='/settings' element={<Setting/>}/>
            </Route>
         </Routes>
      </Router>
   )
}

export default App
