import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Award, CheckCircle2, XCircle, ArrowLeft, Brain, MessageSquare } from 'lucide-react';

export const ReportSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/interview/${id}`);
      setSession(data.interview);
    } catch (err) {
      console.error('Failed to load evaluation report:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading AI Evaluation...</div>;
  }

  if (!session || !session.evaluation) {
    return <div className="p-8 text-center text-slate-400">No evaluation data available.</div>;
  }

  const { evaluation } = session;

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Top Navigation */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        {/* Score Overview Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Evaluation Analysis</span>
              <h1 className="text-2xl font-bold text-white mt-1">{session.targetRole} Assessment</h1>
              <p className="text-sm text-slate-400 mt-1">Tech Stack: {session.techStack.join(', ')}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-indigo-400">{evaluation.overallScore}</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Overall Score</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800/80 pt-6 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl bg-slate-950/50 p-4 border border-slate-800/50">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-indigo-400" />
                <span className="text-sm font-medium text-slate-300">Technical Competency</span>
              </div>
              <span className="text-lg font-bold text-white">{evaluation.technicalRating}/100</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-950/50 p-4 border border-slate-800/50">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-medium text-slate-300">Communication Clarity</span>
              </div>
              <span className="text-lg font-bold text-white">{evaluation.communicationRating}/100</span>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-2">Executive Feedback</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{evaluation.feedback}</p>
        </div>

        {/* Strengths & Areas of Improvement Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Strengths */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-6">
            <h3 className="flex items-center gap-2 text-base font-bold text-emerald-400 mb-4">
              <CheckCircle2 className="h-5 w-5" /> Key Strengths
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {evaluation.strengths?.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-6">
            <h3 className="flex items-center gap-2 text-base font-bold text-rose-400 mb-4">
              <XCircle className="h-5 w-5" /> Areas for Improvement
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {evaluation.improvements?.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Questions & Transcribed Answers Breakdown */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm space-y-6">
          <h3 className="text-lg font-bold text-white">Detailed Q&A Breakdown</h3>
          <div className="space-y-6 divide-y divide-slate-800/60">
            {session.transcripts?.map((item, idx) => (
              <div key={item.questionId || idx} className="pt-4 first:pt-0 space-y-2">
                <span className="text-xs font-semibold text-indigo-400">Question {idx + 1}</span>
                <p className="text-sm font-medium text-slate-100">{item.questionText}</p>
                <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80 text-xs text-slate-300 font-mono">
                  {item.userAnswerText || 'No response captured.'}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};