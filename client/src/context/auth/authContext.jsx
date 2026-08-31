import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/api'; 

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      // Loop Fix: Agar token/user hai hi nahi, toh backend request hit mat karo
      if (!token && !savedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/verify'); 
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        console.error("Session verification failed:", error);
        // Clean up invalid session
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = (userData, token) => {
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error("Logout handshake failed:", err);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);