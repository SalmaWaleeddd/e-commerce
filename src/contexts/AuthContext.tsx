// context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthContextType, SignupFormData, LoginFormData } from '@/types';
import { AuthService } from '@/services/authService';
import { AuthStorage } from '@/utils/auth.storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading true
    error: null,
    
    signup: async () => {},
    login: async () => {},
    logout: () => {},
    clearError: () => {},
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = AuthStorage.getUser();
        const isAuthenticated = AuthStorage.getAuthStatus();
        
        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: isAuthenticated && !!user,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to initialize authentication',
        }));
      }
    };

    initializeAuth();
  }, []);

  const signup = async (formData: SignupFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { token, user } = await AuthService.signup(formData);
      
      if (token) {
        AuthStorage.setToken(token);
      }
      
      AuthStorage.setUser(user);
      AuthStorage.setAuthStatus(true);
      
      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      }));
      throw error; // Re-throw for form handling
    }
  };

  const login = async (formData: LoginFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { token, user } = await AuthService.login(formData);
      
      if (token) {
        AuthStorage.setToken(token);
      }
      
      AuthStorage.setUser(user);
      AuthStorage.setAuthStatus(true);
      
      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await AuthService.logout();
      
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Logout failed',
      }));
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    signup,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};