import { signOutUserSuccess } from '../redux/user/userSlice';

/**
 * Handles 401 Unauthorized errors across the frontend app.
 * Automatically logs out expired 30-day sessions and redirects to /signup.
 */
export const handleAuthError = (resStatus, dispatch, navigate) => {
  if (resStatus === 401) {
    // 1. Reset Redux user state
    dispatch(signOutUserSuccess());
    
    // 2. Redirect expired session immediately to Sign Up
    navigate('/sign-up', { replace: true });
  }
};