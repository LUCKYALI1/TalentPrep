import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Flicker Prevention Loading Screen
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-green-400 font-mono text-xs tracking-widest">
        ⚡ SECURITY HANDSHAKE IN PROGRESS...
      </div>
    );
  }

  // 2. Auth Check: Logged-in nahi hai toh login screen par bypass karo
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Success state
  return children;
};

export default ProtectedRoute;