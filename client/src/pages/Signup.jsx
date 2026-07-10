import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import imgSignup from '../assets/hero.jpg' // Reusing your layout asset
import api from '../utils/api'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("New node instance registration requested:", formData);
    try {
      const response = await api.post('auth/register', formData);
      console.log("Registration successful:", response.data);
    }
    catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };

  const floatAnimation = (delay = 0, yRange = [-4, 4]) => ({
    y: yRange,
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <section id="signup" className="relative pt-30 w-full min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
      {/* BACKGROUND MATRIX GRID */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px"
        }}
      />

      {/* AMBIENT GLOW */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[400px] bg-indigo-600/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* CORE WORKSPACE PANEL */}
      <div className="relative z-10 w-full max-w-4xl bg-[#09090b]/90 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        
        {/* LEFT COLUMN: VISUAL DASHBOARD GRID PANEL */}
        <div className="hidden md:flex md:col-span-5 bg-zinc-950 border-r border-zinc-900/80 flex-col justify-between p-6 relative overflow-hidden group">
          
          <img src={imgSignup} alt="Signup Background" className="absolute inset-0 z-0 object-cover opacity-15 pointer-events-none w-full h-full " />
          
          <div className="relative z-10">
            <div className="text-sm font-black text-white tracking-tight">
              Talent<span className="text-cyan-400">Prep</span>
            </div>
          </div>

          {/* Interactive Floating Simulation Components */}
          <div className="relative z-10 space-y-4 my-auto">
            <motion.div 
              animate={floatAnimation(0)}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl text-left space-y-2 relative"
            >
              <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-600">[SYS_REG]</div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "Deploying target client telemetry blocks. Generating standalone sandboxed assessment nodes."
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-500">
                <span className="text-cyan-400 animate-pulse">●</span> Node Generation Ready
              </div>
            </motion.div>

            <motion.div 
              animate={floatAnimation(2, [4, -4])}
              className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-xl p-3 shadow-md text-left flex justify-between items-center"
            >
              <div className="space-y-0.5">
                <p className="text-[9px] font-mono text-zinc-500 uppercase">System Integrity</p>
                <p className="text-xs font-bold text-zinc-200">Encryption Active</p>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 px-2 py-0.5 rounded font-bold">
                AES_256
              </span>
            </motion.div>
          </div>

          <div className="relative z-10 text-[9px] font-mono text-zinc-600 tracking-wider">
            [IDENT_MODULE // NEW_INSTANCE]
          </div>
        </div>

        {/* RIGHT COLUMN: CORE SIGNUP INTERFACE FORM */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center text-left bg-black/20">
          
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 border border-cyan-950 bg-cyan-950/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Registration Pipeline
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Initialize Candidate Profile
            </h2>
            <p className="text-zinc-500 text-xs leading-normal font-normal">
              Register your workspace identity key parameters to generate your predictive engine track.
            </p>
          </div>

          <form onSubmit={handleSignupSubmit} method='post' className="space-y-4">
            
            {/* FIRST NAME & LAST NAME ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  First Designation
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Alan" 
                  className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  Last Designation
                </label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Turing" 
                  className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200" 
                />
              </div>
            </div>

            {/* USERNAME FIELD */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Workspace Handle (Username)
              </label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="turing_machine" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200" 
              />
            </div>

            {/* EMAIL FIELD */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Mail Routing Address
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="alan@talentprep.ai" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200" 
              />
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                Secure Passkey Cipher
              </label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••••••" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200" 
              />
            </div>

            {/* REGISTER ACTION */}
            <div className="pt-2">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:opacity-95 text-white font-bold text-xs rounded-xl font-mono py-3.5 tracking-wider uppercase shadow-lg shadow-cyan-500/10 transition-opacity cursor-pointer"
              >
                Compile Instance Archetype ⚡
              </motion.button>
            </div>
          </form>

          {/* SIGN IN ROUTE */}
          <p className="text-zinc-500 text-xs font-normal mt-6 text-center sm:text-left">
            Already mapping evaluations?{" "}
            <Link to="/login" className="text-cyan-400 font-bold hover:underline transition-all">
              Sync into active key
            </Link>
          </p>

        </div>

      </div>

    </section>
  )
}

export default Signup