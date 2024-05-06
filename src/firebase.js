import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCdp6nKGP_hV1NNRB2EzMCCUF2sLWWwQww",
  authDomain: "food-truck-tracker-8ee55.firebaseapp.com",
  projectId: "food-truck-tracker-8ee55",
  storageBucket: "food-truck-tracker-8ee55.appspot.com",
  messagingSenderId: "1033266101822",
  appId: "1:1033266101822:web:efb60ea75a319f2caa1b6f",
  measurementId: "G-GBNT7JZRGS"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  
  // Initialize Firebase Auth
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export { app, db, auth, provider };
  export const storage = getStorage(app);
