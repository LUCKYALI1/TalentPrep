import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-start md:items-center justify-center py-2 sm:py-6 md:py-12 px-2 sm:px-6 lg:px-8 font-sans overflow-x-hidden select-none">
      
      {/* 🌌 BACKGROUND MATRIX INTERACTION GRID */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* AMBIENT LIGHT RADAR */}
      <div className="absolute top-[-10%] left-[30%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-cyan-500/5 blur-[70px] sm:blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[10%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-indigo-500/5 blur-[70px] sm:blur-[120px] rounded-full pointer-events-none z-0" />

      {/* CORE FRAME BOARD PIPELINE */}
      {/* ⚡ Redesign Note: Removed any rigid heights that choke mobile views, switched to seamless flex mechanics */}
      <div className="relative z-10 w-full max-w-7xl mt-4 pt-10 sm:mt-8 md:mt-0 flex flex-col md:flex-row h-auto md:h-[calc(100vh-100px)] md:min-h-[600px] bg-[#050507] border border-zinc-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* ==================== LEFT/TOP NAVIGATION SYSTEM PANEL ==================== */}
        {/* ⚡ Responsive Structure: Switch to flat profile matrix padding and hidden overflow elements */}
        <div className="w-full md:w-1/4 bg-[#09090b] border-b md:border-b-0 md:border-r border-zinc-900 p-4 sm:p-5 flex flex-col justify-between shrink-0">
          
          <div className="w-full">
            {/* Branding Shield Tag */}
            <div className="mb-4 md:mb-8 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start border-b border-zinc-900 md:border-0 pb-3 md:pb-0 gap-2">
              <div className="text-left min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-white tracking-tight truncate">
                  Hello, {user?.firstName || 'Candidate'} {user?.lastName || ''}
                </h1>
                <p className="text-[10px] sm:text-[12px] font-mono text-cyan-400 lowercase truncate mt-0.5">
                  ID: {user?.username || 'candidate_node'}
                </p>
              </div>
              <div className="md:hidden text-[9px] font-mono text-zinc-600 bg-zinc-950 px-2 py-1 rounded border border-zinc-900">
                LIVE_NODE
              </div>
            </div>

            {/* Navigation Switch List */}
            {/* ⚡ UI Fix: Removed any implicit scroll containers, using raw grid items that adapt naturally */}
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:space-y-1.5">
              <NavLink 
                to="/dashboard" 
                end
                className={({ isActive }) => 
                  `flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs transition-all duration-150 border ${
                    isActive 
                      ? 'bg-zinc-900 text-white border-zinc-800 shadow-md border-l-2 border-l-cyan-400 font-bold' 
                      : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                  }`
                }
              >
                <span className="truncate">Performance Matrix</span>
                <span className="text-[9px] text-zinc-600 font-mono hidden md:inline">[01]</span>
              </NavLink>

              <NavLink 
                to="/dashboard/profile" 
                className={({ isActive }) => 
                  `flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs transition-all duration-150 border ${
                    isActive 
                      ? 'bg-zinc-900 text-white border-zinc-800 shadow-md border-l-2 border-l-cyan-400 font-bold' 
                      : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                  }`
                }
              >
                <span className="truncate">Core Profile Data</span>
                <span className="text-[9px] text-zinc-600 font-mono hidden md:inline">[02]</span>
              </NavLink>

              <NavLink 
                to="/dashboard/settings" 
                className={({ isActive }) => 
                  `flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs transition-all duration-150 border ${
                    isActive 
                      ? 'bg-zinc-900 text-white border-zinc-800 shadow-md border-l-2 border-l-cyan-400 font-bold' 
                      : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                  }`
                }
              >
                <span className="truncate">System Settings</span>
                <span className="text-[9px] text-zinc-600 font-mono hidden md:inline">[03]</span>
              </NavLink>

              <NavLink 
                to="/dashboard/user-data-info" 
                className={({ isActive }) => 
                  `flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg font-mono text-[11px] sm:text-xs transition-all duration-150 border ${
                    isActive 
                      ? 'bg-zinc-900 text-white border-zinc-800 shadow-md border-l-2 border-l-cyan-400 font-bold' 
                      : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                  }`
                }
              >
                <span className="truncate">User Data Info</span>
                <span className="text-[9px] text-zinc-600 font-mono hidden md:inline">[04]</span>
              </NavLink>
            </div>
          </div>

          {/* Telemetry Footer Status */}
          <div className="hidden md:flex mt-6 pt-3 border-t border-zinc-900/60 items-center justify-between text-[9px] font-mono text-zinc-600">
            <span>SYS_VERSION // 1.0.0</span>
            <span className="text-emerald-500 animate-pulse">● ONLINE</span>
          </div>
        </div>

        {/* ==================== MAIN RENDERING VIEWPORT ==================== */}
        {/* ⚡ UI Core Fix: Standard scrollbar controls with explicit native scroll styling overrides */}
        <div className="w-full md:w-3/4 bg-black/20 p-4 sm:p-6 md:p-8 overflow-x-hidden overflow-y-auto relative flex flex-col justify-start min-w-0 md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {/* Header Telemetry Grid Pin */}
          <div className="absolute top-4 right-6 hidden md:flex items-center gap-4 text-[9px] font-mono text-zinc-600">
            <span>[LOC_NODE // OVERLAY_OUTLET]</span>
            <span>SECURE_SESSION_ACTIVE</span>
          </div>

          {/* Dynamic Switch Engine Injection */}
          <div className="w-full h-full flex flex-col justify-start z-10">
            <Outlet />
          </div>

        </div>

      </div>
    </section>
  )
}

export default Dashboard;