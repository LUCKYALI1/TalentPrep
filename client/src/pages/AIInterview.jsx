import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  SlidersHorizontal, 
  Layers, 
  AlertTriangle, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  X, 
  BarChart3,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import ConfigureInterview from '../components/ConfigureInterview';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px',
};

const PROCESS_STEPS = [
  {
    step: "Step 01",
    phase: "Configuration",
    title: "Role & Context Calibration",
    description: "Specify your target job role, seniority tier (Junior through Staff), and domain competencies. The inference engine generates rigorous prompts mapped to verified company rubrics.",
    tag: "Dynamic Scenario Generation",
    icon: SlidersHorizontal,
    accent: "text-cyan-400",
    borderGlow: "group-hover:border-cyan-500/40"
  },
  {
    step: "Step 02",
    phase: "Deconstruction",
    title: "STAR Structural Parsing",
    description: "Your verbal transcript is audited against the STAR model: Situation, Task, Action, and Result. Vagueness, missing metrics, or rambling timelines are flagged in real time.",
    tag: "Behavioral Framework Audit",
    icon: Layers,
    accent: "text-sky-400",
    borderGlow: "group-hover:border-sky-500/40"
  },
  {
    step: "Step 03",
    phase: "Diagnostics",
    title: "Anti-Pattern & Flaw Detection",
    description: "The engine isolates unquantified claims, passive ownership language, non-technical filler words, and omissions of crucial architectural constraints.",
    tag: "Targeted Weakness Pinpointing",
    icon: AlertTriangle,
    accent: "text-amber-400",
    borderGlow: "group-hover:border-amber-500/40"
  },
  {
    step: "Step 04",
    phase: "Synthesis",
    title: "Score & Model Answer Reframing",
    description: "Receive an empirical score out of 100 with sub-metric gauges, accompanied by an AI-rewritten demonstration of your exact answer transformed into executive-ready STAR delivery.",
    tag: "STAR Model Answer Generation",
    icon: Trophy,
    accent: "text-emerald-400",
    borderGlow: "group-hover:border-emerald-500/40"
  }
];

const WEIGHT_METRICS = [
  { label: "STAR Framework Completeness", points: "35 Points", width: "35%", color: "bg-cyan-400" },
  { label: "Problem Solving & Measurable Metrics", points: "30 Points", width: "30%", color: "bg-sky-400" },
  { label: "Clarity & Technical Depth", points: "20 Points", width: "20%", color: "bg-indigo-400" },
  { label: "Domain Keywords & Terminology", points: "15 Points", width: "15%", color: "bg-emerald-400" }
];

export default function AIInterview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    console.log('AI Interview Form Data:', formData);

    // Dynamic API submission hook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white overflow-x-hidden font-sans selection:bg-cyan-500/25 selection:text-cyan-200 box-border">

      {/* Background Matrix & Directional Glow */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,800px)] h-[380px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[-10%] w-[450px] h-[300px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ================= SECTION 1: HERO & LIVE HUD PREVIEW ================= */}
      <section className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20 flex flex-col items-center text-center">

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
          className="mt-5 text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-normal"
        >
          Practice role-specific mock interviews. Receive real-time scoring, target your exact response mistakes, and master STAR-formatted answers.
        </motion.p>

        {/* Action Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-black shrink-0" />
            <span>Start Free AI Interview</span>
          </button>
          
          <a
            href="#process-section"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <span>How Evaluation Works</span>
            <span className="text-zinc-500">↓</span>
          </a>
        </motion.div>

        {/* Live Evaluation Preview HUD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-12 sm:mt-14 w-full max-w-4xl bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-6 text-left shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-72 h-36 bg-cyan-500/5 blur-[80px] pointer-events-none" />

          {/* Window Bar */}
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

            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-cyan-400 bg-cyan-950/50 border border-cyan-900/60 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              AI Evaluation Complete
            </span>
          </div>

          {/* Card Telemetry Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="md:col-span-8 space-y-3 font-sans">
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

              <div className="bg-zinc-950/90 border border-zinc-800/90 p-4 rounded-xl space-y-2">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Identified Anti-Pattern</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-5">
                  Your response focused heavily on stress rather than explicit problem-solving steps.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bg-zinc-950/90 border border-zinc-800/90 p-5 rounded-xl text-center flex flex-col justify-center items-center relative overflow-hidden font-sans">
              <div className="absolute top-2 right-2">
                <Activity className="w-3.5 h-3.5 text-emerald-500/60" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Interview Score
              </span>
              <div className="flex items-baseline justify-center gap-1 my-1">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">85</span>
                <span className="text-xs font-mono text-zinc-500">/100</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-900/60 px-3 py-0.5 rounded-full font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Strong Pass
              </span>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 2: WORKFLOW & DETAILED STEP CARDS ================= */}
      <section id="process-section" className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-zinc-900/90 space-y-12 sm:space-y-16">

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-400 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>4-STEP_EVALUATION_ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
            How TalentPrep Assesses Your Answers
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            From session initiation to diagnostic scoring, our system analyzes your responses through a 4-phase telemetry engine.
          </p>
        </div>

        {/* 4 Detailed Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PROCESS_STEPS.map((step) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.step}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-zinc-700/90 transition-all backdrop-blur-xl flex flex-col justify-between relative overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 group-hover:text-cyan-400 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-900/60 px-2.5 py-1 rounded-lg">
                        {step.step}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <span className={step.accent}>►</span>
                  <span>{step.tag}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scoring Breakdown HUD Card */}
        <div className="bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-mono text-zinc-200 font-bold uppercase tracking-wider">
                Score Calculation Weights
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/60 px-3 py-0.5 rounded-full self-start sm:self-auto">
              Total Weight: 100 Points
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {WEIGHT_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <div className="flex justify-between text-zinc-300 text-[11px] sm:text-xs">
                  <span>{metric.label}</span>
                  <span className="font-bold text-white">{metric.points}</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: metric.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full ${metric.color} rounded-full`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Telemetry Value Bar */}
      <footer className="relative z-10 w-full border-t border-zinc-900 bg-black/90 backdrop-blur-md py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono">
          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60">
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" /> 01. Real-Time
            </p>
            <p className="text-xs font-semibold text-zinc-200 mt-1">Instant Scoring</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60">
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> 02. Detection
            </p>
            <p className="text-xs font-semibold text-zinc-200 mt-1">Mistake Auditing</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60">
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3 h-3 text-cyan-400" /> 03. Framework
            </p>
            <p className="text-xs font-semibold text-zinc-200 mt-1">STAR Insights</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-900/60">
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-cyan-400" /> 04. Adaptive
            </p>
            <p className="text-xs font-semibold text-zinc-200 mt-1">Role Tailored</p>
          </div>
        </div>
      </footer>

      {/* ================= CALIBRATOR POPUP MODAL DIALOG ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">

            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Shell: Responsive Widescreen Viewport */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 w-full max-w-5xl my-auto bg-[#09090b] border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col"
            >
              {/* Modal Top Control Bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-zinc-950 border-b border-zinc-800/80 shrink-0">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-mono tracking-tight">
                      CONFIGURE_INTERVIEW_PIPELINE
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-zinc-500 font-mono">
                      Personalize scenario calibration & model evaluation criteria
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Form Viewport Container */}
              <div className="overflow-y-auto p-1 sm:p-2">
                <ConfigureInterview 
                  onSubmit={handleFormSubmit} 
                  isSubmitting={isSubmitting} 
                />
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}