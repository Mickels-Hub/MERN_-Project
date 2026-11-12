import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // If guest tries to access protected routes, send straight to signup
  if (!currentUser) {
    return <Navigate to="/sign-up" replace />;
  }

  // Logged-in users are allowed to proceed
  return <Outlet />;
}