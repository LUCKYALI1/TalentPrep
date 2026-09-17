import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Cpu, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  SlidersHorizontal, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import api from '../utils/api'; 
import ActiveSessionModal from './ActiveSessionModal';

const EXPERIENCE_TIERS = [
  'Fresher / Student (0 Yrs)',
  'Junior Engineer (1 - 2 Yrs)',
  'Mid-Level Engineer (3 - 5 Yrs)',
  'Senior / Staff (5+ Yrs)'
];

export default function ConfigureInterview({ onSubmit, isSubmitting }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    targetRole: '',
    targetCompany: '',
    experienceLevel: 'Fresher / Student (0 Yrs)',
    currentRole: '',
    techStack: ''
  });

  const [activeSession, setActiveSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isExecuting = isSubmitting || loading;

  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    try {
      setError('');
      const res = await api.get('/interview/check-active');
      if (res.data.hasActive) {
        setActiveSession(res.data.activeInterview);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Failed to check active interview:', err);
    }
  };

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.targetRole.trim() || !formData.techStack.trim()) {
      setError('Target role and primary tech stack are required.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/interview/create', formData);
      setShowModal(false);
      navigate(`/interview/waiting/${res.data.interviewId}`, { state: res.data });
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      setError(err.response?.status === 503 
        ? 'Inference cluster is at peak capacity. Retrying shortly...' 
        : serverMsg || 'Failed to instantiate interview session.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResume = () => {
    setShowModal(false);
    if (activeSession?._id) {
      navigate(`/interview/terminal/${activeSession._id}`);
    }
  };

  const handleArchiveAndCreate = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/interview/archive-active');
      setShowModal(false);
      await handleFormSubmit({ preventDefault: () => {} });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to archive active session.');
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] m-auto bg-[#09090b] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans select-none text-zinc-100">
      
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-5 py-3 bg-zinc-950 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
          </div>
          <span className="text-zinc-400 font-medium flex items-center gap-2 pl-3 border-l border-zinc-800">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            SESSION_CALIBRATOR // LANDSCAPE_CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ENGINE_ONLINE
          </span>
          <span className="text-zinc-500 hidden sm:inline">GEMINI-1.5-FLASH</span>
        </div>
      </div>

      {/* Error Strip */}
      {error && (
        <div className="bg-red-950/40 border-b border-red-900/50 px-5 py-2.5 text-xs text-red-400 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="hover:text-red-200 transition cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2-Column Balanced Cockpit Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        
        {/* Left Side: Parameters Form (7 Columns) */}
        <form onSubmit={handleFormSubmit} className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                Runtime Parameters
              </h2>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                CALIBRATION
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Specify your target domain to generate accurate algorithmic and behavioral tracks.
            </p>
          </div>

          {/* Form Fields 2-Col Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-zinc-400 flex items-center justify-between">
                <span>01 // Target Role</span>
                <span className="text-cyan-400 font-bold">* REQUIRED</span>
              </label>
              <input
                type="text"
                name="targetRole"
                required
                disabled={isExecuting}
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Engineer, SDE-1"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-zinc-200 placeholder-zinc-700 outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-zinc-400">
                02 // Company / Rubric
              </label>
              <input
                type="text"
                name="targetCompany"
                disabled={isExecuting}
                value={formData.targetCompany}
                onChange={handleChange}
                placeholder="e.g. Google, Razorpay, or FAANG"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-zinc-200 placeholder-zinc-700 outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-zinc-400">
                03 // Seniority Level
              </label>
              <select
                name="experienceLevel"
                disabled={isExecuting}
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-zinc-200 outline-none transition disabled:opacity-50 cursor-pointer"
              >
                {EXPERIENCE_TIERS.map((tier) => (
                  <option key={tier} value={tier} className="bg-zinc-900 text-zinc-200">
                    {tier}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-zinc-400">
                04 // Current Background
              </label>
              <input
                type="text"
                name="currentRole"
                disabled={isExecuting}
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g. CS Student, React Intern"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-zinc-200 placeholder-zinc-700 outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] uppercase text-zinc-400 flex items-center justify-between">
                <span>05 // Primary Tech Stack</span>
                <span className="text-cyan-400 font-bold">* REQUIRED</span>
              </label>
              <input
                type="text"
                name="techStack"
                required
                disabled={isExecuting}
                value={formData.techStack}
                onChange={handleChange}
                placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Redis"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg px-3.5 py-2.5 text-zinc-200 placeholder-zinc-700 outline-none transition disabled:opacity-50"
              />
            </div>

          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isExecuting}
              className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-semibold text-xs sm:text-sm py-3 px-4 rounded-xl transition shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              {isExecuting ? (
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  INITIALIZING_PIPELINE...
                </span>
              ) : (
                <span className="flex items-center gap-2 font-mono tracking-wide">
                  INITIALIZE INTERVIEW PIPELINE <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Right Side: Live Spec Inspector (5 Columns) */}
        <div className="lg:col-span-5 p-6 sm:p-7 bg-zinc-950/50 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Telemetry HUD
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded">
                LIVE_SPEC
              </span>
            </div>

            {/* Spec Card */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-2.5 font-mono text-xs">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Target Role</span>
                <p className="text-white font-semibold truncate text-xs mt-0.5">
                  {formData.targetRole || <span className="text-zinc-600">Awaiting input...</span>}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900">
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Seniority</span>
                  <p className="text-cyan-400 text-[11px] truncate mt-0.5">{formData.experienceLevel}</p>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Benchmark</span>
                  <p className="text-zinc-300 text-[11px] truncate mt-0.5">{formData.targetCompany || 'Standard Tech'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-900">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">Parsed Tech Stack</span>
                <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                  {formData.techStack ? (
                    formData.techStack.split(',').map((skill, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 rounded font-mono">
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-600 text-[10px]">No skills declared</span>
                  )}
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Speech-to-text live stream capture</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>STAR framework answer evaluation</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dynamic fallback on model rate limits</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-950 text-xs font-mono text-zinc-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Activity className="w-3 h-3 animate-pulse" />
              STREAM_READY
            </span>
            <span>~15 MIN RUNTIME</span>
          </div>
        </div>

      </div>

      <ActiveSessionModal
        isOpen={showModal}
        activeInterview={activeSession}
        onResume={handleResume}
        onArchiveAndCreate={handleArchiveAndCreate}
        isLoading={loading}
      />
    </div>
  );
}