import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (currentUser.isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Outlet />;
}