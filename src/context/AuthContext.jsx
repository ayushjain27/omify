import { isEmpty } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
// AuthProvider Component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // default false for unauthenticated
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      let phoneNumber = await localStorage.getItem('omifyUserPhoneNumber');
      if (!isEmpty(phoneNumber)) {
        console.log(phoneNumber);
        setIsAuthenticated(true);
      }
      setLoading(false); // Set loading to false after checking
    };
    fetchData();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>{children}</AuthContext.Provider>;
}

// Custom hook for accessing Auth Context
export function useAuth() {
  return useContext(AuthContext);
}
