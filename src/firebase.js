import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCOqmlDb6G0OFbIR6IjqQLJn-1Yj_IdAck",
    authDomain: "food-truck-tracker-temp.firebaseapp.com",
    projectId: "food-truck-tracker-temp",
    storageBucket: "food-truck-tracker-temp.appspot.com",
    messagingSenderId: "618941085910",
    appId: "1:618941085910:web:5c6cf75c31fcaf3d7cb177",
    measurementId: "G-1GDGT87LB5"
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
