import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { CheckCircle2, AlertTriangle, Terminal, XCircle } from 'lucide-react';

const ScoreCard = ({ evaluationData }) => {
  if (!evaluationData) return null;

  const { overallScorePercentage, summary, evaluations } = evaluationData;

  // Chart data formatting
  const chartData = evaluations.map((item, index) => ({
    name: `Q${index + 1}`,
    score: item.scorePercentage,
  }));

  // Score color logic
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Emerald
    if (score >= 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-mono text-zinc-300">
      
      {/* HEADER: Overall Score */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="col-span-1 bg-black border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent pointer-events-none" />
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4 z-10">[OVERALL_ACCURACY]</p>
          <div className="relative z-10 flex items-baseline gap-2">
            <span className="text-6xl font-black text-white">{overallScorePercentage}</span>
            <span className="text-2xl text-cyan-500">%</span>
          </div>
          <p className="text-[10px] text-cyan-400 mt-4 tracking-widest uppercase">System Evaluation Complete</p>
        </div>

        <div className="col-span-2 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 relative">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">[EXECUTIVE_SUMMARY]</p>
          <p className="text-sm leading-relaxed text-zinc-300 font-sans">
            {summary}
          </p>
        </div>
      </motion.div>

      {/* GRAPH: Question-wise Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black border border-zinc-800 rounded-2xl p-6 w-full h-80"
      >
         <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">[PERFORMANCE_MATRIX_CHART]</p>
         <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} />
            <YAxis stroke="#52525b" fontSize={12} tickLine={false} domain={[0, 100]} />
            <Tooltip 
              cursor={{ fill: '#18181b' }}
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* DETAILED FEEDBACK LIST */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">[DETAILED_TELEMETRY_LOGS]</p>
        
        {evaluations.map((evalItem, idx) => (
          <div key={idx} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-900 text-cyan-400 text-[10px] px-2 py-1 rounded border border-zinc-800 font-bold">
                    Q{evalItem.questionId || (idx + 1)}
                  </span>
                  {evalItem.scorePercentage >= 80 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : evalItem.scorePercentage >= 50 ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Feedback:</p>
                  <p className="text-sm font-sans text-zinc-300">{evalItem.feedback}</p>
                </div>

                {evalItem.scorePercentage < 100 && (
                  <div className="bg-cyan-950/10 border border-cyan-900/30 p-3 rounded-lg mt-3">
                    <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider flex items-center gap-2 mb-1">
                      <Terminal className="w-3 h-3" /> Ideal Answer Concept
                    </p>
                    <p className="text-xs font-sans text-cyan-100/70">{evalItem.idealAnswer}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-2xl font-black" style={{ color: getScoreColor(evalItem.scorePercentage) }}>
                  {evalItem.scorePercentage}%
                </span>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Accuracy</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScoreCard;