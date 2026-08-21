import React from 'react'

const ContactForm = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#09090b]/90 border border-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm shadow-2xl space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Connect Gateway</span>
        <h3 className="text-xl font-black text-white tracking-tight">Have matching inquiries? Drop a message.</h3>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Your Identity</label>
            <input type="text" placeholder="Dahlia Wolff" className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500/80 transition-colors" />
          </div>
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Mail Routing</label>
            <input type="email" placeholder="dahlia@talentprep.ai" className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500/80 transition-colors" />
          </div>
        </div>
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Queries Token / Message</label>
          <textarea rows="4" placeholder="Describe your evaluation anomalies or custom platform track requirements..." className="w-full bg-white/[0.02] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500/80 transition-colors resize-none" />
        </div>

        <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:opacity-90 text-white font-bold text-xs rounded-xl font-mono tracking-wider uppercase shadow-lg shadow-cyan-500/10 transition-all active:scale-95">
          Dispatch Request ⚡
        </button>
      </form>
    </div>
  )
}

export default React.memo(ContactForm)