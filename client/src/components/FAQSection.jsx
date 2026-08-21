import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_DATA = [
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

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-10 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Information Hub
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 w-full">
        {FAQ_DATA.map((item, idx) => {
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
  )
}

export default React.memo(FAQSection)