import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // Ensure db is properly imported
import { useAuth } from './components/AuthContext';
import { Menu, MenuItem, Typography, IconButton, Avatar } from '@material-ui/core';
import tempPhoto from './default-photo.png';
const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current location
  const [anchorEl, setAnchorEl] = useState(null);
  const { isCustomer, setNull } = useAuth();
  const {counter, setCounter} = useState(0);
  const [userPhoto, setUserPhoto] = useState();

  useEffect(() => {
    // Clear the anchorEl state on location change
    setAnchorEl(null);

    // Fetch user photo from Firestore
    const fetchUserPhoto = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'userToInfo', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().photo) {
          setUserPhoto(userDocSnap.data().photo);
        }
      }
    };

    fetchUserPhoto();
  }, [location, currentUser]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuSettings = () => {
    setAnchorEl(null);
    navigate('/user/Settings');
  };
  const handleMenuProfile = () => {
    setAnchorEl(null);
    if(isCustomer){
      navigate('/customer/Profile');
    }
    else{
      navigate('/business/Profile');
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
 


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAnchorEl(null); // Clear the anchorEl state
      setNull();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  let userLabel = "Business";
  if(isCustomer){
    userLabel = "Customer";
  }

  return (
    <nav className="navbar">
      <a href="/" className="logo"> 
        <img src="/logo.png" alt="logo" height="50" /> 
      </a>
      <div>
        <a href="/" className='WebName' >VendorVista</a>
      </div>

      <div className="links">
        <a href="/map" className="nav-link">Map</a>
        { currentUser && 
        <>
          <IconButton onClick={handleMenuOpen}>
            <img
              src={userPhoto? userPhoto : tempPhoto}
              alt="User Profile"
              className="user-photo"
              style={{ borderRadius: '50%', width: '40px', height: '40px' }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                width: '250px', // Adjust width
                height: 'auto', // Adjust height
                marginTop:'60px'
              },
            }}
          >
            <p style={{ textAlign: 'center' }}>Signed in as {userLabel}</p>
            <MenuItem onClick={handleMenuProfile}>
              <Avatar src={userPhoto} style={{ marginRight: '10px' }} />
              <Typography>{currentUser? currentUser.displayName : 'User'}</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
