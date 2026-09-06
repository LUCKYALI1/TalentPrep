import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 text-center relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full bg-[#09090b] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">

        <div className="mb-6 flex justify-center">
          {!isReady ? (
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 text-emerald-400 flex items-center justify-center text-2xl font-bold border border-emerald-800/50 shadow-lg shadow-emerald-500/10">
              ✓
            </div>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
          {!isReady ? 'Preparing AI Interview Resources...' : 'Session Ready!'}
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed max-w-md mx-auto">
          {!isReady
            ? 'Gemini AI is analyzing your profile, tech stack, and experience to generate personalized technical questions.'
            : 'Your questions and audio terminal environments have been initialized.'}
        </p>

        <div className="text-left bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 mb-6 space-y-2.5 text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓</span> Profile & Tech Stack Configured
          </div>
          <div className={`flex items-center gap-2 ${isReady ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
            <span>{isReady ? '✓' : '●'}</span> AI Context & Question Generation
          </div>
          <div className={`flex items-center gap-2 ${isReady ? 'text-emerald-400' : 'text-zinc-600'}`}>
            <span>{isReady ? '✓' : '○'}</span> Audio Terminal & Speech Engine Ready
          </div>
        </div>

        <button
          disabled={!isReady}
          onClick={() => navigate(`/interview/terminal/${id}`, { state: { questions } })}
          className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${isReady
              ? 'bg-cyan-400 hover:bg-cyan-300 text-zinc-950 cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-[0.99]'
              : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
            }`}
        >
          {isReady ? 'Enter Interview Terminal →' : 'Gathering Resources...'}
        </button>
      </div>
    </div>
  );
}