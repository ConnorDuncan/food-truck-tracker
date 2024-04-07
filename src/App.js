import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './pages/Home'
import BusinessInfo from './pages/BusinessInfo'
import { useState, useEffect } from 'react'

function App() {
  const [output, setOutput] = useState(0)
  useEffect(() => {
    fetch('http://127.0.0.1:5000/flask/verify')
    .then(res => res.json())
    .then(data => { setOutput(data.test) })
  })

  return (
    <div>
      <h1>Output: {output}</h1>
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
