import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfigureInterview from '../components/ConfigureInterview';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #27272a 1px, transparent 1px),
    linear-gradient(to bottom, #27272a 1px, transparent 1px)
  `,
  backgroundSize: '36px 36px',
};

export default function AIInterview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    console.log('AI Interview Form Data:', formData);

    // Dynamic API submission logic can be connected here
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050507] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Background Ambient FX */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none fixed"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ================= SECTION 1: HERO & PREVIEW ================= */}
      <section className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-16 flex flex-col items-center text-center">

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

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1] max-w-4xl"
        >
          Ace Your Next Interview with <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Smart AI Feedback
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed"
        >
          Practice role-specific mock interviews. Receive real-time scoring, target your exact response mistakes, and master STAR-formatted answers.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 duration-200 cursor-pointer"
          >
            Start Free AI Interview
          </button>
          <a
            href="#process-section"
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-medium text-xs sm:text-sm rounded-xl border border-zinc-800 transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center"
          >
            How Evaluation Works ↓
          </a>
        </motion.div>

        {/* Live Evaluation Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 w-full max-w-3xl bg-[#09090b] border border-zinc-800/90 rounded-2xl p-4 sm:p-6 text-left shadow-2xl font-mono"
        >
          <div className="flex items-center justify-between border-b border-zinc-800/70 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="text-xs text-zinc-500 ml-2">talentprep.ai/evaluation-report</span>
            </div>
            <span className="text-[11px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
              AI Evaluation Complete
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 space-y-3">
              <div className="bg-zinc-950/80 border border-zinc-900 p-3.5 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Target Question</span>
                <p className="text-xs text-zinc-200 font-sans font-medium">"Tell me about a time you handled a tight project deadline under pressure."</p>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-900 p-3.5 rounded-xl space-y-1.5">
                <div className="text-[10px] text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>▲</span> Identified Mistake
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Your response focused heavily on stress rather than explicit problem-solving steps.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 bg-zinc-950/80 border border-zinc-900 p-4 rounded-xl text-center flex flex-col justify-center items-center space-y-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Interview Score</span>
              <div className="text-4xl font-extrabold text-emerald-400 font-sans">
                85<span className="text-xs text-zinc-500 font-normal">/100</span>
              </div>
              <span className="text-[10px] font-sans bg-emerald-950/60 text-emerald-400 border border-emerald-900/50 px-3 py-0.5 rounded-full font-semibold">
                Strong Pass
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 2: WORKFLOW & DETAILED STEP CARDS ================= */}
      <section id="process-section" className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900 space-y-12">

        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-800/40 bg-cyan-950/20 text-[11px] text-cyan-400 font-mono">
            4-Step Evaluation Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How TalentPrep Assesses Your Answers
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            From session initiation to diagnostic scoring, our system analyzes your responses through a 4-phase evaluation engine.
          </p>
        </div>

        {/* 4 Detailed Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 1 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 rounded-2xl space-y-4 hover:border-zinc-700/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-900/60 px-3 py-1 rounded-lg">
                Step 01
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Configuration</span>
            </div>
            <h3 className="text-base font-bold text-zinc-100">Role & Context Setup</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              You specify your target job position, level (Junior, Mid, Senior), and key domain skills. The AI calibrates interview questions matched strictly to industry standards.
            </p>
            <div className="pt-2 border-t border-zinc-900/80 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="text-cyan-400">►</span> Dynamic Question Generation
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 rounded-2xl space-y-4 hover:border-zinc-700/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-900/60 px-3 py-1 rounded-lg">
                Step 02
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Analysis</span>
            </div>
            <h3 className="text-base font-bold text-zinc-100">STAR Structure Audit</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Your response transcript is parsed for standard behavioral components: <strong className="text-zinc-200 font-medium">Situation</strong>, <strong className="text-zinc-200 font-medium">Task</strong>, <strong className="text-zinc-200 font-medium">Action</strong>, and <strong className="text-zinc-200 font-medium">Result</strong>. Missing sections are flagged instantly.
            </p>
            <div className="pt-2 border-t border-zinc-900/80 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="text-cyan-400">►</span> Behavioral Framework Auditing
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 rounded-2xl space-y-4 hover:border-zinc-700/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-900/60 px-3 py-1 rounded-lg">
                Step 03
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Diagnostics</span>
            </div>
            <h3 className="text-base font-bold text-zinc-100">Mistake & Anti-Pattern Detection</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              The engine isolates flaws such as unquantified achievements, generic hand-waving, emotional tone without execution details, or missing domain key phrases.
            </p>
            <div className="pt-2 border-t border-zinc-900/80 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="text-amber-400">▲</span> Targeted Weakness Pinpointing
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 rounded-2xl space-y-4 hover:border-zinc-700/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-900/60 px-3 py-1 rounded-lg">
                Step 04
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Output</span>
            </div>
            <h3 className="text-base font-bold text-zinc-100">Score & STAR Reframing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Receive a comprehensive score out of 100, sub-metric performance bars, and an AI-rewritten version showing how your exact answer should be structured for maximum impact.
            </p>
            <div className="pt-2 border-t border-zinc-900/80 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="text-emerald-400">★</span> Model Answer Generation
            </div>
          </div>

        </div>

        {/* Scoring Breakdown Bar */}
        <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h3 className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
              Score Calculation Weights
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">Total: 100 Points</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>STAR Framework Completeness</span>
                <span className="text-cyan-400 font-semibold">35 Points</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-cyan-400 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Problem Solving & Measurable Metrics</span>
                <span className="text-blue-400 font-semibold">30 Points</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-[30%] bg-blue-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Clarity & Technical Depth</span>
                <span className="text-indigo-400 font-semibold">20 Points</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-[20%] bg-indigo-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Domain Keywords & Terminology</span>
                <span className="text-emerald-400 font-semibold">15 Points</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-zinc-900 bg-black/80 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left font-mono">
          <div>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider">01. Real-Time</p>
            <p className="text-xs font-semibold text-zinc-300 mt-0.5">Instant Scoring</p>
          </div>
          <div>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider">02. Detection</p>
            <p className="text-xs font-semibold text-zinc-300 mt-0.5">Mistake Auditing</p>
          </div>
          <div>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider">03. Framework</p>
            <p className="text-xs font-semibold text-zinc-300 mt-0.5">STAR Insights</p>
          </div>
          <div>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider">04. Scenarios</p>
            <p className="text-xs font-semibold text-zinc-300 mt-0.5">Role Tailored</p>
          </div>
        </div>
      </footer>

      {/* ================= DIALOG BOX / MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-xl bg-[#09090b] border border-zinc-800/90 rounded-2xl p-6 shadow-2xl space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Configure AI Mock Session</h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Fill details to personalize your evaluation</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="text-zinc-500 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Form Integration */}
              <ConfigureInterview onSubmit={handleFormSubmit} isSubmitting={isSubmitting} className='w-full' />

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}