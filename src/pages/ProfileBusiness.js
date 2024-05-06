import React from 'react';
import './Settings.css';
import useProfile from '../useProfile';

const ProfileBusiness = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
                <p className="loading-text">Loading, please do not close the page, refresh the page, or click the back button.</p>
            </div>
    ); // or your preferred loading indicator
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="profile-placeholder">
            <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
                <p className="loading-text">Loading, please do not close the page, refresh the page, or click the back button.</p>
            </div>
          </div>
        )}
        <h2 className="profile-name">{profile.name || 'Anonymous'}</h2>
        <p className="profile-email">{profile.email || 'No email provided'}</p>
        <p className="profile-description">Description: {profile.description || 'No description available'}</p>
      </div>
    </div>
  );
};

export default ProfileBusiness;
