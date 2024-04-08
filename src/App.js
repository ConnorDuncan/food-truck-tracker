import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import CustomerLogin from './pages/CustomerLogin'
import BusinessLogin from './pages/BusinessLogin'
import BusinessRegister from './pages/BusinessRegister'
import MyBusinesses from './pages/MyBusinesses'
import { Outlet } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className='App'><Outlet></Outlet></div>
  );
}

export default App;
