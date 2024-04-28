import './Navbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import {auth} from './firebase';
import { useAuth } from './components/AuthContext';


const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
  };
    return (
      <nav className="navbar">
        <a href="/" className="logo"> 
          <img src="/logo.png" alt="logo" height="50" /> 
        </a>
        <div>
          <a href="/" className='WebName' >VendorVista</a>
        </div>
  
        <div className="links">
          <a href="/" className="nav-link">Home</a>
          <a href="/map" className="nav-link">Map</a>
          <a href="/home" className="nav-link" onClick={handleLogout}>Logout</a>
        </div>
      </nav>
    );
  };
 
export default Navbar;