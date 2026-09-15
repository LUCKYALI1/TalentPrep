import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../pages/Footer';

export default function InterviewLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      
      {/* Offsets fixed/sticky navbar height and grows to push footer down */}
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}