import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('username');

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;