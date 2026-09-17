import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Terminal, 
  BrainCircuit, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

const gridBackgroundStyle = {
  backgroundImage: `radial-gradient(circle at 1px 1px, #27272a 1px, transparent 0)`,
  backgroundSize: '24px 24px'
};

const STEPS = [
  {
    id: "01",
    tag: "INGESTION & TARGETING",
    title: "Resume Ingestion & Role Calibration",
    desc: "Parse your active resume against industry job rubrics. The system auto-extracts technical keywords and adjusts difficulty across behavioral and system design tracks.",
    icon: FileText,
    href: "/services/ats",
    actionText: "Calibrate Role Rubric",
    telemetry: "ATS Match Engine v2.4",
    features: ["Keyword Gap Analysis", "Experience Level Profiling", "ATS Format Scoring"]
  },
  {
    id: "02",
    tag: "LIVE RUNTIME SIMULATION",
    title: "Real-Time Terminal Simulation",
    desc: "Engage in voice-enabled interview rounds. The terminal captures conversational nuance, structural answer pacing, and technical precision through browser speech telemetry.",
    icon: Terminal,
    href: "/interview/configure",
    actionText: "Launch Mock Session",
    telemetry: "Speech-to-Text Runtime",
    features: ["Real-Time Transcription", "Edge-Case Challenge Prompts", "Voice Synthesis Playback"]
  },
  {
    id: "03",
    tag: "AUDIT & TELEMETRY",
    title: "Deterministic AI Diagnostics",
    desc: "Receive structured telemetry reports. Inspect phrase-by-phrase feedback, detect logic flaws, and review benchmark responses aligned with the STAR framework.",
    icon: BrainCircuit,
    href: "/dashboard",
    actionText: "Inspect Report Telemetry",
    telemetry: "Gemini STAR Pipeline",
    features: ["STAR Framework Audits", "Ideal Benchmark Solutions", "Confidence & Clarity Metrics"]
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 }
};

function WhyChoose() {
  return (
    <section className="relative w-full bg-black py-20 sm:py-28 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 overflow-hidden select-none font-sans">
      
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Engine Pipeline Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Three stages. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Zero arbitrary feedback.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
            Deterministic evaluations built for software engineers. Benchmark your real spoken answers against senior industry expectations.
          </p>
        </div>

        {/* 3-Step Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <motion.div 
                key={step.id}
                variants={cardVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-2xl border border-zinc-800/70 bg-[#09090b]/80 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md transition-all duration-200 hover:border-zinc-700 hover:bg-[#0c0c0e]"
              >
                {/* Header Meta */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-900/80 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        {step.tag}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-md">
                      {step.id}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Tech Metrics & Link Button */}
                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  {/* Micro Signals */}
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {step.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        <span className="text-cyan-400 text-[9px]">✦</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Trigger Link */}
                  <Link
                    to={step.href}
                    className="w-full mt-2 pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono text-zinc-400 hover:text-white transition-colors group/link cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      {step.actionText}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover/link:text-cyan-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* System Bar Footer */}
        <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GDPR & Privacy Compliant • Audio & Video Transcripts Never Used For Model Training</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-zinc-300 transition underline underline-offset-2">
              System Architecture Specs →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default React.memo(WhyChoose);