import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Globe 
} from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const gridBackgroundStyle = {
  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(63, 63, 70, 0.4) 1px, transparent 0)`,
  backgroundSize: '24px 24px'
};

const NAVIGATION_GROUPS = [
  {
    category: "Engines",
    links: [
      { label: "Voice Mock Terminal", href: "/interview/configure" },
      { label: "ATS Resume Analyzer", href: "/services/ats" },
      { label: "Scenario Studio", href: "/services/interview" },
      { label: "Evaluation Reports", href: "/dashboard" }
    ]
  },
  {
    category: "Workspace",
    links: [
      { label: "Candidate Hub", href: "/dashboard" },
      { label: "Verified Profile", href: "/dashboard/profile" },
      { label: "Token & Credit Pricing", href: "/pricing" },
      { label: "Account Security", href: "/dashboard/settings" }
    ]
  },
  {
    category: "Platform",
    links: [
      { label: "System Architecture", href: "/about" },
      { label: "Deterministic Rubrics", href: "/about" },
      { label: "Telemetry Pipeline", href: "/about" },
      { label: "STAR Calibration", href: "/about" }
    ]
  }
];

function Footer() {
  return (
    <footer className="relative w-full bg-black text-zinc-300 border-t border-zinc-900 overflow-hidden font-sans select-none box-border">
      
      {/* Background Matrix & Subtle Gradient Floor */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,750px)] h-[180px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Container Aligned to max-w-5xl Grid */}
      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 space-y-12">
        
        {/* Top Status & Brand Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-7">
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all shadow-inner">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block group-hover:text-cyan-400 transition-colors">
                TalentPrep
              </span>
              <span className="text-[10px] font-mono text-zinc-500 block leading-tight">
                AI Evaluation Architecture
              </span>
            </div>
          </Link>

          {/* Engine Status & Latency Badges */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/90 border border-zinc-800/90 text-zinc-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-zinc-950/90 border border-zinc-800/90 text-zinc-500 hidden sm:flex items-center gap-1.5 backdrop-blur-sm">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Latency: &lt;240ms</span>
            </div>
          </div>
        </div>

        {/* Multi-Column Bento Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 text-xs">
          
          {/* Left Column: Mission, Creator Badge & Socials (5 Cols) */}
          <div className="md:col-span-5 space-y-5 text-left">
            <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-sm font-normal">
              Autonomous interview preparation platform with live conversational speech capture, ATS alignment scoring, and Gemini-powered logic audits.
            </p>

            {/* Lead Architect Signal */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                Lead Architect
              </span>
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-200 bg-zinc-950/90 border border-zinc-800/90 px-3 py-1.5 rounded-xl shadow-inner">
                  Designed & Engineered by <span className="text-cyan-400 font-semibold">Ali</span>
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">• 2026 Production</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-xl border border-zinc-800/90 bg-zinc-950/80 hover:bg-zinc-900 hover:border-zinc-700 hover:text-cyan-400 text-zinc-400 transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-xl border border-zinc-800/90 bg-zinc-950/80 hover:bg-zinc-900 hover:border-zinc-700 hover:text-cyan-400 text-zinc-400 transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://onlyone.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Personal Portfolio"
                className="w-8 h-8 rounded-xl border border-zinc-800/90 bg-zinc-950/80 hover:bg-zinc-900 hover:border-zinc-700 hover:text-cyan-400 text-zinc-400 transition-all flex items-center justify-center cursor-pointer active:scale-95"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Navigation Groups (7 Cols: 3 sub-columns) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {NAVIGATION_GROUPS.map((group) => (
              <div key={group.category} className="space-y-3.5">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                  {group.category}
                </span>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-1 group font-normal text-xs leading-tight"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {link.label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-all shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Sub-Footer Meta Bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-zinc-400">Zero Data Selling • Transcripts Ephemerally Isolated</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/about" className="hover:text-zinc-300 transition-colors">
              About
            </Link>
            <span className="text-zinc-700">•</span>
            <Link to="/pricing" className="hover:text-zinc-300 transition-colors">
              Pricing
            </Link>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400">&copy; {new Date().getFullYear()} TalentPrep AI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default React.memo(Footer);