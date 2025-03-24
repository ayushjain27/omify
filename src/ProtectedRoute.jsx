import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  let phoneNumber = localStorage.getItem('omifyUserPhoneNumber');
  console.log('D?elkmk');

  console.log(isAuthenticated, 'ProtectedRoute');

  // If still loading, render a spinner or loading state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading spinner
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

    return children;
  // If authenticated, render the protected content (children)
  
}
