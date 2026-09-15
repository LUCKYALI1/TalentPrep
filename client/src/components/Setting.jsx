import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Globe, 
  Lock, 
  User, 
  GraduationCap, 
  MapPin, 
  Code2, 
  Check, 
  AlertCircle, 
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

function Settings() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  );

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || 'Lucky',
    lastName: user?.lastName || 'Ali',
    email: user?.email || 'lucky.ali@example.com',
    title: user?.title || 'Full-Stack & Machine Learning Engineer',
    location: user?.location || 'Ghaziabad / NCR, India',
    degree: user?.degree || 'B.Tech in Computer Science (AI & ML)',
    institution: user?.institution || 'ABES Engineering College',
    graduationYear: user?.graduationYear || '2026',
    bio: user?.bio || 'Software engineer specializing in high-throughput backend systems, distributed architectures, and AI integrations.',
    skills: user?.skills ? (Array.isArray(user.skills) ? user.skills.join(', ') : user.skills) : 'React, Next.js, Node.js, TypeScript, Python, SQL',
    github: user?.links?.github || 'https://github.com',
    linkedin: user?.links?.linkedin || 'https://linkedin.com',
    portfolio: user?.links?.portfolio || 'https://onlyone.dev',
    avatar: user?.avatar?.url || user?.avatar || ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ error: 'Image file size must be less than 2MB.', success: '' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setProfileForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ error: '', success: '' });

    try {
      const payload = {
        ...profileForm,
        skills: profileForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
        links: {
          github: profileForm.github,
          linkedin: profileForm.linkedin,
          portfolio: profileForm.portfolio
        }
      };

      const res = await api.put('/user/profile/update', payload);
      if (updateUser) updateUser(res.data?.user || payload);

      setFeedback({ success: 'Profile details and imagery synchronized.', error: '' });
    } catch (err) {
      setFeedback({
        error: err.response?.data?.message || 'Failed to update profile details.',
        success: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setFeedback({ error: '', success: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFeedback({ error: 'New passwords do not match.', success: '' });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setFeedback({ error: 'New password must be at least 8 characters long.', success: '' });
      return;
    }

    setLoading(true);

    try {
      await api.put('/user/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setFeedback({ success: 'Credentials updated successfully.', error: '' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setFeedback({
        error: err.response?.data?.message || 'Verification failed on current password.',
        success: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 text-zinc-300">
      
      {/* Header & Segmented Navigation */}
      <div className="border-b border-zinc-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Account Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">System Settings</h1>
        </div>

        <div className="flex bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 shrink-0 text-xs font-mono">
          <button
            type="button"
            onClick={() => { setActiveTab('profile'); setFeedback({ error: '', success: '' }); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'profile' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Identity & Stack
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('security'); setFeedback({ error: '', success: '' }); }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'security' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Security
          </button>
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence mode="wait">
        {(feedback.error || feedback.success) && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-xs font-mono">
            {feedback.error && (
              <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /> {feedback.error}</span>
                <button onClick={() => setFeedback({ ...feedback, error: '' })}><X className="w-4 h-4" /></button>
              </div>
            )}
            {feedback.success && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0" /> {feedback.success}</span>
                <button onClick={() => setFeedback({ ...feedback, success: '' })}><X className="w-4 h-4" /></button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: Profile & Credentials */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* Avatar Section */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-xl">
                <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover grayscale-[10%]" />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity cursor-pointer text-white"
              >
                <Camera className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-mono">Change</span>
              </button>
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleImageSelect} 
                className="hidden" 
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <h3 className="text-sm font-semibold text-white">Profile Photo</h3>
              <p className="text-xs text-zinc-400">JPG, PNG, or WebP. 2MB max recommended size.</p>
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition cursor-pointer"
                >
                  Upload New
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview('');
                      setProfileForm((prev) => ({ ...prev, avatar: '' }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Primary Info */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-900 pb-3">
              <User className="w-4 h-4 text-zinc-500" /> Personal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileForm.firstName}
                  onChange={handleProfileChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileForm.lastName}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Target Headline / Role</label>
                <input
                  type="text"
                  name="title"
                  value={profileForm.title}
                  onChange={handleProfileChange}
                  placeholder="e.g. Full-Stack & Machine Learning Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Professional Summary</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-normal outline-none focus:border-zinc-700 transition-all resize-none text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Academic & Location */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-900 pb-3">
              <GraduationCap className="w-4 h-4 text-zinc-500" /> Academic & Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Degree & Major</label>
                <input
                  type="text"
                  name="degree"
                  value={profileForm.degree}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={profileForm.institution}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Graduation Year</label>
                <input
                  type="text"
                  name="graduationYear"
                  value={profileForm.graduationYear}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-mono outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileForm.location}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Technical Stack & Socials */}
          <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-900 pb-3">
              <Code2 className="w-4 h-4 text-zinc-500" /> Stack & Links
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase">
                  Technical Stack <span className="text-zinc-500 font-sans lowercase">(comma separated)</span>
                </label>
                <input
                  type="text"
                  name="skills"
                  value={profileForm.skills}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-mono text-xs outline-none focus:border-zinc-700 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-400" /> GitHub URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={profileForm.github}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-mono text-xs outline-none focus:border-zinc-700 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400" /> LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profileForm.linkedin}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-mono text-xs outline-none focus:border-zinc-700 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" /> Portfolio URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={profileForm.portfolio}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-mono text-xs outline-none focus:border-zinc-700 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Security & Password */}
      {activeTab === 'security' && (
        <form onSubmit={handleUpdatePassword} className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 max-w-xl">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-900 pb-3">
            <Lock className="w-4 h-4 text-zinc-500" /> Access Credentials
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white font-medium outline-none focus:border-zinc-700 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-900">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-300 text-zinc-950 font-semibold text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Updating Credentials...' : 'Update Password'}
            </button>
          </div>
        </form>
      )}

    </div>
  );
}

export default React.memo(Settings);