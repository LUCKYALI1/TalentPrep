import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProofAndFAQs = () => {
  // Frequently Asked Questions Dataset
  const faqData = [
    {
      id: "Q01",
      question: "How does the AI evaluate my interview responses?",
      answer: "Our dual-engine pipeline runs your live audio stream through advanced linguistic modeling and structural logic checks. It simultaneously tracks your logic correctness, words-per-minute (WPM) cadence, filler word density, and keyword alignment criteria against elite role rubrics."
    },
    {
      id: "Q02",
      question: "What exactly is the Resume ATS Tracker?",
      answer: "Before your mock loop starts, our integrated parser scans your uploaded CV to map out keyword matches and identify background filter gaps. The AI interviewer then dynamically customizes its questions to test your real limits in those specific areas."
    },
    {
      id: "Q03",
      question: "Is the voice chat simulation truly zero-latency?",
      answer: "Yes. Our engineering stack is built to stream your voice fragments and return detailed right/wrong analysis, complexity feedback, and alternative response suggestions seconds after your live session ends."
    }
  ];

  // Extended Testimonial Deck to support a smooth running infinite loop Marquee
  const testimonials = [
    {
      quote: "TalentPrep really put me through my paces. It helped me parse exactly what areas to fix and get a top tier engineering job in a practice I love!",
      name: "Katya Samson",
      role: "Dentist",
      initials: "KS",
      color: "from-cyan-500 to-blue-500"
    },
    {
      quote: "I was super nervous for my technical loop, but practicing real-time audio sessions over the grid matrix gave me absolute authority over my presentation.",
      name: "Anonymous Partner",
      role: "Analyst",
      initials: "AP",
      color: "from-blue-500 to-indigo-500"
    },
    {
      quote: "Using this simulator allowed me to sharpen my space trace algorithms and improve my raw speech delivery metrics incredibly fast.",
      name: "Jim Paros",
      role: "Analyst",
      initials: "JP",
      color: "from-indigo-500 to-purple-500"
    },
    {
      quote: "The structural complexity questions it asked were so clever! It felt like sitting right in front of a live principal staff architect.",
      name: "Alison",
      role: "Accountant",
      initials: "AL",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Form submit interceptor
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
      {/* =========================================================
          SAVED CONTEXT: BACKGROUND GRID MATRIX & AMBIENT GLOW
         ========================================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px"
        }}
      />

      {/* Ambient Purple Soft Glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* =========================================================
          CORE CONTENT MASTER WORKSPACE CONTAINER
         ========================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-20">
        
        {/* --- BLOCK 1: ACCORDION FAQS SECTION (Top Stack) --- */}
        <div className="space-y-10 w-full max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Information Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 w-full">
            {faqData.map((item, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div 
                  key={item.id}
                  className={`bg-[#09090b]/90 border rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl transition-all duration-300 ${
                    isOpen ? 'border-zinc-700' : 'border-zinc-900/90 hover:border-zinc-800'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                        isOpen ? 'text-cyan-400 bg-cyan-950/30 border-cyan-900' : 'text-zinc-500 bg-zinc-900 border-zinc-800/80'
                      }`}>
                        {item.id}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold tracking-tight text-zinc-200">
                        {item.question}
                      </h3>
                    </div>
                    <div className="relative h-4 w-4 shrink-0 flex items-center justify-center">
                      <div className={`h-[2px] w-3.5 transition-all duration-300 ${isOpen ? 'bg-cyan-400' : 'bg-zinc-500'}`} />
                      <div className={`absolute h-3.5 w-[2px] transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0 bg-cyan-400' : 'bg-zinc-500'}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal border-t border-zinc-950/40">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- BLOCK 2: SPLIT TWO-COLUMN FORM & AUTO-SCROLL MARQUEE (Bottom Stack) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full pt-8 border-t border-zinc-900/60">
          
          {/* COLUMN A: MODERN INTERACTIVE GLASS FORM (7/12 Cols) */}
          <div className="lg:col-span-7 bg-[#09090b]/90 border border-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm shadow-2xl space-y-6">
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

          {/* COLUMN B: INFINITE VERTICAL MARQUEE STRIP (5/12 Cols) */}
          <div className="lg:col-span-5 h-[380px] lg:h-auto bg-white/[0.01] border border-white/5 rounded-2xl relative overflow-hidden backdrop-blur-sm flex flex-col items-center justify-center">
            
            {/* Top Fade Shading Mask overlay */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            {/* Bottom Fade Shading Mask overlay */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            {/* INFINITE MARQUEE STRIP SLIDER FRAME */}
            <div className="w-full px-4 relative overflow-hidden flex flex-col justify-center h-full">
              <motion.div 
                animate={{ y: [0, -400] }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="space-y-4 w-full flex flex-col absolute top-0 left-0 px-4"
              >
                {/* Double iteration array parsing to simulate perfect loop bounds without breaking layout continuity */}
                {[...testimonials, ...testimonials].map((peer, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/[0.03] border border-white/10 p-5 rounded-xl shadow-inner relative space-y-3 text-left w-full"
                  >
                    <p className="text-xs text-zinc-300 leading-relaxed italic">
                      "{peer.quote}"
                    </p>
                    <div className="flex items-center gap-2.5 pt-2 border-t border-white/5">
                      <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${peer.color} p-[1px] shrink-0 flex items-center justify-center`}>
                        <div className="h-full w-full bg-[#0a0a0c] rounded-full flex items-center justify-center text-[8px] font-mono font-bold text-white">
                          {peer.initials}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-zinc-200">{peer.name}</h4>
                        <p className="text-[9px] font-mono text-zinc-500">{peer.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ProofAndFAQs