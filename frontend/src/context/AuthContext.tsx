import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { authAPI, userAPI } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper function to safely access localStorage
  const safeLocalStorage = {
    getItem: (key: string): string | null => {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
      }
    },
    setItem: (key: string, value: string): void => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    },
    removeItem: (key: string): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  };

  useEffect(() => {
    const token = safeLocalStorage.getItem('token');
    if (token) {
      // Set the token in the API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data
      userAPI.getProfile()
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // If token is invalid, clear everything
          safeLocalStorage.removeItem('token');
          safeLocalStorage.removeItem('refresh_token');
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password);
      const { access, refresh } = response.data;
      
      safeLocalStorage.setItem('token', access);
      safeLocalStorage.setItem('refresh_token', refresh);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      const userResponse = await userAPI.getProfile();
      setUser(userResponse.data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authAPI.register(data);
      const { access, refresh } = response.data;
      
      safeLocalStorage.setItem('token', access);
      safeLocalStorage.setItem('refresh_token', refresh);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      const userResponse = await userAPI.getProfile();
      setUser(userResponse.data);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    safeLocalStorage.removeItem('token');
    safeLocalStorage.removeItem('refresh_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 