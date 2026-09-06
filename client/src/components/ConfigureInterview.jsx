import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 
import ActiveSessionModal from './ActiveSessionModal';

export default function ConfigureInterview() {
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
  const [error, setError] = useState(''); // Error message state

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
      setError(err.response?.data?.message || 'Failed to check existing session status.');
    }
  };

  const handleChange = (e) => {
    setError(''); // User input par error reset karein
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartNewSession = async () => {
    if (!formData.targetRole.trim() || !formData.techStack.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/interview/create', formData);
      setShowModal(false);
      navigate(`/interview/waiting/${res.data.interviewId}`, { state: res.data });
    } catch (err) {
      console.error('Error creating session:', err);
      const serverMsg = err.response?.data?.message;
      if (err.response?.status === 503) {
        setError('AI Service is currently at peak capacity. Please wait a few seconds and try again.');
      } else {
        setError(serverMsg || 'Failed to create interview session. Please try again.');
      }
    }  finally {
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
      await handleStartNewSession();
    } catch (err) {
      console.error('Failed to archive session:', err);
      setError(err.response?.data?.message || 'Failed to queue previous session.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex items-center justify-center p-4 sm:p-6 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full bg-[#09090b] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Configure AI Mock Session
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Fill details to personalize your evaluation</p>
        </div>

        {/* ERROR BANNER */}
        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-start justify-between gap-3">
            <span>{error}</span>
            <button 
              onClick={() => setError('')} 
              className="text-red-400 hover:text-red-200 font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleStartNewSession(); }} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Target Role *</label>
            <input
              type="text"
              name="targetRole"
              required
              disabled={loading}
              value={formData.targetRole}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer, SDE-1"
              className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Target Company</label>
            <input
              type="text"
              name="targetCompany"
              disabled={loading}
              value={formData.targetCompany}
              onChange={handleChange}
              placeholder="e.g. Google, Velocity, TCS (Optional)"
              className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Experience Level *</label>
            <select
              name="experienceLevel"
              disabled={loading}
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition disabled:opacity-50"
            >
              <option className="bg-zinc-900 text-zinc-200">Fresher / Student (0 Yrs)</option>
              <option className="bg-zinc-900 text-zinc-200">Junior (1 - 2 Yrs)</option>
              <option className="bg-zinc-900 text-zinc-200">Mid-Level (3 - 5 Yrs)</option>
              <option className="bg-zinc-900 text-zinc-200">Senior (5+ Yrs)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Previous / Current Role</label>
            <input
              type="text"
              name="currentRole"
              disabled={loading}
              value={formData.currentRole}
              onChange={handleChange}
              placeholder="e.g. CS Student, React Intern"
              className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Tech Stack / Primary Skills *</label>
            <input
              type="text"
              name="techStack"
              required
              disabled={loading}
              value={formData.techStack}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Express, MongoDB"
              className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-zinc-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] flex justify-center items-center text-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                Generating Session...
              </span>
            ) : (
              'Proceed to Waiting Room'
            )}
          </button>
        </form>
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