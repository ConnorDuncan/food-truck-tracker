import { signOut } from '@firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../components/AuthContext';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
export default () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    
    if (!currentUser) {
        return <div>Loading user information...</div>;
    }

    return (
        <div className="container">
            <h1>Google Authentication Demo (Customer)</h1>
            <hr />
            <h2>Welcome {currentUser.displayName || 'User'}</h2>
            <p>{currentUser.email || 'No email available'}</p>
            <p>Unique ID: {currentUser.uid}</p>
            {currentUser.photoURL && <img src={currentUser.photoURL} alt="User" />}
            
        </div>
        
    );
}