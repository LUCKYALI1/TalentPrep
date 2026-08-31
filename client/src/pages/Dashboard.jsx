import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NAV_LINKS = [
  { path: '/dashboard', label: 'Overview', end: true },
  { path: '/dashboard/profile', label: 'Profile' },
  { path: '/dashboard/settings', label: 'Settings' },
  { path: '/dashboard/user-data-info', label: 'Account Info' },
];

function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-start md:items-center justify-center py-4 sm:py-6 md:py-12 px-3 sm:px-6 lg:px-8 font-sans overflow-x-hidden pt-20">
      
      {/* Background Matrix & Subtle Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #27272a 1px, transparent 1px),
            linear-gradient(to bottom, #27272a 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px"
        }}
      />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Workspace Frame */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row h-auto md:h-[calc(100vh-120px)] md:min-h-[620px] bg-[#050507] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#09090b] border-b md:border-b-0 md:border-r border-zinc-900 p-4 sm:p-6 flex flex-col justify-between shrink-0">
          
          <div className="w-full">
            {/* User Greeting & Details */}
            <div className="mb-6 flex items-center justify-between md:block border-b md:border-0 border-zinc-900 pb-3 md:pb-0">
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                  Welcome, {user?.firstName || 'Candidate'}
                </h1>
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {user?.email || user?.username || 'candidate@talentprep.ai'}
                </p>
              </div>
              <span className="md:hidden text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>

            {/* Navigation Items */}
            <nav className="grid grid-cols-2 gap-2 md:flex md:flex-col md:space-y-1.5" aria-label="Dashboard Navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 border ${
                      isActive
                        ? 'bg-zinc-900 text-cyan-400 border-zinc-800 shadow-sm font-semibold'
                        : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`
                  }
                >
                  <span className="truncate">{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* System Telemetry Footer */}
          <div className="hidden md:flex pt-4 border-t border-zinc-900 items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>System Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
        </aside>

        {/* Dynamic Outlet Viewport */}
        <main className="w-full md:flex-1 bg-black/40 p-4 sm:p-6 md:p-8 overflow-x-hidden overflow-y-auto relative flex flex-col justify-start min-w-0 md:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {/* Header Bar */}
          <div className="hidden md:flex justify-end items-center mb-4 text-xs font-mono text-zinc-500 gap-3">
            <span>TalentPrep Workspace</span>
            <span className="text-zinc-800">|</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Session Secure
            </span>
          </div>

          {/* Render Active Sub-route */}
          <div className="w-full h-full flex flex-col justify-start z-10">
            <Outlet />
          </div>

        </main>

      </div>
    </section>
  );
}

export default React.memo(Dashboard);