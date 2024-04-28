import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './pages/Home'
import BusinessInfo from './pages/BusinessInfo'
import Map from './pages/Map.js'
// import { useState, useEffect } from 'react'
import { AuthProvider } from './components/AuthContext'
import BusinessLogin from './pages/BusinessLogin'
import CustomerLogin from './pages/CustomerLogin'
import Protected from './components/Protected.jsx'
import NotFound from './pages/FourOhFour.js'
import firebase from './firebase.js'

function App() {
  const ref = firebase.firestore().collection("food-trucks")
  console.log(ref);
  
  return (
    <div>
      <AuthProvider>
        <Router>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/business/info' element={<Protected/>}>
              <Route path='/business/info' element={<BusinessInfo />}/>
            </Route>
            <Route path='/map' element={<Map/>}/>
            <Route path='/business/login' element={<Protected/>}>
              <Route path='/business/login' element={<BusinessLogin/>}/>
            </Route>
            <Route path='/customer/login' element={<Protected/>}>
              <Route path='/customer/login' element={<CustomerLogin/>}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
