import React from 'react';
import { motion } from 'framer-motion';

// Static background pattern inline style
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #27272a 1px, transparent 1px),
    linear-gradient(to bottom, #27272a 1px, transparent 1px)
  `,
  backgroundSize: "36px 36px"
};

// Static Data Definitions
const METRICS = [
  { value: "94%", label: "ATS Pass Rate", track: "CV Optimization Lift" },
  { value: "140 WPM", label: "Speech Cadence", track: "Target Articulation Speed" },
  { value: "50k+", label: "Sessions Evaluated", track: "Mock Interviews Analyzed" },
  { value: "<100ms", label: "AI Feedback Latency", track: "Real-Time Scoring Loop" }
];

const TESTIMONIALS = [
  {
    quote: "The algorithmic runtime analysis forced me to stop rambling out loud. I structured my system design response cleanly and landed an offer at a Tier-1 tech company.",
    author: "Senior Backend Engineer",
    calibration: "ATS Score: 96%"
  },
  {
    quote: "Instant feedback on my filler word density completely transformed how I explain microservices. I gained full confidence in my pacing within three practice runs.",
    author: "Systems Architect Lead",
    calibration: "Optimal Speech Cadence"
  }
];

// Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function TrustMetricsProof() {
  return (
    <section className="relative w-full bg-black text-white flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
      {/* Background Matrix & Radial Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Content Layer */}
      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-16">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Calibration Metrics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Engineered for <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Enterprise Benchmarks
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-md mx-auto leading-relaxed">
            Our analysis engine maps response structure, domain keywords, and speech telemetry directly against real technical interview standards.
          </p>
        </motion.div>

        {/* Aggregate Metrics Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        >
          {METRICS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#09090b] border border-zinc-800/80 rounded-xl p-5 backdrop-blur-md shadow-xl space-y-1 hover:border-zinc-700 transition-colors"
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
        </motion.div>

        {/* Peer Verification Asymmetric Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full"
        >
          {TESTIMONIALS.map((card, idx) => (
            <motion.div 
              key={card.author}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`${
                idx === 0 ? 'md:col-span-7' : 'md:col-span-5'
              } bg-[#09090b] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md shadow-2xl relative group hover:border-zinc-700 transition-colors`}
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Verified Candidate 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded-full font-medium">
                  {card.calibration}
                </span>
              </div>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic flex-1 py-2">
                "{card.quote}"
              </p>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  {card.author}
                </span>
                <span className="text-cyan-400 text-xs font-mono font-medium">◆ Verified Pass</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default React.memo(TrustMetricsProof);