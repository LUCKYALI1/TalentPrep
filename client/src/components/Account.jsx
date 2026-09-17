import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShieldAlert,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Mail,
  AtSign,
  CreditCard,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

function Account() {
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const res = await api.get('/user/account/details');
      if (res.data?.account) {
        setAccountData(res.data.account);
      }
    } catch (err) {
      console.warn('Could not fetch server account details, falling back to session user.');
    } finally {
      setLoading(false);
    }
  };

  const accountInfo = {
    fullName: accountData?.fullName || (user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : 'Lucky Ali'),
    username: accountData?.username || user?.username || 'lucky_ali_dev',
    email: accountData?.email || user?.email || 'lucky.ali@example.com',
    memberSince: accountData?.memberSince
      ? new Date(accountData.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : (user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'September 2025'),
    accountRole: accountData?.accountRole || 'Candidate / Developer',
    accountStatus: accountData?.accountStatus || 'Verified & Active',
    credits: accountData?.credits ?? user?.credits ?? 3
  };

  const handleDeleteAccount = async () => {
    if (confirmText.trim().toUpperCase() !== 'DELETE') return;

    setIsDeleting(true);
    setFeedback({ error: '', success: '' });

    try {
      const res = await api.delete('/user/account/delete');
      setFeedback({
        success: res.data?.message || 'Account successfully deleted. Purging session...',
        error: ''
      });

      // Auto logout and clear storage after feedback renders
      setTimeout(() => {
        if (logout) {
          logout();
        } else {
          localStorage.clear();
          window.location.href = '/login';
        }
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
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 text-zinc-300">

      {/* Header Section */}
      <div className="border-b border-zinc-900 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Profile Identity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Account Identification
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          View your authentication handle, verification telemetry, and security lifecycle.
        </p>
      </div>

      {/* Notifications */}
      <AnimatePresence mode="wait">
        {(feedback.error || feedback.success) && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-xs font-mono">
            {feedback.error && (
              <div className="p-3 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /> {feedback.error}</span>
                <button onClick={() => setFeedback({ ...feedback, error: '' })}><X className="w-4 h-4" /></button>
              </div>
            )}
            {feedback.success && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 rounded-xl flex items-center justify-between">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /> {feedback.success}</span>
                <button onClick={() => setFeedback({ ...feedback, success: '' })}><X className="w-4 h-4" /></button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile & Identity Card */}
      <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-3 mb-5 flex items-center gap-2">
          <User className="w-4 h-4 text-zinc-500" /> Core Identification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Full Legal Name</p>
            <p className="text-sm font-semibold text-white">{accountInfo.fullName}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1 flex items-center gap-1">
              <Mail className="w-3 h-3 text-zinc-500" /> Email Address
            </p>
            <p className="text-sm font-medium text-white">{accountInfo.email}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1 flex items-center gap-1">
              <AtSign className="w-3 h-3 text-zinc-500" /> System Handle
            </p>
            <p className="text-sm font-mono text-cyan-400">@{accountInfo.username}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-zinc-500" /> Member Since
            </p>
            <p className="text-sm font-medium text-zinc-300">{accountInfo.memberSince}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-zinc-500" /> Available AI Credits
            </p>
            <p className="text-sm font-mono font-bold text-white">{accountInfo.credits} Credits</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Telemetry Status</p>
            <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 font-medium">
              {accountInfo.accountStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-red-900/30 pb-4">
          <div>
            <h2 className="text-xs font-mono text-red-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" /> Danger Zone
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Permanently delete this account, Cloudinary media, and all evaluated interview histories.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setConfirmText('');
              setShowDeleteModal(true);
            }}
            className="px-4 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-800 text-red-300 text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Account
          </button>
        </div>

        <p className="text-[11px] font-mono text-zinc-500">
          * Warning: This action cannot be reversed. All generated session feedback and transcripts will be dropped.
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
                <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" /> Confirm Account Purge
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  This action is permanent and <strong className="text-zinc-200">cannot be undone</strong>. Please type <span className="font-mono text-red-400 font-bold">DELETE</span> below to proceed.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-500 uppercase">Verification Phrase</label>
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
                  {isDeleting ? 'Purging Account...' : 'Confirm Purge'}
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