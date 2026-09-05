import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const INITIAL_PROFILE = {
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
};

function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  const [profileData, setProfileData] = useState(INITIAL_PROFILE);
  const [avatarPreview, setAvatarPreview] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile/get-profile'); 
      if (res.data) {
        const backendAvatar = typeof res.data.avatar === 'string' 
          ? { url: res.data.avatar, public_id: '' }
          : (res.data.avatar || { url: '', public_id: '' });

        setProfileData({
          ...res.data,
          avatar: backendAvatar,
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(', ') : (res.data.skills || '')
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ error: 'Image size must be under 2MB.', success: '' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ error: '', success: '' });

    const formPayload = new FormData();
    Object.keys(profileData).forEach(key => {
      if (key !== 'avatar') {
        formPayload.append(key, profileData[key] ?? '');
      }
    });

    if (fileInputRef.current?.files[0]) {
      formPayload.append('avatar', fileInputRef.current.files[0]);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const res = await api.put('/user/profile/update-profile', formPayload, config);
      
      setFeedback({ success: res.data.message || 'Profile updated successfully!', error: '' });
      setIsEditing(false);
      setAvatarPreview('');
      
      if (updateUser && res.data.profile) {
        updateUser(res.data.profile);
      }

      await fetchProfile();
    } catch (err) {
      setFeedback({ error: err.response?.data?.message || 'Failed to update profile.', success: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputStyles = (disabled) => `
    w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-150 outline-none
    ${disabled 
      ? 'bg-zinc-950/40 border-zinc-900 text-zinc-500 cursor-not-allowed' 
      : 'bg-zinc-900 border-zinc-800 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
    }
  `.trim();
    const creditsLeft = user?.credits ?? profileData?.credits ?? 0;
    const isPremium = user?.isPremium || user?.hasPremium || creditsLeft > 3; 

  return (
    <div className="w-full space-y-6 pb-12 text-zinc-300">
      
      {/* Header Section */}
      <div className="border-b border-zinc-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Personal Profile
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your personal credentials, experience, and system metrics.
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => { 
            if (isEditing) { 
              setFeedback({ error: '', success: '' });
              setAvatarPreview('');
            } 
            setIsEditing(!isEditing); 
          }}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
            isEditing 
              ? 'border-red-900/60 bg-red-950/20 text-red-400 hover:bg-red-900/30' 
              : 'border-zinc-800 bg-zinc-900 text-white hover:border-zinc-700'
          }`}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {/* Notifications */}
      {(feedback.error || feedback.success) && (
        <div className="text-xs font-medium">
          {feedback.error && (
            <div className="p-3 bg-red-950/20 border border-red-900/50 text-red-400 rounded-xl">
              {feedback.error}
            </div>
          )}
          {feedback.success && (
            <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 text-emerald-400 rounded-xl">
              {feedback.success}
            </div>
          )}
        </div>
      )}

      {/* Account Highlights: Credits & Premium Badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-base">
              ⚡
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Available Credits</p>
              <p className="text-lg font-black text-white">{creditsLeft} Credits</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>

        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-base">
              👑
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Subscription Tier</p>
              <p className="text-lg font-bold text-white">{isPremium ? 'Premium Member' : 'Free Tier'}</p>
            </div>
          </div>
          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
            isPremium 
              ? 'text-amber-400 bg-amber-950/50 border-amber-800/50' 
              : 'text-zinc-400 bg-zinc-900 border-zinc-800'
          }`}>
            {isPremium ? '★ Pro' : 'Standard'}
          </span>
        </div>
      </div>

      <form onSubmit={handleUpdateSubmit} className="space-y-6">
        
        {/* Core Demographics Card */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            
            {/* Avatar Uploader */}
            <div className="relative flex flex-col items-center shrink-0">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <div 
                onClick={() => isEditing && fileInputRef.current?.click()}
                className={`w-24 h-24 rounded-2xl bg-zinc-900 border flex items-center justify-center text-zinc-600 text-xs overflow-hidden relative transition-all ${
                  isEditing 
                    ? 'border-cyan-500/50 cursor-pointer hover:border-cyan-400 group' 
                    : 'border-zinc-800'
                }`}
              >
                {avatarPreview || profileData.avatar?.url ? (
                  <img src={avatarPreview || profileData.avatar.url} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-500 font-medium">No Image</span>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-400 transition-opacity text-xs font-medium">
                    Change Photo
                  </div>
                )}
              </div>
            </div>

            {/* General Information Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <div className="space-y-1 text-left">
                <label className="text-xs text-zinc-400 font-medium">First Name</label>
                <input type="text" name="firstName" disabled={!isEditing} value={profileData.firstName || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="First Name" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-xs text-zinc-400 font-medium">Last Name</label>
                <input type="text" name="lastName" disabled={!isEditing} value={profileData.lastName || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="Last Name" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-xs text-zinc-400 font-medium">Username</label>
                <input type="text" disabled value={user?.username || profileData.username || 'candidate_node'} className={getInputStyles(true)} />
              </div>
              <div className="space-y-1 sm:col-span-2 text-left">
                <label className="text-xs text-zinc-400 font-medium">Primary / Secondary Email</label>
                <input type="email" name="alternativeEmail" disabled={!isEditing} value={profileData.alternativeEmail || user?.email || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="email@example.com" />
              </div>
              <div className="space-y-1 sm:col-span-1 text-left">
                <label className="text-xs text-zinc-400 font-medium">Location / Address</label>
                <input type="text" name="address" disabled={!isEditing} value={profileData.address || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="City, Country" />
              </div>
            </div>

          </div>
        </div>

        {/* Professional Experience Card */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Target Job Role</label>
              <input type="text" name="jobRole" disabled={!isEditing} value={profileData.jobRole || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="e.g. Full-Stack Engineer" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Current Company</label>
              <input type="text" name="currentCompany" disabled={!isEditing} value={profileData.currentCompany || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="Company Name" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Primary Skills</label>
              <input type="text" name="skills" disabled={!isEditing} value={profileData.skills || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="React, Node.js, Python" />
            </div>
          </div>
        </div>

        {/* Bio & Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          <div className="lg:col-span-2 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Professional Bio</label>
              <textarea 
                name="bio" 
                rows="3" 
                disabled={!isEditing} 
                value={profileData.bio || ''} 
                onChange={handleInputChange} 
                className={`${getInputStyles(!isEditing)} resize-none h-24`} 
                placeholder="Brief summary of your professional background..." 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-medium">Years of Experience</label>
                <input type="number" name="experienceYears" disabled={!isEditing} value={profileData.experienceYears || 0} onChange={handleInputChange} className={getInputStyles(!isEditing)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-medium">GitHub Profile</label>
                <input type="text" name="githubUrl" disabled={!isEditing} value={profileData.githubUrl || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="https://github.com/..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-medium">LinkedIn Profile</label>
                <input type="text" name="linkedinUrl" disabled={!isEditing} value={profileData.linkedinUrl || ''} onChange={handleInputChange} className={getInputStyles(!isEditing)} placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </div>

          {/* Platform Performance Overview Card */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4 text-xs font-mono">
              <h3 className="text-xs font-sans font-semibold text-zinc-300">Platform Analytics</h3>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="text-zinc-500">ATS Match Score</span>
                <span className="text-emerald-400 font-semibold">92%</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="text-zinc-500">Credits Remaining</span>
                <span className="text-cyan-400 font-semibold">{creditsLeft}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Account Tier</span>
                <span className="text-amber-400 font-semibold">{isPremium ? 'Premium' : 'Free'}</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 pt-4 mt-4 border-t border-zinc-900">
              Analytics update automatically as you complete practical interview sessions.
            </p>
          </div>

        </div>

        {/* Submit Action Bar */}
        <AnimatePresence>
          {isEditing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving Changes..." : "Save Profile Changes"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </div>
  );
}

export default React.memo(Profile);