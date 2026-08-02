import React from 'react'
import { motion } from 'framer-motion'

const WhyChoose = () => {
  const steps = [
    {
      id: "01",
      tag: "STEP ONE",
      title: "Choose a Role & Parse ATS",
      desc: "Select your target engineering or corporate role, or upload your resume. Our integrated ATS parser breaks down key job matching requirements and filters before tailoring your logic track.",
      color: "from-cyan-400 via-blue-500 to-indigo-500",
      glow: "rgba(6,182,212,0.1)",
      features: ["ATS Score Matching", "Role-Specific Metrics", "Custom Job Rubrics"]
    },
    {
      id: "02",
      tag: "STEP TWO",
      title: "Start Your Mock Session",
      desc: "Launch a realistic, video-based mock interview simulator. Answer dynamically generated questions on stream while our engine evaluates your pacing, facial metrics, and content live.",
      color: "from-blue-500 via-indigo-500 to-purple-500",
      glow: "rgba(99,102,241,0.1)",
      features: ["Live Audio/Video Stream", "Pacing & Tone Analytics", "Anti-Cheating Detection"]
    },
    {
      id: "03",
      tag: "STEP THREE",
      title: "Get AI-Based Feedback",
      desc: "Receive instant, deep-dive evaluation diagnostics. Unpack your overall response grading, exact keyword alignment matrices, alternative ideal responses, and structural speech data.",
      color: "from-indigo-500 via-purple-500 to-pink-500",
      glow: "rgba(168,85,247,0.1)",
      features: ["Right/Wrong Logic Audits", "Keyword Gap Analysis", "Pacing & Filler Flags"]
    },
  ];

  return (
    <section className="relative w-full bg-black py-16 sm:py-24 border-t border-zinc-900 px-4 sm:px-6 lg:px-8 overflow-hidden select-none font-sans">
      
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
      
      {/* Left Focus Frame Simulation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-8 w-16 h-16 border-l border-t border-zinc-800 rounded-tl-2xl" />
        <div className="absolute top-1/4 left-12 w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2" />
        
        <div className="absolute bottom-1/4 right-8 w-16 h-16 border-r border-b border-zinc-800 rounded-br-2xl" />
        <div className="absolute bottom-1/4 right-10 flex items-center gap-1.5 mb-8 font-mono text-[9px] text-zinc-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SYS: ACTIVE
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block Matching Main Context */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Workflow Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Unlock Your Interview Success in <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Our dual-engine platform blends predictive Resume ATS tracking with a live AI diagnostic suite to simulate tier-one technical panels.
          </p>
        </div>

        {/* =========================================================
            3-STEP SYSTEM GRID (Responsive Card Layout)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ 
                y: -6,
                boxShadow: `0 20px 40px -15px ${step.glow}`
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative rounded-2xl border border-zinc-900 bg-[#09090b]/90 p-6 lg:p-8 overflow-hidden flex flex-col justify-between backdrop-blur-sm shadow-2xl transition-all duration-300 hover:border-zinc-800"
            >
              
              {/* Linear Top Accent Line Highlight */}
              <div className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div>
                {/* Step Metadata Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase">
                    {step.tag}
                  </span>
                  <span className={`text-xs font-mono font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent px-2.5 py-0.5 rounded-md bg-zinc-900/30 border border-zinc-900`}>
                    {step.id}
                  </span>
                </div>

                {/* Core Text Section */}
                <h3 className="text-lg font-bold text-zinc-200 transition-colors duration-200 group-hover:text-white mb-3 flex items-center justify-between">
                  {step.title}
                  
                  {/* Non-Icon Pure CSS Audio Processing Simulator */}
                  <div className="flex items-center gap-[2px] h-3 w-5 justify-center opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                    <span className={`w-[2px] h-1.5 rounded-full bg-gradient-to-t ${step.color} animate-[pulse_0.5s_infinite_alternate]`} />
                    <span className={`w-[2px] h-3 rounded-full bg-gradient-to-t ${step.color} animate-[pulse_0.4s_infinite_alternate_0.1s]`} />
                    <span className={`w-[2px] h-2 rounded-full bg-gradient-to-t ${step.color} animate-[pulse_0.6s_infinite_alternate_0.2s]`} />
                  </div>
                </h3>
                
                <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Step Key Features Badges Container */}
              <div className="pt-4 border-t border-zinc-900 space-y-2 mt-auto">
                {step.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2 text-[11px] text-zinc-500 group-hover:text-zinc-400 font-mono transition-colors duration-200">
                    <span className="text-cyan-400 text-[8px]">✦</span>
                    {feature}
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;