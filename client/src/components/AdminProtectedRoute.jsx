import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}