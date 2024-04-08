import { signOut } from '@firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Home.css'; // Assuming you're storing your CSS in Home.css

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login");
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1>Google Authentication Demo</h1>
            <hr></hr>
            <h2>Welcome {user.displayName}</h2>
            <p>{user.email}</p>
            {user && (<img src={user.photoURL} alt="User" />)}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;
