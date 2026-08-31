import React from 'react';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #27272a 1px, transparent 1px),
    linear-gradient(to bottom, #27272a 1px, transparent 1px)
  `,
  backgroundSize: "36px 36px"
};

const QUICK_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Practice", href: "#practice" },
  { name: "Roadmaps", href: "#roadmaps" },
  { name: "Resources", href: "#resources" },
  { name: "About Us", href: "#about" }
];

function Footer() {
  return (
    <footer className="relative w-full bg-black text-white border-t border-zinc-900 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden font-sans">
      
      {/* Background Grid Matrix */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={gridBackgroundStyle}
      />

      {/* Soft Ambient Radial Backdrop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Main 3-Column Layout */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Column 1: Brand & Description */}
        <div className="md:col-span-5 space-y-3 text-left">
          <div className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            TalentPrep
          </div>
          <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal max-w-sm">
            Next-gen evaluation engines designed to bridge candidate preparation with enterprise standards. We map speech telemetry, code logic bounds, and resume architectures in real time.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-3 space-y-3 text-left">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
            Navigation
          </span>
          <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-400 font-medium">
            {QUICK_LINKS.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="hover:text-cyan-400 transition-colors duration-200 block w-fit focus:outline-none focus:text-cyan-400"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Developer & Legal */}
        <div className="md:col-span-4 space-y-4 text-left md:text-right flex flex-col md:items-end justify-between h-full">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
              Core Developer
            </span>
            <p className="text-xs sm:text-[13px] text-zinc-300 font-medium tracking-tight">
              Created by <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">Ali</span> with love ⚡
            </p>
          </div>

          <div className="text-[10px] font-mono text-zinc-600 pt-4 md:pt-0">
            &copy; {new Date().getFullYear()} TalentPrep AI. All rights reserved.
          </div>
        </div>

      </div>

    </footer>
  );
}

export default React.memo(Footer);