import { isEmpty } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserDataByUserNameApi } from '../store/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
// AuthProvider Component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // default false for unauthenticated
  const [checkUserProfile, setCheckUserProfile] = useState(false); // default false for unauthenticated
  const [loading, setLoading] = useState(true); // Add loading state

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let token = await localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
      let response = await dispatch(getUserDataByUserNameApi({ token: token }));
      response = unwrapResult(response);
      if (response?.role === 'USER') {
        if (response?.name) {
          setLoading(false);
          setIsAuthenticated(true);
          setCheckUserProfile(false);
        } else {
          setLoading(false);
          setCheckUserProfile(true);
        }
      }
      setLoading(false);
      setIsAuthenticated(true);
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, checkUserProfile, setCheckUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing Auth Context
export function useAuth() {
  return useContext(AuthContext);
}
