import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Play, CheckCircle2, Clock, Award, ArrowRight, AlertCircle } from 'lucide-react';

export const OverviewSection = ({ user }) => {
    const navigate = useNavigate();
    const [activeSession, setActiveSession] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch active session
            const { data: activeRes } = await axios.get('/api/interview/active');
            if (activeRes.hasActive) {
                setActiveSession(activeRes.activeInterview);
            }

            // Fetch user interview history
            const { data: historyRes } = await axios.get('/api/interview/history');
            setHistory(historyRes.interviews || []);
        } catch (err) {
            console.error('Failed to load dashboard overview data:', err);
        } finally {
            setLoading(false);
        }
    };

    const getScoreBadgeColor = (score) => {
        if (score >= 80) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        if (score >= 60) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    };

    if (loading) {
        return <div className="p-8 text-slate-400 animate-pulse">Loading dashboard analytics...</div>;
    }

    const completedInterviews = history.filter((i) => i.status === 'COMPLETED');
    const avgScore = completedInterviews.length
        ? Math.round(completedInterviews.reduce((acc, curr) => acc + (curr.evaluation?.overallScore || 0), 0) / completedInterviews.length)
        : 0;

    return (
        <div className="space-y-8 p-6 text-slate-100">

            {/* 1. Sticky Highlight Banner for Active/Unfinished Session */}
            {activeSession && (
                <div className="relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 p-6 shadow-xl">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-amber-500/20 p-3 text-amber-400">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">In Progress Session</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                                </div>
                                <h3 className="text-lg font-bold text-white">{activeSession.targetRole} Interview</h3>
                                <p className="text-sm text-slate-400">
                                    Target Company: <span className="text-slate-200">{activeSession.targetCompany}</span> • Tech Stack: {activeSession.techStack.join(', ')}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/interview/${activeSession._id}`)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 active:scale-95"
                        >
                            Resume Interview <Play className="h-4 w-4 fill-current" />
                        </button>
                    </div>
                </div>
            )}

            {/* 2. Top Level Metrics & Score Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-sm font-medium">Average Performance Score</span>
                        <Award className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-white">{avgScore}</span>
                        <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-sm font-medium">Completed Sessions</span>
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="mt-3">
                        <span className="text-3xl font-extrabold text-white">{completedInterviews.length}</span>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-sm font-medium">Target Stack</span>
                        <Clock className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="mt-3 text-sm font-medium text-slate-300 truncate">
                        {user?.techStack?.join(', ') || 'React, Node.js, MongoDB'}
                    </div>
                </div>
            </div>

            {/* 3. Recent Completed Interviews History */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-bold text-white">Recent Interview Evaluations</h3>

                {completedInterviews.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                        No completed interviews found. Start your first mock session!
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800/80">
                        {completedInterviews.map((session) => (
                            <div key={session._id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-800/20 px-3 rounded-lg transition">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-slate-100">{session.targetRole}</span>
                                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getScoreBadgeColor(session.evaluation?.overallScore || 0)}`}>
                                            Score: {session.evaluation?.overallScore || 0}/100
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        {session.targetCompany} • {new Date(session.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate(`/interview/${session._id}/report`)}
                                    className="flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                                >
                                    View Analysis <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};