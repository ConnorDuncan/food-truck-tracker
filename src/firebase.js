import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCdp6nKGP_hV1NNRB2EzMCCUF2sLWWwQww",
    authDomain: "food-truck-tracker-8ee55.firebaseapp.com",
    projectId: "food-truck-tracker-8ee55",
    storageBucket: "food-truck-tracker-8ee55.appspot.com",
    messagingSenderId: "1033266101822",
    appId: "1:1033266101822:web:8fa876f419a273c5aa1b6f",
    measurementId: "G-XCBVF762SV"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth  = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;