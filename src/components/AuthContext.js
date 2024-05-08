// // src/contexts/AuthContext.js
// import React, { useContext, useState, useEffect, createContext } from 'react';
// import { auth } from '../firebase'; // Ensure this points to your Firebase configuration

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();
//   const [isCustomer, setIsCustomer] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // Optionally update local state
//         const description = 'no description set';
//         const { displayName, email, photoURL, uid, accessToken } = user;
//         const userData = { displayName, email, photoURL, uid, description };
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('token', accessToken);
//         setCurrentUser(userData);
//       } else {
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         setCurrentUser(null);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   // Function to toggle user type to customer
//   const setCustomer = () => {
//     setIsCustomer(true);
//   };

//   // Function to toggle user type to business
//   const setBusiness = () => {
//     setIsCustomer(false);
//   };
  
//   const setNull = () => {
//     setIsCustomer(null);
//   }

//   const value = {
//     currentUser,
//     isCustomer, // Expose the current user type state
//     setCustomer, // Expose the function to set the user as a customer
//     setBusiness, // Expose the function to set the user as a business
//     setCurrentUser,
//     setNull
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../firebase';
 
const AuthContext = createContext();
 
export function useAuth() {
  return useContext(AuthContext);
}
 
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // Initialize isCustomer from localStorage or default to true if not set
  const [isCustomer, setIsCustomer] = useState(() => {
    const isCust = localStorage.getItem('isCustomer');
    return isCust !== null ? JSON.parse(isCust) : true;
  });
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Optionally update local state
        const description = 'no description set';
        const { displayName, email, photoURL, uid, accessToken } = user;
        const userData = { displayName, email, photoURL, uid, description };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', accessToken);
        setCurrentUser(userData);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    });
 
    return () => unsubscribe();
  }, []);
 
  const setCustomer = () => {
    setIsCustomer(true);
    localStorage.setItem('isCustomer', 'true');
  };
 
  const setBusiness = () => {
    setIsCustomer(false);
    localStorage.setItem('isCustomer', 'false');
  };
 
  const value = {
    currentUser,
    isCustomer,
    setCustomer,
    setBusiness,
    setCurrentUser,
  };
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};