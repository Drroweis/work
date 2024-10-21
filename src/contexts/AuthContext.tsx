import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, logout, isAuthenticated, register, resetPassword } from '../api/luckyWheelApi';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: Checking initial authentication');
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogin = async (username: string, password: string) => {
    console.log('AuthProvider: Attempting login');
    try {
      await login(username, password);
      console.log('AuthProvider: Login successful');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('AuthProvider: Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    console.log('AuthProvider: Logging out');
    logout();
    setIsLoggedIn(false);
  };

  const handleRegister = async (username: string, password: string) => {
    console.log('AuthProvider: Attempting registration');
    try {
      await register(username, password);
      console.log('AuthProvider: Registration successful');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('AuthProvider: Registration failed:', error);
      throw error;
    }
  };

  const handleResetPassword = async (email: string) => {
    console.log('AuthProvider: Attempting password reset');
    try {
      await resetPassword(email);
      console.log('AuthProvider: Password reset request sent');
    } catch (error) {
      console.error('AuthProvider: Password reset failed:', error);
      throw error;
    }
  };

  console.log('AuthProvider: Current isLoggedIn state:', isLoggedIn);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        resetPassword: handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};