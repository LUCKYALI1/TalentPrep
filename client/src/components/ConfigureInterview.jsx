import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Sparkles, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  SlidersHorizontal, 
  Activity,
  Layers,
  Building2,
  Code2,
  Gauge,
  Radio,
  Plus,
  Briefcase,
  LogIn
} from 'lucide-react';
import api from '../utils/api'; 
import ActiveSessionModal from './ActiveSessionModal';

const ROLE_PRESETS = [
  'Full-Stack Engineer',
  'Frontend (React/TS)',
  'Backend / Distributed',
  'AI / ML Systems',
  'DevOps & Cloud'
];

const COMPANY_PRESETS = [
  'Google / Meta Rubric',
  'Stripe / FinTech',
  'High-Growth Startup',
  'Enterprise Scale'
];

const POPULAR_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'PostgreSQL', 
  'Redis', 'Docker', 'Python', 'C++', 'System Design', 'Kubernetes'
];

const EXPERIENCE_TIERS = [
  { 
    id: 'Fresher / Student (0 Yrs)', 
    label: 'Entry / Grad', 
    exp: '0 Yrs', 
    rubric: 'Core CS, DSA & Foundational Web' 
  },
  { 
    id: 'Junior Engineer (1 - 2 Yrs)', 
    label: 'Junior', 
    exp: '1-2 Yrs', 
    rubric: 'Production Features, API Contracts & Debugging' 
  },
  { 
    id: 'Mid-Level Engineer (3 - 5 Yrs)', 
    label: 'Mid-Level', 
    exp: '3-5 Yrs', 
    rubric: 'Concurrency, Data Modeling & System Scale' 
  },
  { 
    id: 'Senior / Staff (5+ Yrs)', 
    label: 'Senior / Staff', 
    exp: '5+ Yrs', 
    rubric: 'Distributed Trade-Offs, High-Throughput & Lead' 
  }
];

