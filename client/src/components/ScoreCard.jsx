const ScoreCard = ({ evaluationData }) => {
  if (!evaluationData) return null;

  // Flexible Fallbacks for multiple potential key names from Backend
  const overallScorePercentage = 
    evaluationData.overallScorePercentage ?? 
    evaluationData.overallScore ?? 
    evaluationData.score ?? 0;

  const summary = 
    evaluationData.summary || 
    evaluationData.executiveSummary || 
    evaluationData.overview || 
    evaluationData.overallSummary || 
    '';

  const evaluationsList = 
    evaluationData.evaluations || 
    evaluationData.results || 
    evaluationData.questionEvaluations || 
    evaluationData.telemetry || [];

  // Chart Data with flexible score key
  const chartData = evaluationsList.map((item, index) => ({
    name: `Q${index + 1}`,
    score: item.scorePercentage ?? item.score ?? item.accuracy ?? 0,
  }));

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-mono text-zinc-300">
      
      {/* HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            {summary || 'Summary generated successfully, but waiting for structured output rendering.'}
          </p>
        </div>
      </div>

      {/* DETAILED TELEMETRY LOGS */}
      <div className="space-y-4">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">[DETAILED_TELEMETRY_LOGS]</p>
        
        {evaluationsList.map((evalItem, idx) => {
          const score = evalItem.scorePercentage ?? evalItem.score ?? evalItem.accuracy ?? 0;
          const feedback = evalItem.feedback || evalItem.analysis || evalItem.comment || 'No specific feedback provided.';
          const idealAnswer = evalItem.idealAnswer || evalItem.idealAnswerConcept || evalItem.expectedAnswer || '';
          const qId = evalItem.questionId || evalItem.qId || (idx + 1);

          return (
            <div key={idx} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-zinc-900 text-cyan-400 text-[10px] px-2 py-1 rounded border border-zinc-800 font-bold">
                      Q{qId}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Feedback:</p>
                    <p className="text-sm font-sans text-zinc-300">{feedback}</p>
                  </div>

                  {idealAnswer && score < 100 && (
                    <div className="bg-cyan-950/10 border border-cyan-900/30 p-3 rounded-lg mt-3">
                      <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider mb-1">
                        Ideal Answer Concept
                      </p>
                      <p className="text-xs font-sans text-cyan-100/70">{idealAnswer}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="text-2xl font-black" style={{ color: getScoreColor(score) }}>
                    {score}%
                  </span>
                  <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Accuracy</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreCard;