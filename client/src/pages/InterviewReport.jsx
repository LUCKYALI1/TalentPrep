import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    ArrowLeft
} from 'lucide-react';
import api from '../utils/api';

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

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <span className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-mono text-zinc-400">Loading interview telemetry report...</p>
            </div>
        );
    }

    if (error || !interview) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 rounded-2xl text-xs max-w-md w-full mb-4">
                    {error || 'Interview session not found.'}
                </div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs text-zinc-300 transition"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-zinc-300">

            {/* Navigation & Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 mb-3 transition cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                    </button>

                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
                            Full Evaluation Audit
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {interview.createdAt ? new Date(interview.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {interview.targetRole || 'Technical Interview'}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                        <span className="flex items-center gap-1 text-zinc-300">
                            <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                            {interview.targetCompany || 'General Tech'}
                        </span>
                        <span>•</span>
                        <span>{interview.experienceLevel}</span>
                    </div>
                </div>

                {/* Score Pill */}
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl px-6 py-3 text-center sm:text-right">
                    <p className="text-[10px] font-mono uppercase text-zinc-500">Overall Score</p>
                    <p className={`text-3xl font-black font-mono ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-cyan-400' : 'text-amber-400'
                        }`}>
                        {score}%
                    </p>
                </div>
            </div>

            {/* Summary Card */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                        AI Executive Summary
                    </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {evaluation.summary || evaluation.feedback || 'Candidate performance analyzed across key engineering domains.'}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                    {interview.techStack?.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Strengths & Growth Areas */}
            {(evaluation.strengths?.length > 0 || evaluation.improvements?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {evaluation.strengths?.length > 0 && (
                        <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-2xl p-5 space-y-2.5">
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
                        <div className="bg-amber-950/10 border border-amber-900/30 rounded-2xl p-5 space-y-2.5">
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

            {/* Question Breakdown Accordion */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-400" /> Question-by-Question Diagnostics
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">
                        {interview.questions?.length || 0} Questions Evaluated
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
                                className="bg-zinc-950/60 border border-zinc-900 rounded-2xl overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-zinc-900/40 transition cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-cyan-400 flex items-center justify-center shrink-0">
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
                                    <div className="p-5 pt-0 space-y-4 text-xs border-t border-zinc-900 bg-black/30">
                                        <div>
                                            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Your Recorded Answer</p>
                                            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 font-sans italic">
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
                                                <p className="text-[10px] font-mono uppercase text-indigo-400 mb-1">Optimal Solution Benchmark</p>
                                                <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
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
    );
}