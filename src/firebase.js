import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBIYjsV7aAiGhn1QTljHg9htKg9hJWB3i8",
  authDomain: "food-truck-tracker-7289c.firebaseapp.com",
  projectId: "food-truck-tracker-7289c",
  storageBucket: "food-truck-tracker-7289c.appspot.com",
  messagingSenderId: "432084863701",
  appId: "1:432084863701:web:1b48e5de80b69ce5a6b05c",
  measurementId: "G-T368YZRV7K"
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