export default function ConfigureInterview({ onSubmit, isSubmitting: parentSubmitting }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    targetRole: 'Full-Stack Engineer',
    targetCompany: 'High-Growth Startup',
    experienceLevel: 'Fresher / Student (0 Yrs)',
    currentRole: 'fresher',
    techStack: 'React, TypeScript, Node.js, PostgreSQL'
  });

  const [activeSession, setActiveSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);

  const isExecuting = Boolean(parentSubmitting || loading);

  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setError('');
      setIsAuthError(false);
      const res = await api.get('/interview/check-active', {
        headers: { Authorization: `Bearer ${token.trim()}` }
      });
      if (res.data?.hasActive) {
        setActiveSession(res.data.activeInterview);
        setShowModal(true);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn('Session inactive or unauthenticated.');
      } else {
        console.error('Session check error:', err);
      }
    }
  };

  const handleChange = (e) => {
    setError('');
    setIsAuthError(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectTier = (tierId) => {
    setError('');
    setFormData((prev) => ({ ...prev, experienceLevel: tierId }));
  };

  const handleApplyPresetRole = (role) => {
    setError('');
    setFormData((prev) => ({ ...prev, targetRole: role }));
  };

  const handleApplyPresetCompany = (company) => {
    setError('');
    setFormData((prev) => ({ ...prev, targetCompany: company }));
  };

  const handleToggleSkill = (skill) => {
    setError('');
    const currentSkills = formData.techStack
      ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    let updated;
    if (currentSkills.includes(skill)) {
      updated = currentSkills.filter((s) => s !== skill);
    } else {
      updated = [...currentSkills, skill];
    }
    setFormData((prev) => ({ ...prev, techStack: updated.join(', ') }));
  };

  const parsedSkills = useMemo(() => {
    return formData.techStack
      ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
  }, [formData.techStack]);

  const complexityIndex = useMemo(() => {
    let score = 25;
    if (formData.experienceLevel.includes('Junior')) score += 20;
    if (formData.experienceLevel.includes('Mid')) score += 45;
    if (formData.experienceLevel.includes('Senior')) score += 70;
    score += Math.min(parsedSkills.length * 4, 25);
    return Math.min(score, 100);
  }, [formData.experienceLevel, parsedSkills]);

  // Actual Server Pipeline Dispatcher
  const handleFormSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!formData.targetRole.trim() || !formData.techStack.trim()) {
      setError('Target role and primary tech stack are required.');
      setIsAuthError(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required: Please log in to initialize an AI session.');
      setIsAuthError(true);
      return;
    }

    setLoading(true);
    setError('');
    setIsAuthError(false);

    try {
      // Direct Authorization header guarantees delivery
      const res = await api.post('/interview/create', formData, {
        headers: {
          Authorization: `Bearer ${token.trim()}`
        }
      });

      // Notify parent modal if handler was passed
      if (onSubmit) {
        await onSubmit(formData, res.data);
      }

      const createdId = res.data?.interviewId || res.data?._id || res.data?.interview?._id;
      if (createdId) {
        navigate(`/interview/waiting/${createdId}`, { state: res.data });
      } else {
        throw new Error('Interview ID was not returned by server.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Authorization denied: Session expired or token invalid. Please log in again.');
        setIsAuthError(true);
        return;
      }

      const serverMsg = err.response?.data?.message;
      setError(
        err.response?.status === 503
          ? 'AI inference cluster is at peak load. Please retry in a few moments.'
          : serverMsg || err.message || 'Failed to instantiate interview session.'
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
    const token = localStorage.getItem('token');
    setLoading(true);
    setError('');
    try {
      await api.post('/interview/archive-active', {}, {
        headers: { Authorization: `Bearer ${token?.trim()}` }
      });
      setShowModal(false);
      await handleFormSubmit({ preventDefault: () => {} });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to archive active session.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#09090b]/95 border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col text-white font-sans box-border selection:bg-cyan-500/25 selection:text-cyan-200">
      
      {/* 1. Terminal Console Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 bg-zinc-950/90 border-b border-zinc-800/80 gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />

          <span className="text-zinc-400 font-medium flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>SESSION_CALIBRATOR</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-500 hidden md:inline">RUBRIC_INSPECTOR_V2.4</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] self-start sm:self-auto">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/60 text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>INFERENCE_CLUSTER_ONLINE</span>
          </span>
          <span className="text-zinc-500 hidden lg:inline font-mono">MODEL: GEMINI-1.5</span>
        </div>
      </div>

      {/* 2. Interactive Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-950/70 border-b border-red-900/80 px-5 sm:px-7 py-3.5 text-xs text-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {isAuthError && (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-900/80 hover:bg-red-800 text-white text-[11px] font-mono border border-red-700 transition-all cursor-pointer"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Log In Now</span>
                </Link>
              )}
              <button 
                onClick={() => { setError(''); setIsAuthError(false); }} 
                className="p-1 text-red-400 hover:text-red-200 transition cursor-pointer"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Widescreen Dual-Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
        
        {/* LEFT COLUMN: Calibration Workbench (7 Cols) */}
        <form 
          onSubmit={handleFormSubmit} 
          className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-5">
            
            {/* Header Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-xl bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 shadow-inner">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                    Configure Scenario Parameters
                  </h2>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-2.5 py-0.5 rounded-full">
                  Step 01 // Calibration
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Define your target role persona, seniority benchmarks, and technical focus areas.
              </p>
            </div>

            {/* Field 1: Target Role */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Target Role</span>
                </label>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">* REQUIRED</span>
              </div>

              <input
                type="text"
                name="targetRole"
                required
                disabled={isExecuting}
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Engineer, SDE-1, Backend Specialist"
                className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-cyan-500/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-700 outline-none transition disabled:opacity-50 font-mono shadow-inner min-h-[42px]"
              />

              {/* Role Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] font-mono text-zinc-500 mr-1">Presets:</span>
                {ROLE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleApplyPresetRole(preset)}
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono transition cursor-pointer border ${
                      formData.targetRole === preset
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-semibold'
                        : 'bg-zinc-900/80 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2 & 3: Target Company & Background */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Company / Rubric */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Target Company / Rubric</span>
                </label>
                <input
                  type="text"
                  name="targetCompany"
                  disabled={isExecuting}
                  value={formData.targetCompany}
                  onChange={handleChange}
                  placeholder="e.g. Google, Razorpay, FAANG"
                  className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-cyan-500/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-700 outline-none transition disabled:opacity-50 font-mono shadow-inner min-h-[42px]"
                />

                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  {COMPANY_PRESETS.map((company) => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => handleApplyPresetCompany(company)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition cursor-pointer border ${
                        formData.targetCompany === company
                          ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-semibold'
                          : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {company.split('/')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Background */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Current Background</span>
                </label>
                <input
                  type="text"
                  name="currentRole"
                  disabled={isExecuting}
                  value={formData.currentRole}
                  onChange={handleChange}
                  placeholder="e.g. CS Student, React Intern"
                  className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-cyan-500/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-700 outline-none transition disabled:opacity-50 font-mono shadow-inner min-h-[42px]"
                />
                <span className="text-[10px] font-mono text-zinc-600 block pl-1">
                  Calibrates comparative evaluation context
                </span>
              </div>

            </div>

            {/* Field 4: Seniority Benchmark Matrix */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Seniority Benchmark Matrix</span>
                </label>
                <span className="text-zinc-500 font-mono text-[11px]">Select Target Bar</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {EXPERIENCE_TIERS.map((tier) => {
                  const isSelected = formData.experienceLevel === tier.id;

                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleSelectTier(tier.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 relative ${
                        isSelected
                          ? 'bg-zinc-900 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/40'
                          : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`}>
                          {tier.exp}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white tracking-tight">
                          {tier.label}
                        </p>
                        <p className="text-[10px] text-zinc-500 leading-snug line-clamp-2 mt-0.5">
                          {tier.rubric.split(',')[0]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 5: Primary Tech Stack */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Primary Tech Stack & Core Competencies</span>
                </label>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">* REQUIRED</span>
              </div>

              <input
                type="text"
                name="techStack"
                required
                disabled={isExecuting}
                value={formData.techStack}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, TypeScript, PostgreSQL, Redis"
                className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-cyan-500/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-700 outline-none transition disabled:opacity-50 font-mono shadow-inner min-h-[42px]"
              />

              {/* Competency Chips */}
              <div className="space-y-1 pt-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Quick Inject Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SKILLS.map((skill) => {
                    const isAdded = parsedSkills.includes(skill);

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleToggleSkill(skill)}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer border ${
                          isAdded
                            ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-semibold shadow-sm'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {isAdded ? (
                          <span className="text-cyan-400 text-[10px] font-bold">✓</span>
                        ) : (
                          <Plus className="w-3 h-3 text-zinc-500" />
                        )}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Submission Action Button */}
          <div className="pt-3 border-t border-zinc-900">
            <button
              type="submit"
              disabled={isExecuting}
              className="w-full min-h-[46px] py-3 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-mono font-bold text-xs sm:text-sm transition-all shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 duration-200"
            >
              {isExecuting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  INITIALIZING_INFERENCE_PIPELINE...
                </span>
              ) : (
                <span className="flex items-center gap-2 tracking-wide">
                  <span>INITIALIZE INTERVIEW PIPELINE</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: Real-Time Telemetry HUD (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-7 bg-zinc-950/50 flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            
            {/* HUD Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Live Spec Telemetry
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                SYNC_ACTIVE
              </span>
            </div>

            {/* Spec Identity Card */}
            <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-950/80 space-y-2.5 font-mono text-xs shadow-xl">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Target Role</span>
                <p className="text-white font-bold text-xs sm:text-sm truncate mt-0.5">
                  {formData.targetRole || <span className="text-zinc-600 font-normal italic">Awaiting role calibration...</span>}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-900">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Seniority Bar</span>
                  <p className="text-cyan-400 text-xs font-semibold truncate mt-0.5">
                    {formData.experienceLevel.split('(')[0].trim()}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Target Rubric</span>
                  <p className="text-zinc-300 text-xs truncate mt-0.5">
                    {formData.targetCompany || 'Standard Tech Bar'}
                  </p>
                </div>
              </div>

              {/* Parsed Competency Badges */}
              <div className="pt-2 border-t border-zinc-900">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                    Parsed Domain Stack
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold">
                    {parsedSkills.length} Verified
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1">
                  {parsedSkills.length > 0 ? (
                    parsedSkills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-600 text-[11px] font-normal italic">No competencies declared yet</span>
                  )}
                </div>
              </div>
            </div>

            {/* Complexity & Dynamic Rubric Distribution */}
            <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-950/80 space-y-3 font-mono text-xs shadow-xl">
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Algorithmic Rigor Index</span>
                  </span>
                  <span className="text-cyan-400 font-bold">{complexityIndex}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${complexityIndex}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1.5 border-t border-zinc-900 text-[11px] text-zinc-400">
                <div className="flex justify-between items-center">
                  <span>Coding & Algorithmic Scenarios</span>
                  <span className="text-zinc-200 font-semibold">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Architecture & Concurrency</span>
                  <span className="text-zinc-200 font-semibold">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>STAR Behavioral & Conflict</span>
                  <span className="text-zinc-200 font-semibold">25%</span>
                </div>
              </div>

            </div>

            {/* Protocol Guarantees */}
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Low-latency speech transcript buffer</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Automated STAR rubric evaluation</span>
              </div>
            </div>

          </div>

          {/* Bottom Live Status Bar */}
          <div className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-950 font-mono text-[11px] flex items-center justify-between text-zinc-500 shadow-inner">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>STREAM_SYNCHRONIZED</span>
            </span>
            <span>~15 MIN EST. DURATION</span>
          </div>

        </div>

      </div>

      {/* 4. Active Session Recovery Modal */}
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