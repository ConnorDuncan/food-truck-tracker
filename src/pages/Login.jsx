// src/components/Login.jsx
import React from 'react';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from '@firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleSigninWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setCurrentUser(result.user); // Update context state
            console.log(result.user);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <GoogleButton onClick={handleSigninWithGoogle} />
        </div>
    );
};

export default Login;
