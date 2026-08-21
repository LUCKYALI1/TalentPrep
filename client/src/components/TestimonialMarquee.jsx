import React from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
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

const TestimonialMarquee = () => {
  return (
    <div className="w-full h-[420px] min-h-[420px] bg-white/[0.01] border border-white/5 rounded-2xl relative overflow-hidden backdrop-blur-sm flex flex-col justify-center">
      {/* Top/Bottom Fade Masks */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      {/* Infinite Vertical Strip Container */}
      <div className="w-full h-full relative overflow-hidden">
        <motion.div 
          animate={{ y: [0, -400] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="space-y-4 w-full flex flex-col absolute top-0 left-0 px-4 pt-4"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((peer, idx) => (
            <div 
              key={`${peer.name}-${idx}`}
              className="bg-white/[0.03] border border-white/10 p-5 rounded-xl shadow-inner space-y-3 text-left w-full shrink-0"
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
  )
}

export default React.memo(TestimonialMarquee)