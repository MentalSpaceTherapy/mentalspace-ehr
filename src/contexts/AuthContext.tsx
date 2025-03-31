import React, { createContext, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login as loginAction, logout as logoutAction } from '../store/slices/authSlice';

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  login: async () => false,
  logout: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  // Login function
  const login = async (email: string, password: string) => {
    return dispatch(loginAction(email, password)) as unknown as Promise<boolean>;
  };

  // Logout function
  const logout = () => {
    dispatch(logoutAction());
  };

  // Value object to pass through context
  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext); 