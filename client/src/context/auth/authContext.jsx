import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/api'; 

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        // Backend verification route ko check karo
        const response = await api.get('/auth/verify'); 
        setUser(response.data.user); // Database user details inject karo
      } catch (error) {
        console.error("Session verification failed:", error);
        setUser(null);
        // production tip: standard refresh token mechanism yahan call ho sakta hai
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = (userData) => setUser(userData);
  
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error("Logout handshake failed:", err);
    } finally {
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