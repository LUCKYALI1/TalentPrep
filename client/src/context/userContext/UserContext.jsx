// src/context/userContext/UserContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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

  // Synchronized state updater
  const updateUser = useCallback((updatedData) => {
    setUser((prevUser) => {
      if (!prevUser && !updatedData) return null;
      const newUserData = typeof updatedData === 'function' 
        ? updatedData(prevUser) 
        : { ...prevUser, ...updatedData };

      localStorage.setItem('user', JSON.stringify(newUserData));
      return newUserData;
    });
  }, []);

  // Fetch fresh user profile & credits from backend
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

  // -------------------------------------------------------------
  // ⚡ DEDICATED CREDIT ACTIONS & TELEMETRY
  // -------------------------------------------------------------
  const credits = useMemo(() => Number(user?.credits ?? 0), [user?.credits]);
  const hasCredits = useMemo(() => credits > 0, [credits]);

  /**
   * Deducts credits locally and saves to localStorage.
   * Can accept an explicit newBalance returned from the backend,
   * or decrement by amount (default: 1).
   */
  const deductCredit = useCallback((amount = 1, newBalance = null) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      
      const updatedCredits = newBalance !== null 
        ? Number(newBalance) 
        : Math.max(0, (Number(prevUser.credits) || 0) - amount);

      const updatedUser = {
        ...prevUser,
        credits: updatedCredits
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  /**
   * Adds credits upon successful payment
   */
  const addCredits = useCallback((amount = 0, newBalance = null) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedCredits = newBalance !== null
        ? Number(newBalance)
        : (Number(prevUser.credits) || 0) + Number(amount);

      const updatedUser = {
        ...prevUser,
        credits: updatedCredits
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const contextValue = {
    // User Core
    user,
    setUser,
    updateUser,
    fetchUserData,
    loading,
    // Credit System
    credits,
    hasCredits,
    deductCredit,
    addCredits
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for accessing User & Credits
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Standalone hook for accessing Credit methods directly
export const useCredits = () => {
  const { credits, hasCredits, deductCredit, addCredits, fetchUserData } = useUser();
  return {
    credits,
    hasCredits,
    deductCredit,
    addCredits,
    refreshCredits: fetchUserData
  };
};

// useAuth Alias for backward compatibility
export const useAuth = useUser;