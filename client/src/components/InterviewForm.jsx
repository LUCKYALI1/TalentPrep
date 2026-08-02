import React, { useState } from 'react';

const InterviewForm = ({ onSubmit, isSubmitting }) => {
  // PURE INSTANT FLOW STATE - Date/Time completely removed
  const [formData, setFormData] = useState({
    jobRole: 'MERN Full-Stack Developer',
    companyTier: 'Tier 2 (High-Growth Startups)',
    experienceYears: 2,
    techStack: ['React', 'Node.js', 'MongoDB'],
    isInstant: true // 👈 Hamesha True rahega
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (onSubmit) {
      onSubmit(formData); // ⚡ Triggers payload to AIInterview
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Job Role Input */}
      <div className="space-y-1 text-left">
        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Target Role</label>
        <input 
          type="text" 
          value={formData.jobRole}
          onChange={(e) => setFormData({...formData, jobRole: e.target.value})}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:border-cyan-500/50 outline-none"
        />
      </div>

      {/* 2. Experience & Tier Grid */}
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Experience (Years)</label>
          <input 
            type="number" 
            min="0"
            value={formData.experienceYears}
            onChange={(e) => setFormData({...formData, experienceYears: Number(e.target.value)})}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Company Tier</label>
          <select 
            value={formData.companyTier}
            onChange={(e) => setFormData({...formData, companyTier: e.target.value})}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 outline-none"
          >
            <option>Tier 1 (FAANG / Top Tech)</option>
            <option>Tier 2 (High-Growth Startups)</option>
            <option>Tier 3 (Service Based)</option>
          </select>
        </div>
      </div>

      {/* 3. Tech Stack */}
      <div className="space-y-1 text-left">
        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Tech Stack (Comma Separated)</label>
        <input 
          type="text" 
          value={formData.techStack.join(', ')}
          onChange={(e) => setFormData({...formData, techStack: e.target.value.split(',').map(s => s.trim())})}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 mt-4 bg-cyan-400 text-black font-mono text-xs font-black uppercase rounded-xl hover:bg-cyan-300 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer"
      >
        {isSubmitting ? "[INGESTING CONFIGURATION...]" : "[START INSTANT INTERVIEW ⚡]"}
      </button>
    </form>
  );
};

export default InterviewForm;