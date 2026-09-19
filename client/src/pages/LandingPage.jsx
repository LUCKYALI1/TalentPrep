import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  Activity,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px'
};

function LandingPage() {
  return (
    <div className="relative w-full min-h-[100dvh] bg-black text-white overflow-x-hidden font-sans flex flex-col justify-between pt-24 sm:pt-28 selection:bg-cyan-500/25 selection:text-cyan-200 box-border">
      
      {/* Background Ambience & Directional Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,750px)] h-[380px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Hero Container */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center text-center">
        
        {/* Status Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs text-cyan-400 font-mono tracking-wide mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span>AI-Powered Mock Interviews</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300 font-semibold">TalentPrep</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl"
        >
          Ace Your Next Interview with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Smart AI Feedback
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-5 text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal"
        >
          Practice role-specific mock interviews. Receive real-time scoring, target your exact response mistakes, and master STAR-formatted answers.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Link
            to="/interview/configure"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black shrink-0" />
            <span>Start AI Interview</span>
          </Link>

          <Link
            to="/pricing"
            className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Tier Plans & Credits</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
          </Link>
        </motion.div>

        {/* Interactive Evaluation HUD Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-12 sm:mt-14 w-full max-w-4xl bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-6 text-left shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Subtle Card Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-36 bg-cyan-500/5 blur-[80px] pointer-events-none" />

          {/* Window Terminal Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-zinc-800/70 pb-3.5 mb-5 font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-zinc-600 text-xs ml-1">/</span>
              <span className="text-[11px] sm:text-xs text-zinc-400">talentprep.ai/evaluation-report</span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-cyan-400 bg-cyan-950/50 border border-cyan-900/60 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Diagnostic Complete
              </span>
            </div>
          </div>

          {/* Card Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Left Diagnostic Column (7 Cols) */}
            <div className="md:col-span-7 space-y-3 font-sans">
              
              {/* Question Box */}
              <div className="bg-zinc-950/90 border border-zinc-800/90 p-4 rounded-xl space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    Target Question
                  </span>
                  <span className="text-zinc-600">BEHAVIORAL // STAR</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-snug pt-1">
                  "Tell me about a time you handled a tight project deadline under pressure."
                </p>
              </div>

              {/* Feedback Breakdown */}
              <div className="bg-zinc-950/90 border border-zinc-800/90 p-4 rounded-xl space-y-3">
                
                {/* Mistake Callout */}
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Identified Anti-Pattern</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pl-5">
                    Response over-emphasized stress and interpersonal tension rather than engineering mitigation steps and technical trade-offs.
                  </p>
                </div>

                <div className="h-[1px] bg-zinc-900 w-full" />

                {/* Recommended Resolution */}
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Recommended STAR Structuring</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed pl-5">
                    Frame the constraint immediately, articulate sprint prioritization decisions, and conclude with quantifiable uptime or delivery metrics.
                  </p>
                </div>

              </div>

            </div>

            {/* Right Metrics & Telemetry Column (5 Cols) */}
            <div className="md:col-span-5 flex flex-col justify-between gap-3 font-sans">
              
              {/* Overall Score Node */}
              <div className="bg-zinc-950/90 border border-zinc-800/90 p-5 rounded-xl text-center flex-1 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-500/60" />
                </div>
                
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Aggregated Score
                </span>

                <div className="flex items-baseline justify-center gap-1 my-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">85</span>
                  <span className="text-sm font-mono text-zinc-500">/100</span>
                </div>

                <span className="text-[11px] font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-900/60 px-3 py-0.5 rounded-full font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Strong Pass Benchmark
                </span>
              </div>

              {/* Progress Gauges */}
              <div className="bg-zinc-950/90 border border-zinc-800/90 p-4 rounded-xl space-y-3.5">
                
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Clarity & STAR Delivery</span>
                    <span className="text-cyan-400 font-bold">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '88%' }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="h-full bg-cyan-400 rounded-full" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Domain Terminology</span>
                    <span className="text-indigo-400 font-bold">82%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </main>

      {/* Value Proposition Telemetry Strip */}
      <footer className="relative z-10 w-full border-t border-zinc-900 bg-black/90 backdrop-blur-md py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          
          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60 flex flex-col justify-between">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" /> 01. Real-Time
            </span>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-2">Instant Diagnostic Scores</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">Continuous audio & speech evaluation</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60 flex flex-col justify-between">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-cyan-400" /> 02. Detection
            </span>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-2">Mistake Auditing</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">Isolates non-technical filler answers</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60 flex flex-col justify-between">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3 h-3 text-cyan-400" /> 03. STAR Model
            </span>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-2">Automated Rewrites</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">Structural behavioral reframing</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60 flex flex-col justify-between">
            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-cyan-400" /> 04. Adaptive
            </span>
            <p className="text-xs sm:text-sm font-bold text-zinc-200 mt-2">Role Calibrated</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">Configured to company tech rubrics</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default React.memo(LandingPage);