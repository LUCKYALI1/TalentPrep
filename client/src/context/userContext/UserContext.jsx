import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  });
  
  const [loading, setLoading] = useState(true);

  const updateUser = useCallback((updatedData) => {
    setUser((prevUser) => {
      const newUserData = typeof updatedData === 'function' 
        ? updatedData(prevUser) 
        : { ...prevUser, ...updatedData };
      
      localStorage.setItem('user', JSON.stringify(newUserData));
      return newUserData;
    });
  }, []);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const response = await api.get('/auth/verify');
      const verifiedUser = response.data?.user || response.data;
      
      setUser(verifiedUser);
      localStorage.setItem('user', JSON.stringify(verifiedUser));
      return verifiedUser;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, fetchUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// useAuth Alias so Profile and Dashboard components don't throw import errors
export const useAuth = useUser;