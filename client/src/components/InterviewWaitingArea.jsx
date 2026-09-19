import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Radio, 
  Activity, 
  ShieldCheck, 
  Layers, 
  Lock 
} from 'lucide-react';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px',
};

export default function InterviewWaitingArea() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);
  const questions = location.state?.questions || [];

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [questions]);

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 font-sans selection:bg-cyan-500/25 selection:text-cyan-200 box-border overflow-hidden">
      
      {/* Background Matrix & Directional Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,650px)] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 right-10 w-[350px] h-[250px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Top Subtle Status Signal */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>INITIALIZING_PIPELINE // STAGE_02</span>
        </div>
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>INFERENCE_ACTIVE</span>
        </span>
      </div>

      {/* Main Telemetry Console Container */}
      <motion.div 
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl bg-[#09090b]/95 border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden my-auto"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-zinc-950/90 border-b border-zinc-800/80 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-zinc-600 text-xs ml-1.5">/</span>
            <span className="text-zinc-400 text-[11px]">terminal-allocator.sh</span>
          </div>

          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
            ID: {String(id || 'SYS-001').slice(-6)}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 text-center flex flex-col items-center space-y-6">
          
          {/* Diagnostic Radar / Pulse Indicator */}
          <div className="relative flex items-center justify-center my-2">
            {!isReady ? (
              <div className="relative w-20 h-20 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-ping opacity-75" />
                <span className="absolute inset-2 rounded-full border border-cyan-400/40 animate-pulse" />
                <div className="w-20 h-20 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                <Cpu className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="w-20 h-20 rounded-full bg-emerald-950/40 border border-emerald-500/60 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] relative"
              >
                <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-50 pointer-events-none" />
                <CheckCircle2 className="w-9 h-9" />
              </motion.div>
            )}
          </div>

          {/* Heading & Contextual Copy */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {!isReady ? 'Synthesizing Interview Resources...' : 'Interview Session Compiled!'}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-normal">
              {!isReady
                ? 'Gemini AI is analyzing your role profile, experience level, and domain stack to calibrate real-time STAR scoring criteria.'
                : 'Questions calibrated, speech-to-text pipeline armed, and deterministic scoring rubrics ready for execution.'}
            </p>
          </div>

          {/* Real-Time Telemetry Pipeline Checklist */}
          <div className="w-full text-left bg-zinc-950/80 p-4 sm:p-5 rounded-xl border border-zinc-900 space-y-3 text-xs font-mono">
            
            {/* Step 1 */}
            <div className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Profile & Tech Stack Calibrated</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-900/50 px-2 py-0.5 rounded">
                VALIDATED
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center gap-2.5">
                {isReady ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  </span>
                )}
                <span className={!isReady ? 'text-amber-300' : ''}>
                  Scenario Matrix & Question Synthesis
                </span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                isReady 
                  ? 'text-emerald-400 bg-emerald-950/50 border-emerald-900/50' 
                  : 'text-amber-400 bg-amber-950/50 border-amber-900/50'
              }`}>
                {isReady ? 'READY' : 'GENERATING'}
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center gap-2.5">
                {isReady ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  </span>
                )}
                <span className={!isReady ? 'text-zinc-500' : ''}>
                  Audio Terminal & Speech Recognition
                </span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                isReady 
                  ? 'text-emerald-400 bg-emerald-950/50 border-emerald-900/50' 
                  : 'text-zinc-600 bg-zinc-900 border-zinc-800'
              }`}>
                {isReady ? 'ARMED' : 'STANDBY'}
              </span>
            </div>

          </div>

          {/* Primary Action Button */}
          <button
            disabled={!isReady}
            onClick={() => navigate(`/interview/terminal/${id}`, { state: { questions } })}
            className={`w-full min-h-[48px] py-3.5 px-6 rounded-xl font-mono font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 ${
              isReady
                ? 'bg-cyan-400 hover:bg-cyan-300 text-black cursor-pointer shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] active:scale-95'
                : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800/80'
            }`}
          >
            {isReady ? (
              <span className="flex items-center gap-2">
                <span>ENTER INTERVIEW TERMINAL</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              <span className="flex items-center gap-2 font-mono">
                <span className="w-3.5 h-3.5 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin" />
                <span>CALIBRATING_PROMPTS...</span>
              </span>
            )}
          </button>

        </div>
      </motion.div>

      {/* Bottom Security & Architecture Signals */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-500 pb-4">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ephemeral Audio Memory</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Target Cadence: 140 WPM</span>
          <span className="text-zinc-700">•</span>
          <span>STAR Model Enforced</span>
        </div>
      </div>

    </div>
  );
}