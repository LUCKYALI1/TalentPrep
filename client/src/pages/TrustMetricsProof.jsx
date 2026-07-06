import React from 'react'
import { motion } from 'framer-motion'

const TrustMetricsProof = () => {
  // Stat Counter Configuration
  const metrics = [
    { value: "92%", label: "Avg ATS Match Gain", track: "Resume optimization lift" },
    { value: "140", label: "Target WPM Cadence", track: "Optimal articulation mark" },
    { value: "45k+", label: "Logic Loops Vetted", track: "Algorithmic paths tracked" },
    { value: "0ms", label: "Analysis Latency", track: "Real-time grading loop" }
  ];

  // Minimal Vetted Peer Review Testimonials
  const testimonials = [
    {
      quote: "The O(log N) runtime evaluation forced me to stop brute-forcing problems out loud. Spoke my way cleanly into a Tier-1 panel offer.",
      author: "Backend Lead Candidate",
      calibration: "ATS Score: 94%"
    },
    {
      quote: "Extremely calibrated pacing tracking. Getting flagged instantly for my filler word density completely restructured how I talk through microservices architecture.",
      author: "Systems Engineer",
      calibration: "Optimal WPM Maintained"
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
      {/* =========================================================
          SAVED CONTEXT: BACKGROUND GRID MATRIX & AMBIENT GLOW
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

      {/* Ambient Purple Backdrop Soft Glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* =========================================================
          CORE CONTENT WORKSPACE LAYER
         ========================================================= */}
      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-16">
        
        {/* 1. HEADER MODULE */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Calibration Metrics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Engineered for Vetted <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Enterprise Alignment
            </span>
          </h2>
          <p className="text-zinc-400 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            We don't deal in generic career suggestions. Our evaluation layers map your code accuracy and speech telemetry straight to elite technical frameworks.
          </p>
        </div>

        {/* 2. TELEMETRY AGGREGATE NUMBERS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {metrics.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#09090b]/90 border border-zinc-900/90 rounded-xl p-5 backdrop-blur-sm shadow-xl space-y-1"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-zinc-300">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                {stat.track}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. ASYMMETRIC PEER PROOF WORKSPACE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full">
          
          {testimonials.map((card, idx) => (
            <div 
              key={idx}
              className={`${
                idx === 0 ? 'md:col-span-7' : 'md:col-span-5'
              } bg-[#09090b]/90 border border-zinc-900/90 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-2xl relative group overflow-hidden`}
            >
              {/* Card top decorative pipeline tag */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 mb-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Verification Sequence 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/60 px-2 py-0.5 rounded">
                  {card.calibration}
                </span>
              </div>

              {/* Verified Text Block */}
              <p className="text-sm text-zinc-300 leading-relaxed italic flex-1 py-2">
                "{card.quote}"
              </p>

              {/* Author signature deck */}
              <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                  {card.author}
                </span>
                <span className="text-cyan-400 text-xs font-mono">◆ Vetted</span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default TrustMetricsProof