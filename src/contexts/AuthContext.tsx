import React, { useState, useEffect } from 'react';
import type { AuthContextType, LoginCredentials, RegisterData, User } from '../types/auth';
import { MOCK_USERS } from '../constants/mockUsers';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          u => u.email === credentials.email && u.password === credentials.password
        );


        if (user) {

          const { password: _, ...userWithoutPassword } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
          const token = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
          
          setAuthState({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });
          resolve();
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          reject(new Error('Email ou mot de passe incorrect'));
        }
      }, 1500);
    });
  };

  const register = async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (data.password !== data.confirmPassword) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          reject(new Error('Les mots de passe ne correspondent pas'));
          return;
        }

        const existingUser = MOCK_USERS.find(u => u.email === data.email);
        if (existingUser) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          reject(new Error('Un utilisateur avec cet email existe déjà'));
          return;
        }

        // Créer un nouvel utilisateur
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: 'user',
        };

        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(newUser));
        
        setAuthState({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = async (updates: Partial<User>) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (authState.user) {
          const updatedUser = { ...authState.user, ...updates };
          localStorage.setItem('user_data', JSON.stringify(updatedUser));
          setAuthState(prev => ({ ...prev, user: updatedUser }));
        }
        resolve();
      }, 1000);
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};