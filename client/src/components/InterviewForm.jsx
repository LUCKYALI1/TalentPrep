import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InterviewForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInstantMode, setIsInstantMode] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: '',
    companyTier: '',
    experienceYears: '0',
    skillsText: '',
    slottedDate: '',
    slottedTime: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInstantToggle = () => {
    const newMode = !isInstantMode;
    setIsInstantMode(newMode);
    
    if (newMode) {
      // Calculate current date and time elements cleanly
      const localNow = new Date();
      const yr = localNow.getFullYear();
      const mo = String(localNow.getMonth() + 1).padStart(2, '0');
      const dy = String(localNow.getDate()).padStart(2, '0');
      const hr = String(localNow.getHours()).padStart(2, '0');
      const mn = String(localNow.getMinutes()).padStart(2, '0');
      
      setFormData(prev => ({
        ...prev,
        slottedDate: `${yr}-${mo}-${dy}`,
        slottedTime: `${hr}:${mn}`
      }));
    } else {
      setFormData(prev => ({ ...prev, slottedDate: '', slottedTime: '' }));
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate real-time server instance container registration
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess(formData);
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#09090b]/90 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden shadow-2xl backdrop-blur-md text-left font-sans text-zinc-300">
      
      {/* Dynamic Upper Telemetry Tracker */}
      <div className="absolute top-2 right-4 text-[9px] font-mono text-zinc-700 uppercase">
        [MATRIX_STEP_NODE // 0{currentStep}_OF_03]
      </div>

      {/* Progress Telemetry Tube */}
      <div className="w-full h-[2px] bg-zinc-900 mb-6 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <form onSubmit={handleFormSubmission} className="space-y-6">
        <AnimatePresence mode="wait">
          
          {/* ==================== STEP 1: CONSOLE ARCHITECTURE ==================== */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-900 pb-2">
                <h2 className="text-base font-bold font-mono text-white uppercase tracking-wider">[01 // ECOSYSTEM_TARGETS]</h2>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Initialize parameters for AI prompt matrix synthesis</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Target Job Domain</label>
                <select 
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border font-mono text-xs bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500/80 outline-none transition-all"
                >
                  <option value="">-- SELECT ENVIRONMENT MAPPING --</option>
                  <option value="MERN Full-Stack Developer">MERN Full-Stack Developer</option>
                  <option value="Backend DevOps Engineer">Backend DevOps Engineer</option>
                  <option value="Data Analyst Engine">Data Analyst Engine</option>
                  <option value="Frontend UI Specialist">Frontend UI Specialist</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Target Company Architecture</label>
                <select 
                  name="companyTier"
                  value={formData.companyTier}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border font-mono text-xs bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500/80 outline-none transition-all"
                >
                  <option value="">-- SELECT METRIC SCALER --</option>
                  <option value="Tier 1 (FAANG / Core Hyper-Scale)">Tier 1 (FAANG / Core Hyper-Scale)</option>
                  <option value="Tier 2 (High-Growth Tech Startups)">Tier 2 (High-Growth Tech Startups)</option>
                  <option value="Tier 3 (Service Scale Systems)">Tier 3 (Service Scale Systems)</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* ==================== STEP 2: PROFESSIONAL CORE METRICS ==================== */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-900 pb-2">
                <h2 className="text-base font-bold font-mono text-white uppercase tracking-wider">[02 // MATRIX_CAPABILITIES]</h2>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Parse user skills matrix parameters to AI tracker</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Experience Vector (Years)</label>
                <input 
                  type="number" 
                  name="experienceYears"
                  min="0"
                  max="30"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border font-mono text-xs bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500/80 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Technical Stack Injections (Comma Separated)</label>
                <textarea 
                  name="skillsText"
                  rows="3"
                  value={formData.skillsText}
                  onChange={handleInputChange}
                  placeholder="React, Express.js, Tailwind CSS, PostgreSQL..."
                  className="w-full px-4 py-2.5 rounded-xl border font-mono text-xs bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500/80 outline-none resize-none h-24 transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* ==================== STEP 3: SCHEDULER HORIZON ==================== */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="border-b border-zinc-900 pb-2">
                <h2 className="text-base font-bold font-mono text-white uppercase tracking-wider">[03 // TIME_HORIZON_LOCK]</h2>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Synchronize console slots with real-time timers</p>
              </div>

              {/* Instant Execution Toggle Node */}
              <div 
                onClick={handleInstantToggle}
                className={`p-4 rounded-xl border font-mono text-xs flex items-center justify-between cursor-pointer transition-all ${
                  isInstantMode 
                    ? 'bg-cyan-950/30 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-0.5">
                  <p className="font-bold uppercase text-white">⚡ INITIALIZE INTERVIEW IMMEDIATELY</p>
                  <p className="text-[10px] text-zinc-500">Bypass queue slots and launch immediate compiler container</p>
                </div>
                <div className={`h-4 w-4 rounded-md border flex items-center justify-center transition-all ${isInstantMode ? 'bg-cyan-400 border-cyan-400 text-black font-bold' : 'border-zinc-700'}`}>
                  {isInstantMode && "✓"}
                </div>
              </div>

              {/* Conditional Date Time Inputs Selection */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ${isInstantMode ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Secure Date Node</label>
                  <input 
                    type="date" 
                    name="slottedDate"
                    disabled={isInstantMode}
                    value={formData.slottedDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border font-mono text-xs bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500/80 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Telemetry Time Matrix</label>
                  <input 
                    type="time" 
                    name="slottedTime"
                    disabled={isInstantMode}
                    value={formData.slottedTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border font-mono text-xs bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500/80 outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ==================== CONTROL NAVIGATION PIPELINE ==================== */}
        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center gap-4">
          <button
            type="button"
            disabled={currentStep === 1 || isLoading}
            onClick={prevStep}
            className="px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            [BACK // DE-ESCALATE]
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              disabled={currentStep === 1 ? !formData.jobRole || !formData.companyTier : !formData.skillsText}
              onClick={nextStep}
              className="px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border border-zinc-800 bg-white text-black hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              [NEXT // PROCEED]
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || (!isInstantMode && (!formData.slottedDate || !formData.slottedTime))}
              className="px-6 py-2 rounded-xl font-mono text-xs font-black uppercase tracking-widest bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/10 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isLoading ? "CREATING CONSOLE INSTANCE..." : isInstantMode ? "LAUNCH NOW // RUN SIM ⚡" : "LOCK SCHEDULE // SAVE SLOTS ⚡"}
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default InterviewForm;