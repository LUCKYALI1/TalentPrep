import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

let loggedIn = false; 

const navItems = [
  { label: 'Home', path: '/' },
  { 
    label: 'Services', 
    path: '/services',
    dropdown: [
      { label: 'ATS Auditor', path: '/services/ats', desc: 'Cross-reference CV optimization arrays' },
      { label: 'AI Interview Sim', path: '/services/interview', desc: 'Real-time telemetry mock sessions' }
    ]
  },
  { label: 'About', path: '/about' },
  { label: 'Dashboard', path: '/dashboard' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Modern Animation Variables matching global context
  const linkVariants = {
    initial: { y: 0, scale: 1, color: 'rgba(241, 245, 249, 0.75)' },
    hover: { y: -1, scale: 1.01, color: '#06B6D4' }
  };

  const lineVariants = {
    initial: { width: '0%' },
    hover: { width: '100%' }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <>
      {/* Navbar Base Frame */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl bg-black backdrop-blur-xl rounded-2xl p-4 md:px-8 z-50 border border-zinc-800 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <div className="container mx-auto flex items-center justify-between">
          
          {/* Logo Frame */}
          <Link to="/" className="text-xl font-black tracking-tight text-white select-none">
            Talent<span className="text-cyan-400">Prep</span>
          </Link>
          
          {/* Desktop Links Deck */}
          <div className="hidden md:flex items-center"> 
            <ul className="flex items-center gap-8"> 
              {navItems.map((item, idx) => {
                if (item.dropdown) {
                  return (
                    <li 
                      key={idx} 
                      ref={dropdownRef}
                      className="relative py-2 cursor-pointer"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <motion.div 
                        variants={linkVariants} 
                        initial="initial" 
                        whileHover="hover" 
                        animate={showDropdown ? "hover" : "initial"}
                        className="flex items-center gap-1 font-medium text-sm tracking-wide select-none"
                      >
                        {item.label}
                        <span className={`text-[9px] font-mono transition-transform duration-200 ${showDropdown ? 'rotate-180 text-cyan-400' : 'text-zinc-500'}`}>▼</span>
                      </motion.div>
                      
                      {/* Dropdown Container Submenu */}
                      <AnimatePresence>
                        {showDropdown && (
                          <motion.div 
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-[#09090b]/95 border border-zinc-800 rounded-xl p-2.5 shadow-2xl backdrop-blur-md"
                          >
                            <div className="space-y-1">
                              {item.dropdown.map((subItem, sIdx) => (
                                <Link
                                  key={sIdx}
                                  to={subItem.path}
                                  onClick={() => setShowDropdown(false)}
                                  className="block p-2 rounded-lg hover:bg-zinc-900 transition-colors text-left group"
                                >
                                  <p className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">{subItem.label}</p>
                                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5 leading-tight">{subItem.desc}</p>
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
                    className="relative py-2 cursor-pointer"
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={item.path}>
                      <motion.div variants={linkVariants} transition={{ duration: 0.2, ease: "easeInOut" }}>
                        <span className="font-medium text-sm tracking-wide block">
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[1.5px] bg-cyan-400 rounded-full"
                      variants={lineVariants}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Desktop Authentication Systems Routing */}
          <div className="hidden md:flex items-center gap-4">
            {loggedIn ? (
              <Link to="/dashboard" className="text-zinc-300 hover:text-cyan-400 flex items-center gap-2 transition-colors duration-200 text-sm font-medium group">
                <span className="h-5 w-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono flex items-center justify-center text-zinc-400 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors">U</span>
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium px-3 py-2">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity text-sm font-bold font-mono uppercase tracking-wider scale-95">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburg Trigger Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-zinc-400 hover:text-cyan-400 focus:outline-none transition-colors text-xs font-mono tracking-widest px-2 py-1 border border-zinc-800 bg-zinc-900/40 rounded-lg"
              aria-label="Toggle Menu"
            >
              {isOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Overlay Grid Layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] bg-black/95 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl z-40 border border-zinc-900 flex flex-col gap-5 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, idx) => {
                if (item.dropdown) {
                  return (
                    <li key={idx} className="flex flex-col">
                      <button 
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="text-zinc-300 hover:text-cyan-400 flex justify-between items-center py-2 px-3 text-base font-medium transition-all text-left w-full rounded-xl hover:bg-white/5"
                      >
                        <span>{item.label}</span>
                        <span className={`text-[10px] font-mono transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-zinc-500'}`}>▼</span>
                      </button>
                      
                      {/* Mobile Dropdown Sublinks Stack */}
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 flex flex-col border-l border-zinc-800/80 ml-3.5 my-1 gap-1"
                          >
                            {item.dropdown.map((subItem, sIdx) => (
                              <Link
                                key={sIdx}
                                to={subItem.path}
                                onClick={() => { setIsOpen(false); setMobileDropdownOpen(false); }}
                                className="text-zinc-400 hover:text-cyan-400 block py-2 px-2 rounded-lg text-sm transition-colors"
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
                  <li key={idx} onClick={() => setIsOpen(false)}>
                    <Link 
                      to={item.path} 
                      className="text-zinc-300 hover:text-cyan-400 block py-2 px-3 rounded-xl hover:bg-white/5 text-base font-medium transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-[1px] bg-zinc-900 w-full" />

            {/* Mobile Authentication Deck System */}
            <div onClick={() => setIsOpen(false)}>
              {loggedIn ? (
                <Link to="/dashboard" className="text-zinc-300 hover:text-cyan-400 flex items-center gap-3 py-2 px-3 text-base font-medium transition-colors rounded-xl hover:bg-white/5">
                  <span className="h-5 w-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono flex items-center justify-center text-zinc-400">U</span>
                  Dashboard
                </Link>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <Link to="/login" className="text-zinc-400 text-center py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white text-center py-2.5 rounded-xl text-sm font-bold font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/10">
                    Register
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