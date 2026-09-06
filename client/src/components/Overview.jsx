import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useAuth } from '../hooks/useAuth';

// --- DEMO DATASETS ---
const DEMO_METRICS = {
  totalInterviews: 14,
  overallScore: 82,
  highScoresCount: 9, // Score > 80%
  atsScore: 88,
  resumeUrl: 'https://example.com/demo-resume.pdf',
  resumeFileName: 'Lucky_Ali_Software_Engineer_Resume.pdf',
  lastUpdatedResume: '2 days ago'
};

const INTERVIEW_TREND_DATA = [
  { session: 'Session 1', score: 62, role: 'Frontend' },
  { session: 'Session 2', score: 68, role: 'Frontend' },
  { session: 'Session 3', score: 75, role: 'Full-Stack' },
  { session: 'Session 4', score: 72, role: 'Full-Stack' },
  { session: 'Session 5', score: 84, role: 'Node.js Dev' },
  { session: 'Session 6', score: 81, role: 'Node.js Dev' },
  { session: 'Session 7', score: 89, role: 'SDE-1' },
  { session: 'Session 8', score: 94, role: 'SDE-1' },
];

const SKILL_MASTERY_DATA = [
  { skill: 'React / Next.js', level: 90 },
  { skill: 'Node.js & Express', level: 85 },
  { skill: 'System Design', level: 72 },
  { skill: 'Data Structures', level: 88 },
  { skill: 'Database / SQL', level: 80 },
];

const RECENT_INTERVIEWS = [
  { id: 'INT-8092', role: 'Full-Stack Engineer', date: 'Sep 04, 2026', score: 94, duration: '45 mins', status: 'Passed' },
  { id: 'INT-8088', role: 'Backend Developer (Node.js)', date: 'Aug 29, 2026', score: 89, duration: '30 mins', status: 'Passed' },
  { id: 'INT-8071', role: 'Frontend Developer', date: 'Aug 22, 2026', score: 81, duration: '40 mins', status: 'Passed' },
  { id: 'INT-8054', role: 'System Design Round', date: 'Aug 15, 2026', score: 72, duration: '50 mins', status: 'Needs Review' },
];

// Custom Glassmorphic Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#09090b]/95 border border-zinc-800 p-3 rounded-xl shadow-2xl backdrop-blur-xl text-xs space-y-1">
        <p className="font-semibold text-zinc-300">{label}</p>
        <p className="text-cyan-400 font-mono font-bold">
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

function Overview() {
  const { user } = useAuth();

  const candidateName = user?.firstName
    ? `${user.firstName} ${user?.lastName || ''}`
    : 'Candidate';

  return (
    <div className="w-full space-y-8 pb-12 text-zinc-300">
      
      {/* Header Greeting Banner */}
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
            Here is your live interview performance, skill metrics, and resume ATS readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={DEMO_METRICS.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Active Resume
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Interviews */}
        <motion.div 
          whileHover={{ y: -3 }} 
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Total Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 text-sm">
              🎯
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{DEMO_METRICS.totalInterviews}</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <span>↑ +2 this week</span>
            </p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Overall Score */}
        <motion.div 
          whileHover={{ y: -3 }} 
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Overall Score</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400 text-sm">
              📈
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{DEMO_METRICS.overallScore}%</p>
            <p className="text-[11px] text-zinc-400 font-medium mt-1">
              Average across all domains
            </p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

        {/* High Score Interviews (>80%) */}
        <motion.div 
          whileHover={{ y: -3 }} 
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">High Scores (&gt;80%)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 text-sm">
              🏆
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{DEMO_METRICS.highScoresCount}</p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">
              {Math.round((DEMO_METRICS.highScoresCount / DEMO_METRICS.totalInterviews) * 100)}% Success Rate
            </p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Resume ATS Score */}
        <motion.div 
          whileHover={{ y: -3 }} 
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Resume ATS Score</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400 text-sm">
              📄
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-white">{DEMO_METRICS.atsScore}%</p>
            <p className="text-[11px] text-amber-400 font-medium mt-1">
              Strong ATS Match
            </p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart: Performance Progression */}
        <div className="lg:col-span-2 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Interview Performance Trend</h3>
              <p className="text-xs text-zinc-500">Historical score progress across mock sessions</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded-full">
              Live Tracker
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INTERVIEW_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          </div>
        </div>

        {/* Secondary Bar Chart: Skill Breakdown */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="border-b border-zinc-900 pb-3">
            <h3 className="text-sm font-bold text-white">Technical Competency</h3>
            <p className="text-xs text-zinc-500">Evaluated skill proficiency rating</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_MASTERY_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} horizontal={false} />
                <XAxis type="number" stroke="#71717a" fontSize={10} domain={[0, 100]} hide />
                <YAxis dataKey="skill" type="category" stroke="#a1a1aa" fontSize={10} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="level" radius={[0, 6, 6, 0]} barSize={16}>
                  {SKILL_MASTERY_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.level >= 85 ? '#22d3ee' : entry.level >= 75 ? '#818cf8' : '#f59e0b'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Resume ATS & Recent Interviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Resume ATS Summary Card */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h3 className="text-sm font-bold text-white">Resume & ATS Status</h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                Optimized
              </span>
            </div>

            <div className="mt-4 p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
                📄
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{DEMO_METRICS.resumeFileName}</p>
                <p className="text-[10px] text-zinc-500">Updated {DEMO_METRICS.lastUpdatedResume}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Keyword Match</span>
                <span className="text-emerald-400 font-mono font-semibold">92%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '92%' }} />
              </div>

              <div className="flex justify-between text-zinc-400 pt-1">
                <span>Formatting & Structure</span>
                <span className="text-cyan-400 font-mono font-semibold">95%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '95%' }} />
              </div>

              <div className="flex justify-between text-zinc-400 pt-1">
                <span>Experience Relevance</span>
                <span className="text-indigo-400 font-mono font-semibold">82%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>

          <a
            href={DEMO_METRICS.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 py-2.5 rounded-xl text-xs font-semibold transition-all block"
          >
            Download Attached Resume
          </a>
        </div>

        {/* Recent Interview Log Table */}
        <div className="lg:col-span-2 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Interview Sessions</h3>
              <p className="text-xs text-zinc-500">Summary of recent practical AI evaluations</p>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono">
              Total: {RECENT_INTERVIEWS.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  <th className="pb-3 font-medium">Session ID / Role</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Score</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 text-xs">
                {RECENT_INTERVIEWS.map((session) => (
                  <tr key={session.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3">
                      <p className="font-semibold text-white">{session.role}</p>
                      <p className="text-[10px] font-mono text-zinc-500">{session.id}</p>
                    </td>
                    <td className="py-3 text-zinc-400">{session.date}</td>
                    <td className="py-3 text-zinc-400">{session.duration}</td>
                    <td className="py-3">
                      <span className={`font-mono font-bold ${
                        session.score >= 80 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {session.score}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        session.score >= 80
                          ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/50'
                          : 'text-amber-400 bg-amber-950/40 border-amber-900/50'
                      }`}>
                        {session.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-900">
            Scores above 80% indicate high eligibility for technical client interviews.
          </p>
        </div>

      </div>

    </div>
  );
}

export default React.memo(Overview);