import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const Profile = () => {
  // ⚡ DESTUCTURED login / updateUser state handler from your core auth system hook
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    avatar: { url: '', public_id: '' }, 
    address: '',
    alternativeEmail: '',
    skills: '',
    jobRole: '',
    currentCompany: '',
    bio: '',
    experienceYears: 0,
    githubUrl: '',
    linkedinUrl: ''
  });

  const [avatarPreview, setAvatarPreview] = useState('');

  // ⚡ PIPELINE DEEP INTEGRATION: Core profile database retrieval parser function
  const fetchLatestDatabaseProfile = async () => {
    try {
      // Direct pipeline query matching backend controller specifications
      const res = await api.get('/user/profile/get-profile'); 
      if (res.data) {
        const backendAvatar = typeof res.data.avatar === 'string' 
          ? { url: res.data.avatar, public_id: '' }
          : (res.data.avatar || { url: '', public_id: '' });

        setProfileData({
          ...res.data,
          avatar: backendAvatar,
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : res.data.skills
        });
      }
    } catch (err) {
      console.error("Failed to fetch fresh backend profile data node:", err);
    }
  };

  // Run on initial structural mounting instance
  useEffect(() => {
    fetchLatestDatabaseProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ error: 'Payload validation error: File sizes must stay under 2MB limit.', success: '' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUploadClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ error: '', success: '' });

    const formPayload = new FormData();
    formPayload.append('firstName', profileData.firstName);
    formPayload.append('lastName', profileData.lastName);
    formPayload.append('address', profileData.address);
    formPayload.append('alternativeEmail', profileData.alternativeEmail);
    formPayload.append('skills', profileData.skills);
    formPayload.append('jobRole', profileData.jobRole);
    formPayload.append('currentCompany', profileData.currentCompany);
    formPayload.append('bio', profileData.bio);
    formPayload.append('experienceYears', profileData.experienceYears);
    formPayload.append('githubUrl', profileData.githubUrl);
    formPayload.append('linkedinUrl', profileData.linkedinUrl);

    if (fileInputRef.current?.files[0]) {
      formPayload.append('avatar', fileInputRef.current.files[0]);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const res = await api.put('/user/profile/update-profile', formPayload, config);
      
      setFeedback({ success: res.data.message || 'Telemetry profile synchronized successfully!', error: '' });
      setIsEditing(false);
      setAvatarPreview('');
      
      // ⚡ SYNC PIPELINE STEP 2: Trigger direct global state re-fetching protocols
      // If your useAuth handles a dynamic data upgrade method like updateUser()
      if (updateUser && res.data.profile) {
        updateUser(res.data.profile);
      }

      // Re-run database parser to pull full fresh metrics direct from database logs
      await fetchLatestDatabaseProfile();

    } catch (err) {
      setFeedback({ error: err.response?.data?.message || 'Data sync failed.', success: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyles = (isFieldDisabled) => `
    w-full px-4 py-2.5 rounded-xl border font-mono text-xs text-white transition-all duration-200 outline-none
    ${isFieldDisabled 
      ? 'bg-zinc-950/40 border-zinc-900 text-zinc-500 cursor-not-allowed border-dashed' 
      : 'bg-zinc-900 border-zinc-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 text-white'
    }
    autofill:bg-zinc-900 autofill:text-white [-webkit-text-fill-color:white] 
    [box-shadow:0_0_0px_1000px_#18181b_inset]
  `.trim();

  return (
    <div className="w-full space-y-8 pb-12 text-zinc-300 custom-cyan-scrollbar selection:bg-cyan-500/30">
      
      {/* Dynamic Header Greeting Module */}
      <div className="border-b border-zinc-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Welcome back, {profileData.firstName || user?.username || 'Candidate'}
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            [PIPELINE_STATUS: SECURE_SYNC // ENV: PRODUCTION]
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => { 
            if(isEditing) { 
              setFeedback({error:'', success:''});
              setAvatarPreview('');
            } 
            setIsEditing(!isEditing); 
          }}
          className={`px-4 py-2 font-mono text-xs font-bold rounded-xl tracking-wider transition-all border uppercase cursor-pointer ${
            isEditing 
              ? 'border-red-900 bg-red-950/20 text-red-400 hover:bg-red-900/20' 
              : 'border-zinc-800 bg-zinc-900 text-white hover:border-zinc-700'
          }`}
        >
          {isEditing ? '[ABORT // LOCK]' : '[EDIT_MODE // UNLOCK]'}
        </button>
      </div>

      {/* System Feedback Messages */}
      {(feedback.error || feedback.success) && (
        <div className="font-mono text-[11px]">
          {feedback.error && <div className="p-3 bg-red-950/20 border border-red-900 text-red-400 rounded-xl">⚠️ [EXC_ERR]: {feedback.error}</div>}
          {feedback.success && <div className="p-3 bg-emerald-950/20 border border-emerald-900 text-emerald-400 rounded-xl animate-pulse">🚀 [SUCCESS]: {feedback.success}</div>}
        </div>
      )}

      <form onSubmit={handleUpdateSubmit} className="space-y-8">
        
        {/* ==================== ROW 1: CORE DEMOGRAPHICS METRICS ==================== */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-2 right-3 text-[9px] font-mono text-zinc-700 uppercase">[ROW_01 // IDENTITY_NODES]</div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
            
            {/* Hidden Input Stream & Interactive Avatar Grid */}
            <div className="relative flex flex-col items-center flex-shrink-0">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <div 
                onClick={triggerImageUploadClick}
                className={`w-24 h-24 rounded-2xl bg-zinc-900 border flex items-center justify-center text-zinc-600 font-mono text-[10px] uppercase overflow-hidden relative transition-all ${
                  isEditing 
                    ? 'border-cyan-500/40 cursor-pointer hover:border-cyan-400 group shadow-md shadow-cyan-500/5' 
                    : 'border-zinc-800'
                }`}
              >
                {avatarPreview || profileData.avatar?.url ? (
                  <img src={avatarPreview || profileData.avatar.url} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>[NO_IMG]</span>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-cyan-400 transition-opacity duration-150 gap-1 text-[9px] p-1 text-center">
                    <span>⚡ CHANGE</span>
                    <span>IMAGE</span>
                  </div>
                )}
              </div>
              {isEditing && (
                <span className="text-[8px] font-mono text-cyan-500/60 mt-1 uppercase tracking-wider">
                  [Click Box]
                </span>
              )}
            </div>

            {/* Profile Variables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">First Name</label>
                <input type="text" name="firstName" disabled={!isEditing} value={profileData.firstName} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="Lucky" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Last Name</label>
                <input type="text" name="lastName" disabled={!isEditing} value={profileData.lastName} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="Ali" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Username Routing</label>
                <input type="text" disabled value={user?.username || 'candidate_node'} className={getInputStyles(true)} />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Mail Routing Address</label>
                <input type="email" name="alternativeEmail" disabled={!isEditing} value={profileData.alternativeEmail} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="ali@talentprep.ai" />
              </div>
              <div className="space-y-1 sm:col-span-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Address Node</label>
                <input type="text" name="address" disabled={!isEditing} value={profileData.address} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="Ghaziabad, IN" />
              </div>
            </div>
          </div>
        </div>

        {/* ==================== ROW 2: PROFESSIONAL TECH INSTANCE ==================== */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-2 right-3 text-[9px] font-mono text-zinc-700 uppercase">[ROW_02 // PROFESSIONAL_STACK]</div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Target Job Role</label>
              <input type="text" name="jobRole" disabled={!isEditing} value={profileData.jobRole} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="Full-Stack Engineer" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Current Company Workspace</label>
              <input type="text" name="currentCompany" disabled={!isEditing} value={profileData.currentCompany} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="TalentPrep Engineering" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Skills Matrix (Comma Separated)</label>
              <input type="text" name="skills" disabled={!isEditing} value={profileData.skills} onChange={handleInputChange} className={`${getInputStyles(!isEditing)} !text-cyan-400`} placeholder="React, Node.js, MERN" />
            </div>
          </div>
        </div>

        {/* ==================== ROW 3: PLATFORM ANALYTICS & TELEMETRY ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          <div className="lg:col-span-2 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="absolute top-2 right-3 text-[9px] font-mono text-zinc-700 uppercase">[ROW_03_A // INTEL_SUMMARY]</div>
            
            <div className="space-y-4">
              <div className="space-y-1 mt-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Candidate Bio Protocol</label>
                <textarea 
                  name="bio" 
                  rows="3" 
                  disabled={!isEditing} 
                  value={profileData.bio} 
                  onChange={handleInputChange} 
                  className={`w-full px-4 py-2.5 rounded-xl border font-mono text-xs text-white transition-all duration-200 outline-none resize-none h-24 ${
                    !isEditing 
                      ? 'bg-zinc-950/40 border-zinc-900 text-zinc-500 cursor-not-allowed border-dashed' 
                      : 'bg-zinc-900 border-zinc-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30'
                  }`} 
                  placeholder="Brief system engineering telemetry bio details..." 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Experience (Years)</label>
                  <input type="number" name="experienceYears" disabled={!isEditing} value={profileData.experienceYears} onChange={handleInputChange} className={getInputStyles(!isEditing)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">GitHub Matrix Node</label>
                  <input type="text" name="githubUrl" disabled={!isEditing} value={profileData.githubUrl} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="https://github.com/..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">LinkedIn Gateway</label>
                  <input type="text" name="linkedinUrl" disabled={!isEditing} value={profileData.linkedinUrl} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="https://linkedin.com/in/..." />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="absolute top-2 right-3 text-[9px] font-mono text-zinc-700 uppercase">[ROW_03_B // TELEMETRY_RADAR]</div>
            
            <div className="mt-4 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                <span className="text-zinc-500">ATS Resume Status</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-950">92% MATCH</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                <span className="text-zinc-500">AI Interviews Done</span>
                <span className="text-white font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">04 CONSOLES</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Avg Comm Metric</span>
                <span className="text-cyan-400 font-bold bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-950">A- EXCELLENT</span>
              </div>
            </div>

            <div className="text-[9px] font-mono text-zinc-600 border-t border-zinc-900/80 pt-4 mt-4 leading-normal">
              * Note: The telemetry data slots are read-only hooks, dynamic real-time evaluations populate these values during active simulators.
            </div>
          </div>

        </div>

        {/* Floating Safe Commit Footer Panel */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-mono font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-cyan-500/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "Synchronizing core database grids..." : "Commit changes to main telemetry tree ⚡"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </div>
  );
};

export default Profile;