import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            setUser(res.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const deductCredit = () => {
        if (user) {
            setUser((prev) => ({
                ...prev,
                credits: Math.max(0, (prev?.credits || 0) - 1)
            }));
        }
    };

    const addCredits = (amount) => {
        if (user) {
            setUser((prev) => ({
                ...prev,
                credits: (prev?.credits || 0) + amount
            }));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
            loading, 
            fetchUserData, 
            deductCredit, 
            addCredits,
            logout 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);