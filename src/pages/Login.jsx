
import { signInWithPopup } from '@firebase/auth';
import React from 'react';
import GoogleButton from 'react-google-button';
import { auth, provider } from '../firebase';
import { GoogleAuthProvider } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();

    const handleSigninWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            localStorage.setItem('token', result.user.accessToken);
            localStorage.setItem('user', JSON.stringify(result.user));
            navigate("/");
            
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <GoogleButton onClick={handleSigninWithGoogle}  />
        </div>
    )
}

export default Login;