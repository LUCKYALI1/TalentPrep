import React from 'react'
import { motion } from 'framer-motion'

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #3f3f46 1px, transparent 1px),
    linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px"
};

const LandingPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden font-sans flex flex-col justify-between">
      
      {/* 1. BACKGROUND GRID OVERLAY */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={gridBackgroundStyle}
      />

      {/* Optimized Ambient Glow (Reduced blur radius for GPU execution) */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[250px] bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none z-0" />

      {/* 3. HERO CONTAINER */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16">
        
        {/* LEFT COLUMN: HERO TEXT (Rendered Directly without Opacity:0 delay) */}
        <div className="lg:col-span-6 space-y-6 text-left flex flex-col justify-center h-full">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-900/50 bg-cyan-950/20 text-[11px] text-cyan-400 font-mono tracking-wide w-fit">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Next-Gen AI Evaluation Active
          </div>

          {/* ⚡ CRITICAL LCP FIX: Direct H1 HTML Paint without framer-motion delay */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Master Your Next <br className="hidden md:block" />
            Interview with <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Real-Time AI
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Record responses and receive deep-dive analytical grading instantly. Unpack performance metrics, pacing, and core competencies instantly.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
            <button className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 duration-200">
              Start Free Mock Interview
            </button>
            <button className="w-full sm:w-auto px-6 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-medium text-sm rounded-xl border border-zinc-800 transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: DASHBOARD PANEL */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-6 w-full flex items-center justify-center relative"
        >
          <div className="w-full max-w-lg bg-[#09090b] border border-zinc-900/90 rounded-2xl p-5 font-sans relative z-10 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                <span className="h-2 w-2 rounded-full bg-green-500/80" />
                <span className="text-[10px] font-mono text-zinc-600 ml-2">talentprep.ai/dashboard</span>
              </div>
              <span className="text-[10px] font-mono font-medium text-emerald-400 border border-emerald-950 bg-emerald-950/20 px-2 py-0.5 rounded">
                Live Analysis
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 bg-black/40 border border-zinc-900 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    AI Behavioral Stream
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "Your system scale breakdown was clear. Reduce structural filler words (e.g., 'like', 'um') to assert execution authority."
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-zinc-900/60 text-[10px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1">
                    <span className="text-indigo-400 text-[9px]">●</span> Pacing: <span className="text-zinc-200">135 WPM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-cyan-400 text-[9px]">▲</span> Keywords: <span className="text-cyan-400 font-bold">9/10</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-3">
                <div className="bg-black/40 border border-zinc-900 p-3 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Match Score</p>
                    <p className="text-lg font-black text-emerald-400">92%</p>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 px-1.5 py-0.5 rounded-md font-bold scale-90">
                    PASS
                  </span>
                </div>

                <div className="bg-black/40 border border-zinc-900 p-3 rounded-xl space-y-2.5">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                      <span>Delivery</span>
                      <span className="text-zinc-200">88%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full w-[88%] bg-cyan-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-400">
                      <span>Logic</span>
                      <span className="text-zinc-200">95%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </main>

      {/* METRICS ROW */}
      <div className="relative z-10 w-full border-t border-zinc-900 bg-black/80 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Instant Feedback</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-300 mt-1">Right/Wrong Grading</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Speech Evaluation</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-300 mt-1">Pacing & Tone Tracking</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Data Insights</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-300 mt-1">Keyword Detection</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">Confidence Metric</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-300 mt-1">Behavioral Analytics</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default React.memo(LandingPage);