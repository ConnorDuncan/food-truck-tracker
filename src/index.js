import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TruckPage from './TruckPage';
import reportWebVitals from './reportWebVitals';
import UpdateInfo from './UpdateInfo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTruck from './AddTruck';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <Routes>

        <Route path="/" element={<TruckPage />} />
        <Route path="/UpdateInfo/:truckName" element={<UpdateInfo />} />
        <Route path="/AddTruck" element={<AddTruck />} />


      </Routes>
    
    </React.StrictMode>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
