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
import Pricing from './pages/Pricing' 

// Layout Modules Shell Imports
import LandingLayout from './layouts/LandingLayout'
import Navbar from './components/Navbar'

// 🛡️ Auth Providers & Security Wrappers Imports
import { AuthProvider } from './context/auth/authContext.jsx'
import { LastLocationProvider } from './context/lastLocation/lastLocationContext.jsx' 
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard.jsx'
import UserDash from './components/Overview.jsx' 
import Profile from './components/Profile.jsx'
import AIInterview from './pages/AIInterview.jsx'

// 🎯 AI Mock Interview Pipeline Components
import ConfigureInterview from './components/ConfigureInterview.jsx'
import InterviewWaitingArea from './components/InterviewWaitingArea.jsx'
import InterviewTerminal from './components/InterviewTerminal.jsx'
import Overview from './components/Overview.jsx'
import Account from './components/Account.jsx'
import Setting from './components/Setting.jsx'

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

          {/* 💳 PRICING & CREDIT TOP-UP ROUTE */}
          <Route 
            path="/pricing" 
            element={
              <ProtectedRoute>
                <Pricing />
              </ProtectedRoute>
            } 
          />

          {/* 2. SERVICES INDEPENDENT ROUTING */}
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
                <AIInterview />
              </ProtectedRoute>
            } 
          />

          {/* 🤖 AI INTERVIEW STEP-BY-STEP PIPELINE */}
          <Route 
            path="/interview/configure" 
            element={
              <ProtectedRoute>
                <ConfigureInterview />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/interview/waiting/:id" 
            element={
              <ProtectedRoute>
                <InterviewWaitingArea />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/interview/terminal/:id" 
            element={
              <ProtectedRoute>
                <InterviewTerminal />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/services/interview/terminal/:id" 
            element={
              <ProtectedRoute>
                <InterviewTerminal />
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
            <Route index element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Setting />} />
            <Route path="user-data-info" element={<Account/>} />
          </Route>

          {/* 4. ERROR TELEMETRY FALLBACK */}
          <Route path="*" element={<div className="p-8 text-red-400 font-mono pt-24"><h1>404 Pipeline Not Found</h1></div>} />

        </Routes>
      </LastLocationProvider>
    </AuthProvider>
  )
}

export default App;