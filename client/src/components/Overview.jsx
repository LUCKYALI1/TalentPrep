import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  Search,
  ExternalLink,
  Target,
  TrendingUp,
  Trophy
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#09090b]/95 border border-zinc-800 p-3 rounded-xl shadow-2xl backdrop-blur-xl text-xs space-y-1 font-mono">
        <p className="font-semibold text-zinc-300 font-sans">{label}</p>
        <p className="text-cyan-400 font-bold">
          Score: {payload[0].value}%
        </p>
        {payload[0].payload?.role && (
          <p className="text-[10px] text-zinc-500">Role: {payload[0].payload.role}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function Overview() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalInterviews: 0,
    overallScore: 0,
    highScoresCount: 0,
    trendData: [],
    recentInterviews: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchDashboardAnalytics();
  }, []);

  const fetchDashboardAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/interview/analytics');
      if (res.data) {
        setMetrics(res.data);
      }
    } catch (err) {
      console.error('Failed to load overview data:', err);
    } finally {
      setLoading(false);
    }
  };

  const candidateName = user?.firstName
    ? `${user.firstName} ${user?.lastName || ''}`.trim()
    : 'Candidate';

  // Direct redirection to the dedicated report page
  const handleViewReport = (mongoId) => {
    if (!mongoId) return;
    navigate(`/interview/report/${mongoId}`);
  };

  const filteredInterviews = useMemo(() => {
    return (metrics.recentInterviews || []).filter((session) => {
      const displayTag = session.displayId || session.id?.slice(-6) || '';
      const matchesSearch = session.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        displayTag.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterStatus === 'PASSED') {
        return matchesSearch && session.score >= 80;
      }
      if (filterStatus === 'NEEDS_REVIEW') {
        return matchesSearch && session.score < 80;
      }
      return matchesSearch;
    });
  }, [metrics.recentInterviews, searchQuery, filterStatus]);

  return (
    <div className="w-full space-y-8 pb-12 text-zinc-300">

      {/* Header Banner */}
      <div className="border-b border-zinc-900 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
              Candidate Analytics Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, {candidateName}!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time telemetry and scores from your Gemini AI interview sessions.
          </p>
        </div>

        <button
          onClick={fetchDashboardAnalytics}
          className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition cursor-pointer"
        >
          ↻ Refresh Metrics
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -3 }} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Completed Sessions</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{metrics.totalInterviews}</p>
            <p className="text-[11px] text-zinc-500 font-medium mt-1">AI Mock Sessions Logged</p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Aggregate Rating</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{metrics.overallScore}%</p>
            <p className="text-[11px] text-zinc-400 font-medium mt-1">Weighted Mean Score</p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Benchmark Cleared (&gt;80%)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{metrics.highScoresCount}</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">
              {metrics.totalInterviews > 0 ? Math.round((metrics.highScoresCount / metrics.totalInterviews) * 100) : 0}% Success Rate
            </p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>
      </div>

      {/* Main Performance Area Chart */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">Interview Progression Analytics</h3>
            <p className="text-xs text-zinc-500">Historical performance curve across all mock evaluations</p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded-full">
            Realtime Stream
          </span>
        </div>

        <div className="h-64 w-full">
          {metrics.trendData?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} />
                <XAxis dataKey="session" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs font-mono text-zinc-600">
              No interview records completed yet. Complete a session to see performance graphs.
            </div>
          )}
        </div>
      </div>

      {/* Interactive History Table */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-900 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Interview Audit Log</h3>
            <p className="text-xs text-zinc-500">Click any row to open the full evaluation audit page</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role or ID..."
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div className="flex bg-zinc-900 p-0.5 rounded-xl border border-zinc-800 text-[11px] font-mono">
              <button
                onClick={() => setFilterStatus('ALL')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  filterStatus === 'ALL' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('PASSED')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  filterStatus === 'PASSED' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                &ge;80%
              </button>
              <button
                onClick={() => setFilterStatus('NEEDS_REVIEW')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  filterStatus === 'NEEDS_REVIEW' ? 'bg-zinc-800 text-amber-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                &lt;80%
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                <th className="pb-3 font-medium">Session ID / Role</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Duration</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 text-xs">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((session, idx) => {
                  const resolvedId = session._id || session.id;
                  const displayId = session.displayId || resolvedId?.slice(-6)?.toUpperCase() || `INT-${idx + 1}`;

                  return (
                    <tr
                      key={resolvedId || idx}
                      onClick={() => handleViewReport(resolvedId)}
                      className="hover:bg-zinc-900/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3">
                        <p className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {session.role}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500">ID: {displayId}</p>
                      </td>
                      <td className="py-3 text-zinc-400 font-sans">{session.date}</td>
                      <td className="py-3 text-zinc-400">{session.duration || '30 mins'}</td>
                      <td className="py-3">
                        <span className={`font-mono font-bold ${
                          session.score >= 80 ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {session.score}%
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          session.score >= 80
                            ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/50'
                            : 'text-amber-400 bg-amber-950/40 border-amber-900/50'
                        }`}>
                          {session.score >= 80 ? 'Passed' : 'Needs Review'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewReport(resolvedId);
                          }}
                          className="p-1.5 rounded-lg bg-zinc-900 group-hover:bg-cyan-950/50 group-hover:text-cyan-400 group-hover:border-cyan-800/40 border border-zinc-800 transition cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono text-xs">
                    {searchQuery ? 'No matching interviews found for your search query.' : 'No completed interview sessions logged.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}