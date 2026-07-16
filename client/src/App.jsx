import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Core Functional Page Elements Imports
import LandingPage from './pages/LandingPage'
import WhyChoose from './pages/WhyChoose'
import Practice from './pages/Practice'
import FAQs from './pages/ProofAndFAQs'
import Footer from './pages/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Layout Modules Shell Imports
import LandingLayout from './layouts/LandingLayout'
import ServicesLayout from './layouts/ServicesLayout'
import Navbar from './components/Navbar'

// 🛡️ Auth Providers & Security Wrappers Imports
import { AuthProvider } from './context/auth/authContext.jsx'
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard.jsx'

// Master Composition Section for the Sequential Root Page
const HomeRootScroll = () => {
  return (
    <div className="w-full bg-black min-h-screen text-white flex flex-col justify-start">
      <LandingPage />
      <WhyChoose />
      <Practice />
      <FAQs />
      <Footer />
    </div>
  )
}

function App() {
  return (
    // ⚡ Pure routing matrix ko global authentication context block me wrap kiya hai
    <AuthProvider>
      <Navbar />
    
      <Routes>
        {/* 1. MAIN ROOT DECK */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<HomeRootScroll />} />
        </Route>

        {/* 2. SERVICES NESTED SUB-TREE CONSOLE (🛡️ PARENT LEVEL PROTECTED NOW) */}
        {/* Humne poore ServicesLayout ko ProtectedRoute se wrap kar diya, isse leak band ho gaya! */}
        <Route 
          path="/services" 
          element={
            <ProtectedRoute>
              <ServicesLayout />
            </ProtectedRoute>
          }
        >
          {/* Sub-routes ab automatic protected hain kyunki parent layout locked hai */}
          <Route path="ats" element={<div className="p-8 text-white pt-24"><h1>ATS Scoring Engine</h1></div>} />
          <Route path="interview" element={<div className="p-8 text-white pt-24"><h1>AI Dynamic Interview Sim</h1></div>} />
        </Route>

        {/* 3. INDEPENDENT CONSOLE PIPELINES (PUBLIC) */}
        <Route path="/coding-questions" element={<div className="p-8 text-white pt-24"><h1>Coding Questions Panel</h1></div>} />
        <Route path="/about" element={<div className="p-8 text-white pt-24"><h1>About Platform</h1></div>} />

        {/* 🔑 Public-Only Routes (Redirect if already authenticated) */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />

        {/* 🔒 Protected User Profile Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* 🔒 Protected Additional Profile Route */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <div className="p-8 text-white pt-24"><h1>My Profile Settings</h1></div>
            </ProtectedRoute>
          } 
        />

        {/* 4. ERROR TELEMETRY FALLBACK */}
        <Route path="*" element={<div className="p-8 text-red-400 font-mono pt-24"><h1>404 Pipeline Not Found</h1></div>} />

      </Routes>
    </AuthProvider>
  )
}

export default App