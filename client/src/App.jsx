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
import Navbar from './components/Navbar'

// 🛡️ Auth Providers & Security Wrappers Imports
import { AuthProvider } from './context/auth/authContext.jsx'
import { LastLocationProvider } from './context/lastLocation/lastLocationContext.jsx' 
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard.jsx'
import UserDash from './components/UserDash' 
import Profile from './components/Profile.jsx'
import AIInterview from './pages/AIInterview.jsx'
import InterviewTerminal from './components/InterviewTerminal.jsx'

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
    <AuthProvider>
      <LastLocationProvider>
        <Navbar />
      
        <Routes>
          {/* 1. MAIN ROOT DECK */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<HomeRootScroll />} />
          </Route>

          {/* 2. SERVICES INDEPENDENT ROUTING (CLEAN REDIRECTION ⚡) */}
          {/* ServicesLayout hata diya hai, ab endpoints direct ProtectedRoute engine se filter hokar render honge */}
          <Route 
            path="/services/ats" 
            element={
              <ProtectedRoute>
                <div className="p-8 text-white pt-24"><h1>ATS Scoring Engine</h1></div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/services/interview" 
            element={
              <ProtectedRoute>
                <div className=""><AIInterview /></div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/services/interview/terminal" 
            element={
              <ProtectedRoute>
                <InterviewTerminal />
              </ProtectedRoute>
            } 
          />

          {/* 3. INDEPENDENT CONSOLE PIPELINES (PUBLIC) */}
          <Route path="/coding-questions" element={<div className="p-8 text-white pt-24"><h1>Coding Questions Panel</h1></div>} />
          <Route path="/about" element={<div className="p-8 text-white pt-24"><h1>About Platform</h1></div>} />

          {/* 🔑 Public-Only Routes */}
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

          {/* 🔒 PROTECTED NESTED DASHBOARD TREE */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          >
            <Route index element={<UserDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<div className="p-8 text-white pt-24"><h1>Control & App Settings</h1></div>} />
          </Route>

          {/* 4. ERROR TELEMETRY FALLBACK */}
          <Route path="*" element={<div className="p-8 text-red-400 font-mono pt-24"><h1>404 Pipeline Not Found</h1></div>} />

        </Routes>
      </LastLocationProvider>
    </AuthProvider>
  )
}

export default App;