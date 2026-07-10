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
    <>
    <Navbar />
  
    <Routes>
      {/* 1. MAIN ROOT DECK: Renders the entire sequential landing platform */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomeRootScroll />} />
      </Route>

      {/* 2. SERVICES NESTED SUB-TREE CONSOLE */}
      <Route path="/services" element={<ServicesLayout />}>
        {/* Relative layout sub-links mapped automatically */}
        <Route path="ats" element={<div className="p-8 text-white"><h1>ATS Scoring Engine</h1></div>} />
        <Route path="interview" element={<div className="p-8 text-white"><h1>AI Dynamic Interview Sim</h1></div>} />
      </Route>

      {/* 3. INDEPENDENT CONSOLE PIPELINES */}
      <Route path="/coding-questions" element={<div className="p-8 text-white"><h1>Coding Questions Panel</h1></div>} />
      <Route path="/about" element={<div className="p-8 text-white"><h1>About Platform</h1></div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<div className="p-8 text-white"><h1>User Profile Dashboard</h1></div>} />

      {/* 4. ERROR TELEMETRY FALLBACK */}
      <Route path="*" element={<div className="p-8 text-red-400 font-mono"><h1>404 Pipeline Not Found</h1></div>} />

    </Routes>
      </>
  )
}

export default App