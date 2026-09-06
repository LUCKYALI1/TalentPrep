import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Account() {
  const { user, logout } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  // Account details from context or defaults
  const accountInfo = {
    fullName: user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : 'Lucky Ali',
    username: user?.username || 'lucky_ali_dev',
    email: user?.email || 'lucky.ali@example.com',
    memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'September 2025',
    accountRole: 'Candidate / Developer',
    accountStatus: 'Verified & Active',
  };

  const handleDeleteAccount = async () => {
    if (confirmText.trim().toUpperCase() !== 'DELETE') return;

    setIsDeleting(true);
    setFeedback({ error: '', success: '' });

    try {
      // Call backend endpoint to delete account
      await api.delete('/user/account/delete');
      setFeedback({ success: 'Account successfully deleted. Redirecting...', error: '' });
      
      setTimeout(() => {
        if (logout) logout();
      }, 1500);
    } catch (err) {
      setFeedback({ 
        error: err.response?.data?.message || 'Failed to delete account. Please try again.', 
        success: '' 
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-12 text-zinc-300">
      
      {/* Header Section */}
      <div className="border-b border-zinc-900 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          View core profile identification credentials and security options.
        </p>
      </div>

      {/* Notifications */}
      {(feedback.error || feedback.success) && (
        <div className="text-xs font-medium">
          {feedback.error && (
            <div className="p-3 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl">
              {feedback.error}
            </div>
          )}
          {feedback.success && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 rounded-xl">
              {feedback.success}
            </div>
          )}
        </div>
      )}

      {/* Profile & Identity Card */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
        
        <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 mb-5 flex items-center gap-2">
          <span className="text-cyan-400">👤</span> Primary Profile Identification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Full Name</p>
            <p className="text-sm font-semibold text-white">{accountInfo.fullName}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Email Address</p>
            <p className="text-sm font-semibold text-white">{accountInfo.email}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Username Handle</p>
            <p className="text-sm font-mono text-cyan-400">@{accountInfo.username}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Member Since</p>
            <p className="text-sm font-semibold text-zinc-300">{accountInfo.memberSince}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Account Role</p>
            <p className="text-sm font-semibold text-zinc-300">{accountInfo.accountRole}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Account Status</p>
            <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 font-medium">
              {accountInfo.accountStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-red-900/30 pb-4">
          <div>
            <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Danger Zone
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Permanently remove your account, interview histories, and saved credentials.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setConfirmText('');
              setShowDeleteModal(true);
            }}
            className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-300 text-xs font-semibold rounded-xl transition-all shadow-lg cursor-pointer shrink-0"
          >
            Delete Account
          </button>
        </div>

        <p className="text-[11px] text-zinc-500">
          Once deleted, your profile data cannot be recovered.
        </p>
      </div>

      {/* Deletion Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-red-900/50 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 text-left"
            >
              <div>
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                  <span>🚨</span> Delete Account?
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  This action is permanent and <strong className="text-zinc-200">irreversible</strong>. Type <span className="font-mono text-red-400 font-bold">DELETE</span> below to confirm.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase">Confirmation Input</label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={confirmText.trim().toUpperCase() !== 'DELETE' || isDeleting}
                  onClick={handleDeleteAccount}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-zinc-900 disabled:text-zinc-600 border border-red-500/50 disabled:border-zinc-800 text-white text-xs font-semibold transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default React.memo(Account);