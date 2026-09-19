import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Gauge, 
  Users, 
  Zap, 
  CheckCircle2, 
  Quote, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

// Unified telemetry grid pattern
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px'
};

const METRICS = [
  { 
    value: "94%", 
    label: "ATS Pass Rate", 
    track: "CV Optimization Lift",
    icon: TrendingUp,
    accent: "text-cyan-400"
  },
  { 
    value: "140 WPM", 
    label: "Speech Cadence", 
    track: "Target Articulation Speed",
    icon: Gauge,
    accent: "text-sky-400"
  },
  { 
    value: "50k+", 
    label: "Sessions Evaluated", 
    track: "Mock Interviews Analyzed",
    icon: Users,
    accent: "text-indigo-400"
  },
  { 
    value: "<100ms", 
    label: "AI Feedback Latency", 
    track: "Real-Time Scoring Loop",
    icon: Zap,
    accent: "text-emerald-400"
  }
];

const TESTIMONIALS = [
  {
    quote: "The algorithmic runtime analysis forced me to stop rambling out loud. I structured my system design response cleanly and landed an offer at a Tier-1 tech company.",
    author: "Senior Backend Engineer",
    calibration: "ATS Score: 96%",
    tag: "Distributed Systems Track"
  },
  {
    quote: "Instant feedback on my filler word density completely transformed how I explain microservices. I gained full confidence in my pacing within three practice runs.",
    author: "Systems Architect Lead",
    calibration: "Optimal Speech Cadence",
    tag: "Audio Telemetry Audit"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};

function TrustMetricsProof() {
  return (
    <section className="relative w-full bg-black text-white flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none box-border">
      
      {/* Background Ambience & Lighting */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[min(100%,750px)] h-[320px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Content Layer */}
      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-400 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>Calibration Metrics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Engineered for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Enterprise Benchmarks
            </span>
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed font-normal">
            Our analysis engine maps response structure, domain keywords, and speech telemetry directly against real technical interview standards.
          </p>
        </motion.div>

        {/* Aggregate Metrics 4-Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full"
        >
          {METRICS.map((stat) => {
            const IconComponent = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl hover:border-zinc-700/90 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                    Telemetry
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-zinc-200">
                    {stat.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500 leading-snug">
                    {stat.track}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Peer Verification Asymmetric Testimonials */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch w-full"
        >
          {TESTIMONIALS.map((card, idx) => (
            <motion.div 
              key={card.author}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`${
                idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
              } bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-zinc-700 transition-all`}
            >
              {/* Background ambient accent */}
              <div className="absolute top-0 right-0 w-48 h-24 bg-cyan-500/5 blur-3xl pointer-events-none" />

              <div>
                {/* Card Header Bar */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 font-mono text-[10px] sm:text-[11px]">
                  <span className="text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Verified Candidate 0{idx + 1}
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-0.5 rounded-full font-medium">
                    {card.calibration}
                  </span>
                </div>

                {/* Quote Content */}
                <div className="relative py-1">
                  <Quote className="w-5 h-5 text-zinc-700/60 mb-2 rotate-180" />
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    "{card.quote}"
                  </p>
                </div>
              </div>

              {/* Author & Verification Tag Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors block">
                    {card.author}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {card.tag}
                  </span>
                </div>

                <span className="text-cyan-400 text-xs font-mono font-medium flex items-center gap-1 bg-cyan-950/30 border border-cyan-900/50 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Verified Pass</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default React.memo(TrustMetricsProof);