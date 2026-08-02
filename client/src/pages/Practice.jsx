import React from 'react'
import { motion } from 'framer-motion'

const Practice = () => {
  // Practice Features Array Configuration
  const features = [
    {
      title: "Realistic Voice Chat",
      subtitle: "Voice chat interface simulator",
      desc: "Our realistic voice chat feels just like a real interview panel. Practice dynamic verbal articulation in an authentic stream structure.",
      badge: "Audio Active",
      accent: "from-cyan-400 to-blue-500"
    },
    {
      title: "Powerful Interviewer",
      subtitle: "Find holes in your CV",
      desc: "Our AI interviewer will question you on everything from job-specific technicalities to hidden edge cases inside your uploaded résumé structures.",
      badge: "Logic Engine",
      accent: "from-blue-500 to-indigo-500"
    },
    {
      title: "Constructive Feedback",
      subtitle: "Improve your technique",
      desc: "Get honest, deep-dive constructive diagnostics from our intelligent evaluation model, including alternative ideal answers.",
      badge: "Audit Report",
      accent: "from-indigo-500 to-purple-500"
    },
    {
      title: "Get Better Over Time",
      subtitle: "Master each difficulty level",
      desc: "Work your way up sequentially from easy to hard mode, sharpening your runtime technical logic bounds and pacing stability.",
      badge: "Adaptive Mode",
      accent: "from-purple-500 to-pink-500"
    }
  ];

  // Testimonials Peer Data Deck with Initial Tokens for Pure CSS Avatars
  const testimonials = [
    {
      quote: "TalentPrep really put me through my paces. It helped me parse exactly what areas to fix and get a top tier engineering job in a practice I love!",
      name: "Katya Samson",
      role: "Dentist",
      initials: "KS",
      color: "from-cyan-500 to-blue-500"
    },
    {
      quote: "I was super nervous for my technical loop, but practicing real-time audio sessions over the grid matrix gave me absolute authority over my presentation.",
      name: "Anonymous Partner",
      role: "Analyst",
      initials: "AP",
      color: "from-blue-500 to-indigo-500"
    },
    {
      quote: "Using this simulator was great. It allowed me to sharpen my space trace algorithms and improve my raw speech delivery metrics incredibly fast.",
      name: "Jim Paros",
      role: "Analyst",
      initials: "JP",
      color: "from-indigo-500 to-purple-500"
    },
    {
      quote: "It was so good, the structural complexity questions it asked were so clever! It felt like sitting right in front of a live principal staff architect.",
      name: "Alison",
      role: "Accountant",
      initials: "AL",
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Floating preset for high-whiteness glass layers
  const floatAnimation = (delay = 0, yRange = [-5, 5]) => ({
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
    <div className="relative w-full bg-black text-white font-sans overflow-hidden select-none flex flex-col justify-start">
      
      {/* =========================================================
          SAVED CONTEXT: BACKGROUND GRID MATRIX & SUBTLE GLOW
         ========================================================= */}
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
      
      {/* Ambient Radial Mesh Layers */}
      <div className="absolute top-[20%] left-[30%] w-[600px] h-[400px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[50%] right-[10%] w-[700px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* =========================================================
          UPPER PORTION: PRACTICE PARAMETERS & INTERACTIVE INTERVIEW SHOWCASE
         ========================================================= */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-b border-zinc-900/80">
        
        {/* Title Deck */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Adaptive Training Module
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Practice Makes Perfect
          </h2>
          <p className="text-zinc-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
            Work your way up through the operational tiers of our AI interview coach. Get actionable feedback on your weak areas and perfect your core strengths.
          </p>
        </div>

        {/* 2-COLUMN FEATURE GRID: Left side features, Right side screenshot reproduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* LEFT: 4 Features Column (Stacking vertical cards) */}
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ x: 4 }}
                className="bg-[#09090b]/80 border border-zinc-900 p-5 rounded-xl shadow-xl flex flex-col justify-between group transition-colors duration-200 hover:border-zinc-800"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                    <span>{item.subtitle}</span>
                    <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-normal font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: RECREATED LIVE INTERVIEW SIMULATOR PANEL (From Screenshot 2026-06-29 204624) */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full flex items-center justify-center py-8 relative">
            
            {/* Main Double Window Workspace Panel */}
            <div className="w-full max-w-xl bg-white/[0.02] border border-white/10 rounded-2xl p-4 font-sans relative z-10 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[320px]">
              
              {/* Left Side Section: Job & CV Matrix (4 Columns) */}
              <div className="md:col-span-5 bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-between text-left text-[11px] relative">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-zinc-300">Job details</span>
                    <span className="text-[9px] text-cyan-400 font-mono cursor-pointer bg-cyan-950/20 px-1 rounded">☁ Import</span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-zinc-500 text-[9px] uppercase font-mono">Job Title</p>
                    <p className="text-zinc-200 font-bold bg-white/5 p-1 rounded border border-white/5">Investment Banking - Finance</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-zinc-500 text-[9px] uppercase font-mono">Job Description</p>
                    <p className="text-zinc-400 text-[10px] leading-tight line-clamp-4 bg-white/5 p-1 rounded border border-white/5">
                      As an Analyst in the team, you will build models and analyze enterprise infrastructure pipelines...
                    </p>
                  </div>
                </div>

                {/* CV Block */}
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <p className="text-zinc-500 text-[9px] uppercase font-mono">Personal Details</p>
                  <div className="bg-white/5 p-1 rounded border border-white/5 text-zinc-300 font-medium">Dahlia Wolff</div>
                </div>

                {/* FLOATING HIGHLIGHT 1: Communication Skills */}
                <motion.div 
                  animate={floatAnimation(0)}
                  className="absolute -left-6 top-1/3 bg-white text-zinc-900 rounded-xl p-3 shadow-2xl border border-white flex items-center gap-2.5 w-44 z-20"
                >
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs shrink-0">✓</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-zinc-900 leading-none">Communication skills</p>
                    <div className="w-full h-1 bg-zinc-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full w-[85%] bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </motion.div>

                {/* FLOATING HIGHLIGHT 2: CV Uploaded */}
                <motion.div 
                  animate={floatAnimation(1.5, [4, -4])}
                  className="absolute left-4 -bottom-6 bg-white text-zinc-900 rounded-xl px-3 py-2 shadow-2xl border border-white flex items-center gap-2 z-20 font-mono text-[10px] font-bold"
                >
                  <span className="text-blue-600">📄</span> CV uploaded
                </motion.div>
              </div>

              {/* Right Side Section: Live Transcript Streams Terminal (7 Columns) */}
              <div className="md:col-span-7 bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col justify-between text-left text-[11px] relative">
                
                {/* Dialogue Container */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {/* AI Prompt chat bubble */}
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-1">
                    <p className="text-[9px] font-mono text-purple-400 font-bold uppercase">AI Interviewer</p>
                    <p className="text-zinc-300 leading-tight">
                      Hello, Dahlia! Exciting to discuss how your background aligns with the Analyst position in our Finance team...
                    </p>
                  </div>

                  {/* User response preview row */}
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 text-right ml-6">
                    <p className="text-zinc-400 leading-tight">
                      Yeah, I think I'd be really good at it. In my previous commercial banking loop...
                    </p>
                  </div>

                  {/* AI Next question thread */}
                  <div className="bg-indigo-950/20 rounded-xl p-2.5 border border-indigo-900/30 space-y-1">
                    <p className="text-[9px] font-mono text-cyan-400 font-bold uppercase">Current question:</p>
                    <p className="text-zinc-300 leading-tight">
                      Can you walk me through a strategy that initially failed with your team? How did you course-correct?
                    </p>
                  </div>
                </div>

                {/* FLOATING HIGHLIGHT 3: Job Details Imported */}
                <motion.div 
                  animate={floatAnimation(0.8, [-6, 6])}
                  className="absolute -right-6 top-1/4 bg-white text-zinc-900 rounded-xl px-3 py-1.5 shadow-2xl border border-white flex items-center gap-2 z-20 font-sans text-[10px] font-bold"
                >
                  <span className="text-emerald-500 font-bold">✓</span> Job details imported
                </motion.div>

                {/* FLOATING HIGHLIGHT 4: Live Audio Response Widget */}
                <motion.div 
                  animate={floatAnimation(2.2)}
                  className="absolute -right-4 -bottom-4 bg-white text-zinc-900 rounded-2xl p-3 shadow-2xl border border-white flex items-center gap-3 w-56 sm:w-64 z-20"
                >
                  <div className="h-7 w-7 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 overflow-hidden font-mono text-[9px] font-black">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-zinc-500 leading-none">Live voice feed...</p>
                    <p className="text-[11px] font-bold text-zinc-800 truncate mt-1">"I decided to leave Citi Bank because..."</p>
                  </div>
                  <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white animate-pulse">🎤</span>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          LOWER PORTION: SOCIAL PEER PROOF LAYER (HIGH WHITENESS GLASSMORPHISM)
         ========================================================= */}
    

    </div>
  )
}

export default Practice