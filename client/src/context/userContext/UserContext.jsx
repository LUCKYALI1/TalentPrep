import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '../../utils/api'; 

export const AuthContext = createContext(null);
export const UserContext = AuthContext; // Alias for seamless compatibility

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse cached user:", error);
      return null;
    }
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      // Token ya saved user na hone par skip backend call
      if (!token && !savedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('auth/verify'); 
        const verifiedUser = response.data?.user || response.data;
        
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
      } catch (error) {
        console.error("Session verification failed:", error);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = useCallback((userData, token) => {
    if (token) localStorage.setItem('token', token);
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);
  
  const logout = useCallback(async () => {
    try {
      await api.post('auth/logout');
    } catch (err) {
      console.error("Logout handshake failed:", err);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    login,
    logout
  }), [user, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserProvider = AuthProvider; // Alias for seamless compatibility

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};