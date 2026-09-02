import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import imgLogin from '../assets/hero.jpg';
import api from '../utils/api';
import { useAuth } from '../context/auth/authContext';

const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.016 10.016 0 013.122-.363c4.478 0 8.268 2.943 9.542 7a9.97 9.97 0 01-2.49 3.82c-.085.093-.17.185-.258.275M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fromPath = useMemo(() => location.state?.from || '/', [location.state?.from]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched'
  });

  const handleLoginSubmit = useCallback(async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('auth/login', {
        email: data.email,
        password: data.password
      });

      const token = response.data?.token;
      const user = response.data?.user || response.data;

      setSuccessMessage(response.data?.message || "Login successful! Redirecting...");
      login(user, token);

      setTimeout(() => {
        navigate(fromPath, { replace: true });
      }, 1000);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate, fromPath]);

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await api.post('auth/google', {
        credential: credentialResponse.credential
      });
       
      const token = response.data?.token;
      const user = response.data?.user || response.data;

      setSuccessMessage(response.data?.message || "Google Authentication successful!");
      login(user, token);

      setTimeout(() => {
        navigate(fromPath, { replace: true });
      }, 1000);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Google Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate, fromPath]);

  const handleGoogleError = useCallback(() => {
    setErrorMessage('Google Sign-In was cancelled or failed.');
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl bg-zinc-900/80 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 md:grid-cols-12 min-h-[540px]"
      >
        <div className="hidden md:flex md:col-span-5 bg-zinc-950/60 border-r border-zinc-800/60 flex-col justify-between p-8 relative overflow-hidden">
          <img 
            src={imgLogin} 
            alt="TalentPrep Visual" 
            className="absolute inset-0 object-cover opacity-20 w-full h-full pointer-events-none select-none" 
          />
          <div className="relative z-10">
            <Link to="/" className="text-lg font-bold text-white tracking-tight flex items-center">
              Talent<span className="text-cyan-400">Prep</span>
            </Link>
          </div>

          <div className="relative z-10 space-y-3 my-auto">
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full">
                  AI Assessment
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                "Simulate real-world technical interviews with live feedback and instant scorecards."
              </p>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-zinc-500 font-medium">
            © TalentPrep AI. All rights reserved.
          </div>
        </div>

        <div className="md:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-zinc-900/30">
          <div className="space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-zinc-400 text-xs">
              Sign in to continue your interview preparation tracks.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 text-xs bg-red-950/40 border border-red-800/50 text-red-300 px-3.5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <span>⚠️</span> {errorMessage}
              </motion.div>
            )}
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 text-xs bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 px-3.5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <span>🚀</span> {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full flex justify-center mb-5">
            <div className="w-auto flex justify-center overflow-hidden rounded-xl border bg-white border-zinc-800 hover:border-zinc-700 transition-colors">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                shape="rectangular"
                text="continue_with"
                width="400"
              />
            </div>
          </div>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <span className="relative bg-zinc-900 px-3 text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
              or email
            </span>
          </div>

          <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 block">
                Email address
              </label>
              <input 
                type="email" 
                disabled={isLoading}
                placeholder="Your email address" 
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50" 
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 pt-0.5">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-zinc-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  disabled={isLoading}
                  placeholder="••••••••••••" 
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-400 pt-0.5">{errors.password.message}</p>
              )}
            </div>

            <div className="pt-2">
              <motion.button 
                whileHover={{ scale: isLoading ? 1 : 1.005 }}
                whileTap={{ scale: isLoading ? 1 : 0.995 }}
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl py-3 transition-all shadow-md shadow-cyan-950/50 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </div>
          </form>

          <p className="text-zinc-400 text-xs mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(Login);