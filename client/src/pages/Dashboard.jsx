import React from 'react'
import {useAuth} from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 text-black pt-24">
      <h1>Dashboard</h1>
      <p>Welcome, {user ? user.firstName : 'Guest'}!</p>
    </div>
  )
}

export default Dashboard
