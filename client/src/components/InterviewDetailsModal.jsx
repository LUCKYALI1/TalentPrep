import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Award,
    CheckCircle2,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Code2,
    Calendar,
    Sparkles,
    Building2
} from 'lucide-react';
import api from '../utils/api';

export default function InterviewDetailsModal({ isOpen, interviewId, onClose }) {
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedQuestion, setExpandedQuestion] = useState(0);

    useEffect(() => {
        if (!isOpen || !interviewId) return;

        const fetchDetails = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await api.get(`/interview/${interviewId}`);
                setInterview(res.data?.interview || res.data);
            } catch (err) {
                console.error('Failed to fetch interview details:', err);
                setError(err.response?.data?.message || 'Could not load interview session details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [isOpen, interviewId]);

    if (!isOpen) return null;

    const evaluation = interview?.evaluation || {};
    const score = evaluation.overallScorePercentage ?? evaluation.overallScore ?? 0;
    const evaluationsList = evaluation.evaluations || [];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-4xl bg-[#09090b] border border-zinc-800 rounded-3xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-zinc-800 text-zinc-300"
                >
                    {/* Top Sticky Header */}
                    <div className="flex items-start justify-between border-b border-zinc-800/80 pb-5 gap-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
                                    Audit Telemetry
                                </span>
                                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {interview?.createdAt ? new Date(interview.createdAt).toLocaleDateString() : 'Recent'}
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                {interview?.targetRole || 'Technical Interview'}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                                <span className="flex items-center gap-1 text-zinc-300">
                                    <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                                    {interview?.targetCompany || 'General Tech'}
                                </span>
                                <span>•</span>
                                <span>{interview?.experienceLevel}</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer shrink-0"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="py-20 flex flex-col items-center justify-center gap-3">
                            <span className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-xs font-mono text-zinc-400">Decrypting session scorecard from database...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="py-12 text-center space-y-3">
                            <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 rounded-2xl text-xs max-w-md mx-auto">
                                {error}
                            </div>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs text-zinc-300 transition"
                            >
                                Close Window
                            </button>
                        </div>
                    )}

                    {/* Modal Main Content */}
                    {!loading && !error && interview && (
                        <div className="mt-6 space-y-6">

                            {/* Score & Summary Banner */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                                        Gemini Score
                                    </span>
                                    <div className="relative flex items-center justify-center my-2">
                                        <span className={`text-4xl font-black font-mono ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-cyan-400' : 'text-amber-400'
                                            }`}>
                                            {score}%
                                        </span>
                                    </div>
                                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${score >= 80
                                            ? 'bg-emerald-950/50 border-emerald-800/50 text-emerald-400'
                                            : 'bg-amber-950/50 border-amber-800/50 text-amber-400'
                                        }`}>
                                        {score >= 80 ? 'Passed Evaluation' : 'Revision Suggested'}
                                    </span>
                                </div>

                                <div className="md:col-span-2 bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-cyan-400" />
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                                            AI Executive Summary
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                        {evaluation.summary || evaluation.feedback || 'Candidate performance successfully analyzed with structured reasoning.'}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {interview.techStack?.map((skill, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Strengths & Improvements */}
                            {(evaluation.strengths?.length > 0 || evaluation.improvements?.length > 0) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {evaluation.strengths?.length > 0 && (
                                        <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-2xl p-4 space-y-2.5">
                                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4" /> Strong Signals
                                            </div>
                                            <ul className="space-y-1.5 text-xs text-zinc-300">
                                                {evaluation.strengths.map((s, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-emerald-500 font-bold">•</span>
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {evaluation.improvements?.length > 0 && (
                                        <div className="bg-amber-950/10 border border-amber-900/30 rounded-2xl p-4 space-y-2.5">
                                            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                                                <AlertTriangle className="w-4 h-4" /> Growth Areas
                                            </div>
                                            <ul className="space-y-1.5 text-xs text-zinc-300">
                                                {evaluation.improvements.map((imp, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-amber-500 font-bold">•</span>
                                                        <span>{imp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Questions & Transcripts Breakdown Accordion */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Code2 className="w-4 h-4 text-cyan-400" /> Question-by-Question Diagnostics
                                    </h3>
                                    <span className="text-[10px] font-mono text-zinc-500">
                                        {interview.questions?.length || 0} Questions Total
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {interview.questions?.map((q, idx) => {
                                        const isExpanded = expandedQuestion === idx;
                                        const transcript = interview.transcripts?.find((t) => t.questionId === q.questionId);
                                        const evalItem = evaluationsList.find((e) => e.questionId === q.questionId);

                                        return (
                                            <div
                                                key={q.questionId || idx}
                                                className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl overflow-hidden transition-all"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                                                    className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-zinc-900/40 transition cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold text-cyan-400 flex items-center justify-center shrink-0">
                                                            Q{idx + 1}
                                                        </span>
                                                        <p className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
                                                            {q.questionText}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-3 shrink-0">
                                                        {evalItem?.scorePercentage !== undefined && (
                                                            <span className={`text-xs font-mono font-bold ${evalItem.scorePercentage >= 80 ? 'text-emerald-400' : 'text-amber-400'
                                                                }`}>
                                                                {evalItem.scorePercentage}%
                                                            </span>
                                                        )}
                                                        {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                                                    </div>
                                                </button>

                                                {isExpanded && (
                                                    <div className="p-4 pt-0 space-y-3.5 text-xs border-t border-zinc-900 bg-black/20">
                                                        <div>
                                                            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Your Spoken Answer</p>
                                                            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 font-sans italic">
                                                                "{transcript?.userAnswerText || 'No verbal answer recorded.'}"
                                                            </div>
                                                        </div>

                                                        {evalItem?.feedback && (
                                                            <div>
                                                                <p className="text-[10px] font-mono uppercase text-cyan-400 mb-1">AI Evaluator Critique</p>
                                                                <p className="text-zinc-300 leading-relaxed">
                                                                    {evalItem.feedback}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {evalItem?.idealAnswer && (
                                                            <div>
                                                                <p className="text-[10px] font-mono uppercase text-indigo-400 mb-1">Benchmark Solution</p>
                                                                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
                                                                    {evalItem.idealAnswer}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Modal Footer */}
                    <div className="mt-8 pt-4 border-t border-zinc-800/80 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition cursor-pointer"
                        >
                            Close Window
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}