import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../components/AuthContext';
import './Home.css';

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    // Show loading or null if currentUser is not yet defined
    if (!currentUser) {
        return <div>Loading user information...</div>;
    }

    return (
        <div className="container">
            <h1>Google Authentication Demo</h1>
            <hr />
            <h2>Welcome {currentUser.displayName || 'User'}</h2>
            <p>{currentUser.email || 'No email available'}</p>
            {currentUser.photoURL && <img src={currentUser.photoURL} alt="User" />}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
