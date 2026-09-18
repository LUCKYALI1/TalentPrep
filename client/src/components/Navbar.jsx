import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/auth/authContext';
import { useUser } from '../context/userContext/UserContext.jsx';

const navItems = [
  { label: 'Home', path: '/' },
  { 
    label: 'Services', 
    path: '/services',
    dropdown: [
      { label: 'ATS Resume Checker', path: '/services/ats', desc: 'Optimize your CV for automated screening' },
      { label: 'AI Interview Practice', path: '/services/interview', desc: 'Mock interviews with instant AI feedback' }
    ]
  },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
];

const linkVariants = {
  initial: { y: 0, color: 'rgba(241, 245, 249, 0.75)' },
  hover: { y: -1, color: '#06B6D4' }
};

const lineVariants = {
  initial: { width: '0%' },
  hover: { width: '100%' }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 25 }
  },
  exit: { opacity: 0, y: 6, scale: 0.96, transition: { duration: 0.15 } }
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, loading, user: authUser } = useAuth(); 
  
  let customUser = null;
  let setCustomUser = null;
  try {
    const userCtx = useUser();
    customUser = userCtx?.user;
    setCustomUser = userCtx?.setUser;
  } catch (err) {
    // Graceful fallback if UserContext is not present
  }

  // 🛡️ Strict Auth Check: Token aur active auth session hone par hi user valid hoga
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(token && authUser);
  const user = isAuthenticated ? (customUser || authUser) : null;

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideInteraction(event) {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setShowDropdown(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      if (setCustomUser) setCustomUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsOpen(false);
      setShowDropdown(false);
      navigate('/login');
    }
  };

  const displayName = user?.firstName
    ? `${user.firstName}${user?.lastName ? ` ${user.lastName}` : ''}`
    : (user?.username || user?.email?.split('@')[0] || 'Developer');

  const userInitial = user?.firstName?.[0]?.toUpperCase() || 
                      user?.username?.[0]?.toUpperCase() || 
                      user?.email?.[0]?.toUpperCase() || 
                      'U';

  const avatarSrc = user?.avatar?.url || user?.avatar || '';
  const userCredits = user?.credits ?? 0;

  return (
    <>
      <nav 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl bg-black/80 backdrop-blur-xl rounded-2xl px-5 py-3 md:px-8 z-50 border border-zinc-800/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-black tracking-tight text-white select-none group focus:outline-none"
          >
            <span>Talent<span className="text-cyan-400">Prep</span></span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center"> 
            <ul className="flex items-center gap-8"> 
              {navItems.map((item, idx) => {
                const isActive = item.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(item.path) || 
                    (item.dropdown && item.dropdown.some(subItem => location.pathname === subItem.path));

                if (item.dropdown) {
                  return (
                    <li 
                      key={idx} 
                      ref={desktopDropdownRef}
                      className="relative py-1 cursor-pointer"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <button
                        onClick={() => setShowDropdown((prev) => !prev)}
                        aria-expanded={showDropdown}
                        aria-haspopup="true"
                        className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
                      >
                        <motion.div 
                          variants={linkVariants} 
                          initial="initial" 
                          whileHover="hover" 
                          animate={showDropdown || isActive ? "hover" : "initial"}
                          className="flex items-center gap-1 font-medium text-sm tracking-wide select-none"
                        >
                          <span className={isActive ? 'text-cyan-400 font-semibold' : ''}>
                            {item.label}
                          </span>
                          <span className={`text-[9px] font-mono transition-transform duration-200 ${showDropdown ? 'rotate-180 text-cyan-400' : 'text-zinc-500'}`}>
                            ▼
                          </span>
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {showDropdown && (
                          <motion.div 
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 z-50"
                          >
                            <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-2 shadow-2xl backdrop-blur-2xl space-y-1">
                              {item.dropdown.map((subItem, sIdx) => (
                                <Link
                                  key={sIdx}
                                  to={subItem.path}
                                  onClick={() => setShowDropdown(false)}
                                  className="block p-2.5 rounded-lg hover:bg-zinc-900/80 transition-colors text-left group"
                                >
                                  <p className="text-xs font-semibold text-zinc-200 group-hover:text-cyan-400 transition-colors">
                                    {subItem.label}
                                  </p>
                                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-normal">
                                    {subItem.desc}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <motion.li 
                    key={idx}
                    className="relative py-1 cursor-pointer"
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={item.path} className="focus:outline-none">
                      <motion.div variants={linkVariants} transition={{ duration: 0.2 }}>
                        <span className={`font-medium text-sm tracking-wide block ${isActive ? 'text-cyan-400 font-semibold' : ''}`}>
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 rounded-full ${isActive ? 'w-full' : ''}`}
                      variants={lineVariants}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* User Auth Section (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <span className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {userCredits > 0 ? (
                  <Link 
                    to="/pricing"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:border-cyan-400 transition-all select-none"
                    title="Click to view plans"
                  >
                    <span className="animate-pulse">⚡</span>
                    <span>{userCredits} <span className="text-[10px] opacity-80">Credits</span></span>
                  </Link>
                ) : (
                  <Link 
                    to="/pricing"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/20 via-pink-500/20 to-cyan-500/20 border border-cyan-400 text-cyan-300 hover:text-white text-xs font-bold transition-all animate-pulse"
                  >
                    <span>⚡</span>
                    <span>Buy Credits</span>
                  </Link>
                )}

                {/* Identity Pill */}
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 hover:text-white transition-all group"
                  title="Open Dashboard"
                >
                  {avatarSrc ? (
                    <img 
                      src={avatarSrc} 
                      alt={displayName} 
                      className="h-6 w-6 rounded-lg object-cover border border-cyan-500/40"
                    />
                  ) : (
                    <span className="h-6 w-6 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] font-mono flex items-center justify-center text-cyan-400 group-hover:border-cyan-500 transition-colors">
                      {userInitial}
                    </span>
                  )}
                  <span className="text-xs font-semibold tracking-tight max-w-[130px] truncate">
                    {displayName}
                  </span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-red-400 transition-colors text-xs font-medium cursor-pointer px-1.5 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-zinc-300 hover:text-white transition-colors text-sm font-medium px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs px-4 py-2 rounded-lg transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#09090b]/95 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl z-40 border border-zinc-800 flex flex-col gap-4 md:hidden"
          >
            {/* Mobile User Identity (Only renders if authenticated) */}
            {user && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-left">
                {avatarSrc ? (
                  <img 
                    src={avatarSrc} 
                    alt={displayName} 
                    className="h-9 w-9 rounded-xl object-cover border border-cyan-500/40 shrink-0" 
                  />
                ) : (
                  <span className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-mono flex items-center justify-center text-cyan-400 shrink-0">
                    {userInitial}
                  </span>
                )}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-white truncate leading-tight">
                    {displayName}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 truncate">
                    {user?.email || `@${user?.username || 'user'}`}
                  </span>
                </div>
              </div>
            )}

            <ul className="flex flex-col gap-1">
              {navItems.map((item, idx) => {
                if (item.dropdown) {
                  return (
                    <li key={idx} className="flex flex-col">
                      <button 
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="text-zinc-300 hover:text-cyan-400 flex justify-between items-center py-2.5 px-3 text-sm font-medium transition-colors w-full rounded-xl hover:bg-zinc-900/60"
                      >
                        <span>{item.label}</span>
                        <span className={`text-[10px] font-mono transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-zinc-500'}`}>
                          ▼
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 flex flex-col border-l border-zinc-800 ml-4 my-1 gap-1"
                          >
                            {item.dropdown.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-cyan-400 block py-2 px-2 rounded-lg text-xs transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={idx}>
                    <Link 
                      to={item.path} 
                      onClick={() => setIsOpen(false)}
                      className="text-zinc-300 hover:text-cyan-400 block py-2.5 px-3 rounded-xl hover:bg-zinc-900/60 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-[1px] bg-zinc-900 w-full" />

            {/* Mobile Auth Bottom Section */}
            <div>
              {user ? (
                <div className="flex flex-col gap-2">
                  {userCredits > 0 ? (
                    <Link 
                      to="/pricing" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-2 px-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl text-xs font-medium text-cyan-400 mb-1 select-none hover:border-cyan-400 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="animate-pulse">⚡</span> Available Credits
                      </span>
                      <span className="font-bold text-sm text-cyan-300">{userCredits}</span>
                    </Link>
                  ) : (
                    <Link 
                      to="/pricing" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-2 px-3 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-cyan-500/20 border border-cyan-400 rounded-xl text-xs font-bold text-cyan-300 mb-1 select-none animate-pulse"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>⚡</span> Out of Credits
                      </span>
                      <span className="text-white bg-cyan-500/30 px-2 py-0.5 rounded-md text-[10px] border border-cyan-400/50">Buy Now</span>
                    </Link>
                  )}

                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-300 hover:text-cyan-400 flex items-center justify-center py-2.5 px-3 text-sm font-medium transition-colors rounded-xl bg-zinc-900/80 border border-zinc-800"
                  >
                    Open Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-center text-red-400 hover:text-red-300 py-2.5 px-3 text-sm font-medium transition-colors rounded-xl hover:bg-zinc-900/60 w-full cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-300 text-center py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-900/60 border border-zinc-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)}
                    className="bg-white hover:bg-zinc-200 text-black font-semibold text-center py-2.5 rounded-xl text-sm transition-all shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;