import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './pages/Home'
import BusinessInfo from './pages/BusinessInfo'
import { useState, useEffect } from 'react'
import { AuthProvider } from './components/AuthContext'

function App() {
  const [output, setOutput] = useState(0)
  const arg = 'testing'
  // useEffect(() => {
  //   fetch(`http://127.0.0.1:5000/flask/verify?img=${arg}`)
  //   .then(res => res.json())
  //   .then(data => { setOutput(data.test) })
  // })

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
