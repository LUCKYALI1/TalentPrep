import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Settings() {
  const { user, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security'
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || 'Lucky',
    lastName: user?.lastName || 'Ali',
    email: user?.email || 'lucky.ali@example.com',
    location: user?.location || 'Ghaziabad / NCR, India',
    bio: user?.bio || 'Full-Stack & AI/ML Engineer passionate about building scalable web applications and microservices.',
    skills: user?.skills ? (Array.isArray(user.skills) ? user.skills.join(', ') : user.skills) : 'React, Next.js, Node.js, C++, Python',
  });

  // Password Change Form State
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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ error: '', success: '' });

    try {
      const payload = {
        ...profileForm,
        skills: profileForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const res = await api.put('/user/profile/update', payload);
      if (updateUser) updateUser(res.data?.user || payload);

      setFeedback({ success: 'Profile details updated successfully!', error: '' });
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

      setFeedback({ success: 'Password changed successfully!', error: '' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setFeedback({
        error: err.response?.data?.message || 'Failed to update password. Verify your current password.',
        success: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-12 text-zinc-300">
      
      {/* Header & Section Navigation */}
      <div className="border-b border-zinc-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your public profile details, skills, and security credentials.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('profile');
              setFeedback({ error: '', success: '' });
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-zinc-800 text-cyan-400 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Profile Data
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('security');
              setFeedback({ error: '', success: '' });
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-zinc-800 text-cyan-400 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Password & Security
          </button>
        </div>
      </div>

      {/* Dynamic Feedback Notification */}
      <AnimatePresence mode="wait">
        {(feedback.error || feedback.success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs font-medium"
          >
            {feedback.error && (
              <div className="p-3.5 bg-red-950/40 border border-red-900/60 text-red-400 rounded-xl flex items-center justify-between">
                <span>⚠️ {feedback.error}</span>
                <button onClick={() => setFeedback({ ...feedback, error: '' })} className="text-zinc-500 hover:text-zinc-300">✕</button>
              </div>
            )}
            {feedback.success && (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/60 text-emerald-400 rounded-xl flex items-center justify-between">
                <span>✅ {feedback.success}</span>
                <button onClick={() => setFeedback({ ...feedback, success: '' })} className="text-zinc-500 hover:text-zinc-300">✕</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: Profile Data Form */}
      {activeTab === 'profile' && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSaveProfile}
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-6"
        >
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
            <span className="text-cyan-400">📝</span> Edit Profile Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Email Address</label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Location</label>
              <input
                type="text"
                name="location"
                value={profileForm.location}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Skills Array */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">
                Technical Skills <span className="text-zinc-500 lowercase">(comma separated)</span>
              </label>
              <input
                type="text"
                name="skills"
                value={profileForm.skills}
                onChange={handleProfileChange}
                placeholder="React, Node.js, TypeScript, PostgreSQL"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Bio */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Professional Bio</label>
              <textarea
                name="bio"
                rows={4}
                value={profileForm.bio}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-900">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </motion.form>
      )}

      {/* TAB 2: Change Password Form */}
      {activeTab === 'security' && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleUpdatePassword}
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-6 max-w-xl"
        >
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
            <span className="text-cyan-400">🔒</span> Change Account Password
          </h2>

          <div className="space-y-4 text-xs">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-zinc-400 uppercase">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-medium outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-zinc-900">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </motion.form>
      )}

    </div>
  );
}

export default React.memo(Settings);