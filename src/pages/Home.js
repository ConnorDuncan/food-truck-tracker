import React, { useEffect } from 'react';
import './Home.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useAuth, onAuthStateChanged } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'mdui/mdui.css';
import 'mdui';
import 'mdui/components/button.js';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

import 'mdui/mdui.css';
import 'mdui';
import 'mdui/components/card.js';

const Home = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

    }, [currentUser]);

    const seeIfAccountExists = async (user) => {
        console.log("Entered seeIfAccountExists function.");
        if (!user) return; // Guard clause if user is still null
        const userDocRef = doc(db, 'userToTrucks', user.uid);
        const userInfoDocRef = doc(db, 'userToInfo', user.uid);
    
        try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) {
                console.log("Document does not exist, creating one...");
                await setDoc(userDocRef, {numTrucks: 0});
                await setDoc(userInfoDocRef, {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                });
                console.log("Document created successfully.");
            } else {
                console.log("Document already exists.");
            }
        } catch (error) {
            console.error("Error accessing document:", error);
        }
    };
    

    const handleSignIn = async (path) => {
        try {
            if (currentUser) {
                navigate(path);
                return;
            }
            const result = await signInWithPopup(auth, provider);
            // Update context state
            setCurrentUser(result.user); 
            console.log('Logged in user:', result.user);
            
            // Move to navigate after the account check
            await seeIfAccountExists(result.user); // Pass user directly
            navigate(path);
        } catch (error) {
            console.error('Login error:', error);
            alert(`Failed to sign in: ${error.message}`);
        }
    };
    

    const handleSigninWithGoogleBusiness = () => handleSignIn("/business/list");
    const handleSigninWithGoogleCustomer = () => handleSignIn("/map");

    const faqs = [
        {
          question: 'How do I sign up as a food truck vendor?',
          answer: 'To sign up as a food truck vendor, please visit our registration page and fill out the necessary information.'
        },
        {
          question: 'Can customers leave reviews for food trucks?',
          answer: 'Yes, registered customers can leave reviews and ratings for food trucks after logging into their accounts.'
        },
        {
          question: 'How can I update my business information?',
          answer: 'Food truck vendors can log in to their accounts to update their business information and menu details.'
        }
        // Add more FAQs as needed
      ];

      return (
        <>
        <div className="home-page" style={{ overflowX: 'hidden', marginBottom: '0' }}>
            <img
                style={{ position: 'absolute', zIndex: '-1', left: '0', top: '13.6%', opacity: '0.5', width: '100%' }}
                alt='Banner'
                src={'./Banner.jpeg'}
            />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <mdui-card style={{ padding: '20px', maxWidth: '600px', width: '100%', height: 'auto', margin: '30px auto', alignItems: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Welcome to Vendor Vista!</h1>
                    <p style={{ textAlign: 'center' }}>Find your favorite food trucks or track your business.</p>
                    <div className="buttons" style={{ display: 'flex', justifyContent: 'center' }}>
                        <mdui-button variant="tonal" class="my-custom-button" onClick={handleSigninWithGoogleBusiness}>Business Login</mdui-button>
                        <mdui-button class="my-custom-button" onClick={handleSigninWithGoogleCustomer}>Customer Login</mdui-button>
                    </div>
                    <div className='intro' style={{ textAlign: 'center', paddingTop: '20px', color: 'gray', fontFamily: 'inherit' }}>
                        Vendor Vista is a platform that makes it easy for you to discover and connect with local vendors. Our mission is to help students find good food and support local businesses.
                    </div>
                    <div style={{ paddingTop: '20px', color: 'gray', fontFamily: 'inherit', textAlign: 'center' }}>
                        <p>Trusted by 1 business worldwide.</p>
                    </div>
                </mdui-card>
            </div>
        </div>
        <div className='faq' style={{ background: 'white', width: '100%', marginTop: '50%' }}>
            <h2 style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <ul style={{ textAlign: 'center' }}>
                {faqs.map((faq, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
    
}

export default Home;
