import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NAV_LINKS = [
  {
    path: '/dashboard',
    label: 'Overview',
    end: true,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    path: '/dashboard/profile',
    label: 'Profile',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    path: '/dashboard/settings',
    label: 'Settings',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    path: '/dashboard/user-data-info',
    label: 'Account Info',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
];

function Dashboard() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'C';
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-start justify-center pt-24 sm:pt-2 pb-10 px-3 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
      {/* Background Matrix Ambient Light */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #27272a 1px, transparent 1px),
            linear-gradient(to bottom, #27272a 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="fixed top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0 " />
      <div className="fixed bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Main Glassmorphic Layout Frame */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row min-h-[80vh] md:min-h-[720px] bg-[#09090b]/85 border border-zinc-800/80 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        
        {/* Mobile Sticky Glass Header */}
        <div className="md:hidden sticky top-0 z-30 w-full bg-[#08080a]/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-black text-xs shadow-md shadow-cyan-500/20">
              T
            </div>
            <span className="text-xs font-bold text-white tracking-tight">TalentPrep AI</span>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Glass Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-[53px] z-30 bg-[#08080a]/90 backdrop-blur-2xl border-b border-zinc-800/80 p-4 space-y-2 shadow-2xl">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-zinc-400 border border-transparent bg-zinc-900/40 hover:bg-zinc-800/50'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Desktop Glass Sidebar */}
        <aside className="hidden md:flex w-64 lg:w-72 bg-black/40 backdrop-blur-xl border-r border-zinc-800/70 flex-col justify-between shrink-0 p-5">
          <div className="space-y-6">
          
            {/* User Profile Mini Badge */}
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl backdrop-blur-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center font-bold text-cyan-400 text-sm shrink-0 shadow-inner">
                {getInitials(user?.firstName)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-semibold text-white truncate">
                  {user?.firstName ? `${user.firstName} ${user?.lastName || ''}` : 'Candidate'}
                </h3>
                <p className="text-[11px] text-zinc-400 truncate">
                  {user?.email || user?.username || 'candidate@talentprep.ai'}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-3 mb-2">
                Menu
              </p>
              <nav className="space-y-1.5" aria-label="Dashboard Navigation">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-sm shadow-cyan-500/10 font-semibold'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40 border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                          {link.icon}
                        </span>
                        <span className="truncate">{link.label}</span>
                        {isActive && (
                          <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

          </div>

          {/* Sidebar Footer Metrics */}
          <div className="pt-4 border-t border-zinc-800/60 space-y-3">
            <div className="p-3 bg-zinc-950/60 border border-zinc-900/80 rounded-xl backdrop-blur-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-zinc-400 text-[11px]">System API</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900/50">
                Operational
              </span>
            </div>
          </div>
        </aside>

        {/* Dynamic Outlet Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-y-auto bg-black/20">
          <Outlet />
        </main>

      </div>

    </section>
  );
}

export default React.memo(Dashboard);