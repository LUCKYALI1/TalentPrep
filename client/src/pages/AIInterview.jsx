import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import InterviewForm from '../components/InterviewForm'

const AIInterview = () => {
  const navigate = useNavigate()
  const [isScheduled, setIsScheduled] = useState(false)
  const [showConsoleTerminal, setShowConsoleTerminal] = useState(false)
  const [metaDetails, setMetaDetails] = useState(null)

  // 🛡️ Prevent page body scrolling behind modal layers when ANY overlay terminal is active
  useEffect(() => {
    if (showConsoleTerminal || isScheduled) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [showConsoleTerminal, isScheduled])

  const handleLaunchClick = () => {
    setShowConsoleTerminal(true)
  }

  const handleScheduleSuccess = (data) => {
    setMetaDetails(data)
    setShowConsoleTerminal(false) // Step 1 form wale modal ko band karo
    setIsScheduled(true) // Step 2 success metrics wale modal ko open karo
  }

  const handleCloseFormModal = () => {
    setShowConsoleTerminal(false)
  }

  const handleLaunchTerminalInstance = () => {
    setIsScheduled(false) // Overlay resets safely
    navigate('/services/interview/terminal') // Clean redirection redirection node path to new dashboard
  }

  return (
    <div className="w-full min-h-screen bg-black text-white bg-grid-pattern relative overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* 🌌 Cyber Ambient Blur Shields */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Structural Page Flow Remaining Safe & Untouched */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-32 pb-32">
        
        {/* ========================================================================= */}
        {/* PAGE 1: HERO CONTAINER CONTROL INTERFACE                                  */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">System Active // Container_v1.5.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-mono tracking-tight uppercase leading-[0.95] text-white">
              Simulate Realtime <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                AI Tech Interviews
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
              Bypass static evaluation metrics. Engage with an adaptive intelligence engine calibrated to monitor real-time semantic execution, stack fluency, and live technical behavioral arrays.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button 
                onClick={handleLaunchClick}
                className="px-6 py-3 bg-cyan-400 text-black font-mono text-xs font-black uppercase tracking-wider rounded-xl hover:bg-cyan-300 transition-all shadow-[4px_4px_0px_0px_rgba(6,182,212,0.25)] hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[0px] active:translate-x-[0px] active:shadow-none cursor-pointer text-center"
              >
                [LAUNCH SCHEDULER MATRIX ⚡]
              </button>
            </div>
          </div>

          {/* Right Graphical Viewport Frame */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="w-full max-w-[400px] aspect-square bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-40 h-40 border border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                  <div className="w-28 h-28 border border-zinc-700 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-ping" />
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
                  </div>
                </div>
              </div>
              <div className="bg-black/50 border border-zinc-900 rounded-xl p-3 font-mono text-[9px] text-zinc-500 text-left">
                <p className="text-cyan-400 font-bold">$ npm run initialize:ai-evaluator</p>
                <p className="text-zinc-600">&gt; Parsing global configuration modules...</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PAGE 2: CORE FLOW CALCULATION TELEMETRY ARCHITECTURE                    */}
        {/* ========================================================================= */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black font-mono uppercase tracking-wide text-zinc-200">[ENGINE_COMPUTATION_FLOW]</h2>
            <p className="text-xs text-zinc-500 font-mono">Real-time compilation pipeline flow parameters for technical evaluation instances.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { step: '01', title: 'MATRIX REGISTRATION', value: 'Parameters matched from domain vectors', desc: 'System parses target skill sets, domain configurations, and selected company constraints into prompt arrays.' },
              { step: '02', title: 'LIVE STREAM EVAL', value: 'Adaptive dialogue rendering engine', desc: 'AI dynamically tracks syntax errors, code complexity thresholds, and response patterns real-time.' },
              { step: '03', title: 'ANALYTICS SYNC', value: 'Deep structural reports output', desc: 'Generates thorough analytics matrix mapping logic structures, stack knowledge gaps, and confidence scores.' }
            ].map((node, index) => (
              <div key={index} className="bg-[#09090b]/60 border border-zinc-900 rounded-2xl p-6 space-y-4 shadow-xl backdrop-blur-sm relative group hover:border-zinc-700 transition-colors">
                <div className="absolute top-4 right-5 font-mono text-3xl font-black text-zinc-900 group-hover:text-cyan-950/40 transition-colors select-none">{node.step}</div>
                <div className="h-6 w-6 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold">L{index+1}</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold font-mono text-white tracking-wide uppercase">{node.title}</h3>
                  <p className="text-[10px] text-cyan-500 font-mono">{node.value}</p>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{node.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 🚀 OVERLAY MODAL 1: SCHEDULER SYSTEM INPUT FORM (CENTERED AT TOP)         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showConsoleTerminal && !isScheduled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-lg flex justify-center items-start pt-16 sm:pt-24 px-4 pb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-2xl relative space-y-4"
            >
              <div className="w-full flex justify-end items-center pr-2">
                <button 
                  onClick={handleCloseFormModal}
                  className="text-zinc-500 hover:text-white font-mono text-[10px] tracking-widest uppercase bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  [Esc // CLOSE ×]
                </button>
              </div>

              <div className="text-center space-y-2 pb-2">
                <h2 className="text-xl sm:text-2xl font-black font-mono uppercase tracking-wide text-white">
                  [CONFIG_SCHEDULER_TERMINAL]
                </h2>
                <p className="text-[11px] text-zinc-500 font-mono max-w-xs mx-auto">
                  Inject configuration matrix flags into the local container compiler framework below.
                </p>
              </div>

              <InterviewForm onSuccess={handleScheduleSuccess} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ⚡ OVERLAY MODAL 2: TELEMETRY INGESTION ACTIVE STATUS DISPLAY (CENTER TOP) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isScheduled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-lg flex justify-center items-start pt-16 sm:pt-24 px-4 pb-12"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-4xl bg-[#09090b] border border-zinc-900 rounded-3xl p-8 shadow-2xl space-y-8 text-left font-mono relative mt-4"
            >
              {/* Dynamic Status Tube Header Section */}
              <div className="w-full bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-400 text-black uppercase tracking-wider animate-pulse">
                    ● Live Container Active
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">SIMULATION CONTAINER INGESTION LOCKED</h2>
                  <p className="text-xs text-zinc-400">
                    Target Environment initialized for <span className="text-cyan-400 font-bold">{metaDetails?.jobRole || 'MERN Full-Stack Developer'}</span>
                  </p>
                </div>
                
                {/* 🔒 Redirection Node Trigger Control */}
                <button 
                  onClick={handleLaunchTerminalInstance}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all cursor-pointer shadow-md shrink-0"
                >
                  Launch Engine Terminal ⚡
                </button>
              </div>

              {/* Specs & Configuration Metrics Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* System Metrics Node */}
                <div className="md:col-span-1 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4 text-xs">
                  <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-wider border-b border-zinc-900 pb-2">[SYSTEM_METRICS]</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-zinc-600 text-[10px] uppercase">Evaluation Target</p>
                      <p className="text-zinc-300 font-bold mt-0.5">{metaDetails?.companyTier || 'Tier 2 (High-Growth Startups)'}</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 text-[10px] uppercase">Execution Pipeline</p>
                      <p className="text-cyan-400 font-bold mt-0.5">{metaDetails?.slottedDate || '2026-07-19'} @ {metaDetails?.slottedTime || '19:01'}</p>
                    </div>
                  </div>
                </div>

                {/* Critical Platform Guidelines */}
                <div className="md:col-span-2 bg-zinc-950 border border-zinc-900 rounded-2xl p-5 space-y-4 text-xs text-zinc-400 font-sans">
                  <h3 className="font-mono text-xs font-bold uppercase text-zinc-500 tracking-wider border-b border-zinc-900 pb-2">[CRITICAL_INSTRUCTIONS]</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2.5"><span className="text-cyan-400 font-mono font-bold">[01]</span> Ensure audio capture pipelines are active before launching.</li>
                    <li className="flex items-start gap-2.5"><span className="text-cyan-400 font-mono font-bold">[02]</span> Leaving terminal canvas layout bounds will flag session state logs.</li>
                  </ul>
                </div>

              </div>

              {/* Bottom Reset Control Option */}
              <div className="text-center pt-2">
                <button 
                  onClick={() => setIsScheduled(false)}
                  className="font-mono text-[10px] uppercase text-zinc-600 hover:text-red-400 tracking-widest transition-colors cursor-pointer"
                >
                  [× DESTROY ENGINE INSTANCE // RESET ENTIRE SCREEN]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AIInterview;