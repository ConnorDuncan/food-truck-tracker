import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './pages/Home'
import BusinessInfo from './pages/BusinessInfo'
import Map from './pages/Map.js'
// import { useState, useEffect } from 'react'
import { AuthProvider } from './components/AuthContext'

function App() {
  return (
    <div>
      <AuthProvider>
      <div className='App'><Outlet></Outlet></div>
      </AuthProvider>
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/business-info' element={<BusinessInfo />}/>
          <Route path='/map' element={<Map/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
