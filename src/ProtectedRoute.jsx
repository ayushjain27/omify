import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, checkUserProfile } = useAuth();

  if (checkUserProfile) {
    return <Navigate to="/userLoginProfile" />;
  }

  // If still loading, render a spinner or loading state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/mainDashboardSection" />;
  }

  return children;
  // If authenticated, render the protected content (children)
}
