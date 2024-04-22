import firebase from "firebase";
import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdp6nKGP_hV1NNRB2EzMCCUF2sLWWwQww",
    authDomain: "food-truck-tracker-8ee55.firebaseapp.com",
    projectId: "food-truck-tracker-8ee55",
    storageBucket: "food-truck-tracker-8ee55.appspot.com",
    messagingSenderId: "1033266101822",
    appId: "1:1033266101822:web:6825f817bfb73350aa1b6f",
    measurementId: "G-VVT0SXZ84C"
  };

  firebase.initalizeApp(firebaseConfig)

  export default firebase