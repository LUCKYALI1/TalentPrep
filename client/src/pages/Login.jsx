import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import imgLogin from '../assets/hero.jpg'
import api from '../utils/api'
import { useAuth } from '../context/auth/authContext' // 🛡️ Import useAuth Hook

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ⚡ Global auth context controller extract kiya

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Response structures parsing
      const token = response.data?.token;
      const user = response.data?.user || response.data;

      setSuccessMessage(response.data?.message || "Login successful! Synchronizing core session...");

      // ⚡ GLOBAL STATE INITIALIZATION:
      // Yeh context ke throw user details state save karega aur local storage sync manage karega
      login(user, token);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Handshake failed. Invalid passkey credentials.');
    } finally {
      setIsLoading(false);
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
    <section id="login" className="relative w-full min-h-screen bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
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
      <div className="relative z-10 w-full max-w-4xl bg-[#09090b]/90 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        
        {/* LEFT COLUMN: VISUAL DASHBOARD GRID PANEL */}
        <div className="hidden md:flex md:col-span-5 bg-zinc-950 border-r border-zinc-900/80 flex-col justify-between p-6 relative overflow-hidden group">
          <img src={imgLogin} alt="Login Background" className="absolute inset-0 z-0 object-cover opacity-15 pointer-events-none w-full h-full" />
          
          <div className="relative z-10">
            <div className="text-sm font-black text-white tracking-tight">
              Talent<span className="text-cyan-400">Prep</span>
            </div>
          </div>

          <div className="relative z-10 space-y-4 my-auto">
            <motion.div 
              animate={floatAnimation(0)}
              className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl text-left space-y-2 relative"
            >
              <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-600">[SYS_FEED]</div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                "Real-time evaluation engines initialized. Spoken runtime parameters calibrated."
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-500">
                <span className="text-cyan-400 animate-pulse">●</span> Pipeline Active
              </div>
            </motion.div>

            <motion.div 
              animate={floatAnimation(1.5, [4, -4])} 
              className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-xl p-3 shadow-md text-left flex justify-between items-center"
            >
              <div className="space-y-0.5">
                <p className="text-[9px] font-mono text-zinc-500 uppercase">Match Target</p>
                <p className="text-xs font-bold text-zinc-200">System Clear</p>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded font-bold">
                92%
              </span>
            </motion.div>
          </div>

          <div className="relative z-10 text-[9px] font-mono text-zinc-600 tracking-wider">
            [IDENT_MODULE // LOG_IN]
          </div>
        </div>

        {/* RIGHT COLUMN: CORE LOGIN FORM */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center text-left bg-black/20">
          
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 border border-cyan-950 bg-cyan-950/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Authentication Shield
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Welcome Back Candidate
            </h2>
            <p className="text-zinc-500 text-xs leading-normal font-normal">
              Enter your routing credentials below to sync back into your dynamic mock assessment tracks.
            </p>
          </div>

          {/* ⚡ FEEDBACK MESSAGE DISPLAY CONTAINER */}
          {(errorMessage || successMessage) && (
            <div className="mb-5 text-xs font-mono">
              {errorMessage && (
                <div className="border border-red-950 bg-red-950/20 text-red-400 px-4 py-3 rounded-xl">
                  ⚠️ [EXC_ERR]: {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="border border-emerald-950 bg-emerald-950/20 text-emerald-400 px-4 py-3 rounded-xl animate-pulse">
                  🚀 [SUCCESS]: {successMessage}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                disabled={isLoading}
                placeholder="ali@talentprep.ai" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Passkey Token
                </label>
                <Link to="/forgot-password" className="text-[10px] font-mono text-zinc-500 hover:text-cyan-400 transition-colors">
                  Forgot Token?
                </Link>
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                placeholder="••••••••••••" 
                className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/80 transition-colors duration-200 disabled:opacity-50" 
              />
            </div>

            <div className="pt-2">
              <motion.button 
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white font-bold text-xs rounded-xl font-mono py-3.5 tracking-wider uppercase shadow-lg shadow-cyan-500/10 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Establish Session Key ⚡"
                )}
              </motion.button>
            </div>
          </form>

          <p className="text-zinc-500 text-xs font-normal mt-8 text-center sm:text-left">
            Not tracking outcomes yet?{" "}
            <Link to="/signup" className="text-cyan-400 font-bold hover:underline transition-all">
              Create a new instance
            </Link>
          </p>

        </div>
      </div>
    </section>
  )
}

export default Login