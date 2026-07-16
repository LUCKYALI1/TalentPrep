import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 


const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. Loading active matrix
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-green-400 font-mono text-xs tracking-widest">
        ⚡ VERIFYING SESSION PARAMETERS...
      </div>
    );
  }

  // 2. Redirect: Agar user pehle se logged in hai, toh use /dashboard par redirect kar do
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;