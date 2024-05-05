import React from 'react';
import { useAuth } from '../components/AuthContext';
import './Settings.css';

const ProfileCustomer = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={currentUser?.photoURL}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{currentUser?.displayName}</h2>
        <p className="profile-email">{currentUser?.email}</p>
        <p className="profile-email">Description: {currentUser?.description}</p>
      </div>
    </div>
  );
};

export default ProfileCustomer;
