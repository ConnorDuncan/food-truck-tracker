import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore"
import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth  = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export default app;

firebase.initializeApp(firebaseConfig)
export default firebase