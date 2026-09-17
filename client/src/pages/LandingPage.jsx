import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom'

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #27272a 1px, transparent 1px),
    linear-gradient(to bottom, #27272a 1px, transparent 1px)
  `,
  backgroundSize: "36px 36px"
};

function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden font-sans flex flex-col justify-between pt-20">
      
      {/* 1. Background Grid Overlay & Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* 2. Centered Hero Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center text-center">
        
        {/* Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-800/40 bg-cyan-950/30 text-xs text-cyan-400 font-mono tracking-wide mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          AI-Powered Mock Interviews • TalentPrep
        </motion.div>

        {/* Centered Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-4xl"
        >
          Ace Your Next Interview with <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Smart AI Feedback
          </span>
        </motion.h1>

        {/* Centered Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          Practice role-specific mock interviews. Receive real-time scoring, target your exact response mistakes, and master STAR-formatted answers.
        </motion.p>

       {/* CTA Button Group */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
        >
          <Link
            to="/interview/configure"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs sm:text-sm transition-all shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
             Start AI Interview
          </Link>

          <Link
            to="/pricing"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Tier Plans & Credits <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </motion.div>

        {/* Centered Evaluation Card Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 w-full max-w-3xl bg-[#09090b] border border-zinc-800/90 rounded-2xl p-4 sm:p-6 text-left shadow-2xl"
        >
          {/* Card Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800/70 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-zinc-500 ml-2">talentprep.ai/evaluation-report</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-900/60 px-2.5 py-0.5 rounded-full">
              AI Evaluation Complete
            </span>
          </div>

          {/* Card Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Left Column: Context & Feedback */}
            <div className="md:col-span-7 space-y-3">
              <div className="bg-zinc-950/80 border border-zinc-900 p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Target Question</span>
                <p className="text-xs text-zinc-200 font-medium">"Tell me about a time you handled a tight project deadline under pressure."</p>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-900 p-3.5 rounded-xl space-y-2">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  ⚠️ Identified Mistake
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your response focused heavily on stress rather than explicit problem-solving steps.
                </p>

                <div className="pt-2 border-t border-zinc-900 text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  💡 Recommended Answer
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Apply the STAR model: state the deadline constraint, outline key trade-off decisions made, and close with quantifiable metrics.
                </p>
              </div>
            </div>

            {/* Right Column: Metrics & Score */}
            <div className="md:col-span-5 flex flex-col justify-between gap-3">
              <div className="bg-zinc-950/80 border border-zinc-900 p-4 rounded-xl text-center flex-1 flex flex-col justify-center items-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Interview Score</span>
                <span className="text-3xl font-black text-emerald-400 my-1">85<span className="text-xs text-zinc-500 font-normal">/100</span></span>
                <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-900/50 px-2.5 py-0.5 rounded-full font-semibold">
                  Strong Pass
                </span>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-900 p-3.5 rounded-xl space-y-2.5">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>Clarity & Structure</span>
                    <span className="text-zinc-200">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-cyan-400 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>Domain Keywords</span>
                    <span className="text-zinc-200">82%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-[82%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </main>

      {/* 3. Value Proposition Bar */}
      <div className="relative z-10 w-full border-t border-zinc-900 bg-black/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="p-2">
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">01. Real-Time Feedback</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">Instant Scores & Evaluation</p>
          </div>
          <div className="p-2">
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">02. Mistake Detection</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">Pinpoint Weaknesses</p>
          </div>
          <div className="p-2">
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">03. Model Solutions</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">STAR Framework Insights</p>
          </div>
          <div className="p-2">
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">04. Role Specific</p>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">Custom Industry Scenarios</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default React.memo(LandingPage);