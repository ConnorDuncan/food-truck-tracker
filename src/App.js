import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './pages/Home'
import BusinessInfo from './pages/BusinessInfo'
import Map from './pages/Map'
import { useState, useEffect } from 'react'
import { AuthProvider } from './components/AuthContext'

function App() {
  const [output, setOutput] = useState('')

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Request user's location
      navigator.geolocation.getCurrentPosition(function(position) {
        // Retrieve latitude and longitude
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

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
          <Route path='/map' element={<Map />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
