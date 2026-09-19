import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'

// Core Functional Page Elements Imports
import LandingPage from './pages/LandingPage'
import WhyChoose from './pages/WhyChoose'
import Practice from './pages/Practice'
import FAQs from './pages/ProofAndFAQs'
import Footer from './pages/Footer.jsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pricing from './pages/Pricing' 
import NotFound from './pages/NotFound.jsx'

// Layout Modules Shell Imports
import InterviewLayout from './layouts/Interview.layout.jsx'
import LandingLayout from './layouts/LandingLayout'

// 🛡️ Auth Providers & Security Wrappers Imports
import { AuthProvider } from './context/auth/authContext.jsx'
import { LastLocationProvider } from './context/lastLocation/lastLocationContext.jsx' 
import ProtectedRoute from './components/ProtectedRoutes'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import AIInterview from './pages/AIInterview.jsx'

// 🎯 AI Mock Interview Pipeline Components
import ConfigureInterview from './components/ConfigureInterview.jsx'
import InterviewWaitingArea from './components/InterviewWaitingArea.jsx'
import InterviewTerminal from './components/InterviewTerminal.jsx'
import InterviewReport from './pages/InterviewReport.jsx'
import Overview from './components/Overview.jsx'
import Account from './components/Account.jsx'
import Setting from './components/Setting.jsx'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Ats from './pages/Ats.jsx'

// 🧭 Auto Scroll-To-Top on Route Navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Master Composition Section for the Root Scroll Page
const HomeRootScroll = () => {
  return (
    <div className="w-full bg-black min-h-screen text-white flex flex-col justify-start">
      <LandingPage />
      <WhyChoose />
      <Practice />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <LastLocationProvider>
        {/* 1. Route change hote hi page top:0 scroll hoga */}
        <ScrollToTop />

        {/* 2. Fixed Navbar */}
        <Navbar />

        {/* 3. Global Container with pt-20 (80px padding) to clear fixed navbar */}
        <main className="w-full min-h-screen  bg-black text-white flex flex-col">
          <Routes>
            {/* Landing / Public pages */}
            <Route path="/" element={<HomeRootScroll />} />
            <Route path="/about" element={<div className="p-8 max-w-5xl mx-auto"><><About /></></div>} />

            {/* Pricing & Services */}
            <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
            <Route path="/services/ats" element={<ProtectedRoute><Ats /></ProtectedRoute>} />
            <Route path="/services/interview" element={<ProtectedRoute><AIInterview /></ProtectedRoute>} />

            {/* Dedicated Interview Report */}
            <Route path="/interview/report/:id" element={<ProtectedRoute><InterviewReport /></ProtectedRoute>} />

            {/* Interview Pipeline */}
            <Route path="/interview/configure" element={<ProtectedRoute><ConfigureInterview /></ProtectedRoute>} />
            <Route path="/interview/waiting/:id" element={<ProtectedRoute><InterviewWaitingArea /></ProtectedRoute>} />
            <Route path="/interview/terminal/:id" element={<ProtectedRoute><InterviewTerminal /></ProtectedRoute>} />

            {/* Auth */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
              <Route index element={<Overview />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Setting />} />
              <Route path="user-data-info" element={<Account />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </LastLocationProvider>
    </AuthProvider>
  );
}

export default App;