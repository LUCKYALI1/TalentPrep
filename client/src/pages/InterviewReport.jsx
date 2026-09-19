import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Code2,
  Calendar,
  Sparkles,
  Building2,
  ArrowLeft,
  Terminal,
  Activity,
  ShieldCheck,
  Layers,
  FileText,
  Quote,
  Cpu,
  BarChart3
} from 'lucide-react';
import api from '../utils/api';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px',
};

export default function InterviewReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/interview/${id}`);
        setInterview(res.data?.interview || res.data);
      } catch (err) {
        console.error('Failed to fetch interview details:', err);
        setError(err.response?.data?.message || 'Could not load interview session details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const evaluation = interview?.evaluation || {};
  const score = evaluation.overallScorePercentage ?? evaluation.overallScore ?? 0;
  const evaluationsList = evaluation.evaluations || [];

  const getScoreVerdict = (val) => {
    if (val >= 80) return { label: 'Strong Pass', color: 'text-emerald-400', bg: 'bg-emerald-950/50 border-emerald-800/60 text-emerald-400' };
    if (val >= 60) return { label: 'Conditional Pass', color: 'text-cyan-400', bg: 'bg-cyan-950/50 border-cyan-800/60 text-cyan-400' };
    return { label: 'Requires Revision', color: 'text-amber-400', bg: 'bg-amber-950/50 border-amber-800/60 text-amber-400' };
  };

  const verdict = getScoreVerdict(score);

  if (loading) {
    return (
      <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-center font-sans box-border overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={gridBackgroundStyle} />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
          <div className="relative">
            <span className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin block" />
            <Terminal className="w-5 h-5 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="space-y-1 font-mono">
            <p className="text-xs sm:text-sm text-zinc-200 tracking-wider">COMPILING_TELEMETRY_AUDIT...</p>
            <p className="text-[11px] text-zinc-500">Synthesizing STAR rubric scoring & transcript markers</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans box-border overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={gridBackgroundStyle} />
        <div className="relative z-10 max-w-md w-full bg-[#09090b]/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl backdrop-blur-xl">
          <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-900/60 text-red-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white">Diagnostic Report Unavailable</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              {error || 'The requested interview session record could not be located in the ledger.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full min-h-[44px] px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Session Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white flex flex-col justify-between font-sans selection:bg-cyan-500/25 selection:text-cyan-200 box-border overflow-x-hidden pt-20 pb-16">
      
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed" style={gridBackgroundStyle} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,850px)] h-[380px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 right-[-5%] w-[450px] h-[300px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Control Bar & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>RETURN_TO_DASHBOARD</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                OFFICIAL_AUDIT_REPORT
              </span>
              <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {interview.createdAt ? new Date(interview.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {interview.targetRole || 'Technical Interview Session'}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1 font-mono">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  {interview.targetCompany || 'Standard Industry Benchmark'}
                </span>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-300">{interview.experienceLevel}</span>
              </div>
            </div>
          </div>

          {/* Aggregated Score Badge */}
          <div className="bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 text-left sm:text-right shadow-2xl backdrop-blur-xl flex sm:flex-col justify-between items-center sm:items-end gap-3 shrink-0">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Aggregated Score</p>
              <div className="flex items-baseline gap-1 my-0.5">
                <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${verdict.color}`}>
                  {score}
                </span>
                <span className="text-xs font-mono text-zinc-500">/100</span>
              </div>
            </div>
            <span className={`text-[10px] sm:text-[11px] font-mono font-semibold px-3 py-1 rounded-full border ${verdict.bg}`}>
              {verdict.label}
            </span>
          </div>
        </div>

        {/* AI Executive Summary Card */}
        <div className="bg-[#09090b]/90 border border-zinc-800/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-200 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Executive Synthesis</span>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
              GEMINI_RUBRIC_EVALUATION
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {evaluation.summary || evaluation.feedback || 'Candidate response telemetry analyzed across engineering domains, structural delivery, and STAR execution.'}
          </p>

          {/* Verified Tech Stack */}
          {interview.techStack && (
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500 mr-1.5">Calibrated Stack:</span>
              {(Array.isArray(interview.techStack) ? interview.techStack : interview.techStack.split(',')).map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono">
                  {typeof skill === 'string' ? skill.trim() : skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Strengths & Growth Areas Matrix */}
        {(evaluation.strengths?.length > 0 || evaluation.improvements?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            
            {/* Strengths Card */}
            {evaluation.strengths?.length > 0 && (
              <div className="bg-[#09090b]/90 border border-emerald-950/60 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-emerald-950/80 pb-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Validated Strengths</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500/80 bg-emerald-950/50 px-2 py-0.5 rounded">
                    {evaluation.strengths.length} SIGNALS
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  {evaluation.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Growth Areas Card */}
            {evaluation.improvements?.length > 0 && (
              <div className="bg-[#09090b]/90 border border-amber-950/60 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-amber-950/80 pb-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Flagged Growth Areas</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500/80 bg-amber-950/50 px-2 py-0.5 rounded">
                    {evaluation.improvements.length} AUDITS
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  {evaluation.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

        {/* Question-by-Question Diagnostics Accordion */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                Question-by-Question Diagnostics
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {interview.questions?.length || 0} Calibrated Prompts Evaluated
            </span>
          </div>

          <div className="space-y-3">
            {interview.questions?.map((q, idx) => {
              const isExpanded = expandedQuestion === idx;
              const transcript = interview.transcripts?.find((t) => t.questionId === q.questionId);
              const evalItem = evaluationsList.find((e) => e.questionId === q.questionId);
              const itemScore = evalItem?.scorePercentage;

              return (
                <div
                  key={q.questionId || idx}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'bg-[#09090b]/95 border-zinc-700 shadow-xl' 
                      : 'bg-[#09090b]/70 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                        Q{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-200 truncate font-sans">
                        {q.questionText}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono">
                      {itemScore !== undefined && (
                        <span className={`text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md border ${
                          itemScore >= 80 
                            ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400' 
                            : 'bg-amber-950/40 border-amber-900/60 text-amber-400'
                        }`}>
                          {itemScore}%
                        </span>
                      )}
                      <div className="p-1 rounded-md text-zinc-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="px-5 pb-5 space-y-4 text-xs border-t border-zinc-900/90 pt-4"
                      >
                        {/* Recorded User Answer Transcript */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-zinc-500">
                            <Quote className="w-3 h-3 text-zinc-500 rotate-180" />
                            <span>Candidate Verbal Transcript</span>
                          </div>
                          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-zinc-300 font-sans italic leading-relaxed">
                            "{transcript?.userAnswerText || 'No verbal answer recorded for this question.'}"
                          </div>
                        </div>

                        {/* Evaluator Critique */}
                        {evalItem?.feedback && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-cyan-400">
                              <Sparkles className="w-3 h-3 text-cyan-400" />
                              <span>Evaluator Critique & STAR Breakdown</span>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-950/40 text-zinc-300 leading-relaxed font-sans">
                              {evalItem.feedback}
                            </div>
                          </div>
                        )}

                        {/* Optimal Benchmark Model Answer */}
                        {evalItem?.idealAnswer && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-indigo-400">
                              <ShieldCheck className="w-3 h-3 text-indigo-400" />
                              <span>Calibrated Benchmark Answer (STAR Format)</span>
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-indigo-200 leading-relaxed font-sans">
                              {evalItem.idealAnswer}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}