import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Practice", href: "#practice" },
    { name: "Roadmaps", href: "#roadmaps" },
    { name: "Resources", href: "#resources" },
    { name: "About Us", href: "#about" }
  ];

  return (
    <footer className="relative w-full bg-black text-white border-t border-zinc-900 px-4 sm:px-6 lg:px-8 py-12 overflow-hidden font-sans select-none">
      
      {/* =========================================================
          SAVED CONTEXT: BACKGROUND GRID MATRIX
         ========================================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px"
        }}
      />

      {/* =========================================================
          MAIN 3-COLUMN STRUCTURAL DECK (Z-INDEX ASSIGNED AS z-10)
         ========================================================= */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN 1: ABOUT COMPANY (5/12 Columns) */}
        <div className="md:col-span-5 space-y-3 text-left">
          <div className="text-lg font-black text-white tracking-tight flex items-center gap-1.5">
            TalentPrep
          </div>
          <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal max-w-sm">
            Next-gen evaluation engines designed to bridge the gap between candidate preparation and enterprise standards. We map speech telemetry, code logic bounds, and resume architectures in real-time.
          </p>
        </div>

        {/* COLUMN 2: QUICK LINKS (3/12 Columns) */}
        <div className="md:col-span-3 space-y-3 text-left">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Navigation
          </span>
          <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-400 font-medium">
            {quickLinks.map((link, linkIdx) => (
              <li key={linkIdx}>
                <a 
                  href={link.href} 
                  className="hover:text-cyan-400 transition-colors duration-200 block w-fit"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: CREDITS & LEGAL (4/12 Columns) */}
        <div className="md:col-span-4 space-y-4 text-left md:text-right flex flex-col md:items-end justify-between h-full">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
              Core Developer
            </span>
            <p className="text-xs sm:text-[13px] text-zinc-300 font-medium tracking-tight">
              Created by <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">Ali</span> with love ⚡
            </p>
          </div>

          {/* Copyright Sub-strip */}
          <div className="text-[10px] font-mono text-zinc-600 pt-4 md:pt-0">
            &copy; {new Date().getFullYear()} TalentPrep AI. All rights reserved.
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer