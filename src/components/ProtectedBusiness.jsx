import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path

const Protected = () => {
  const { isCustomer } = useAuth(); // Access isCustomer from AuthContext

  // Logic to check if user should access the route
  const token = localStorage.getItem('token');
  const allowAccess = token && !isCustomer;

  return allowAccess ? <Outlet/> : <Navigate to="/login"/>
};

export default Protected;
