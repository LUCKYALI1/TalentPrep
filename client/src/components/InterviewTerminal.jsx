import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const InterviewTerminal = () => {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [isAISpeaking, setIsAISpeaking] = useState(true)
  const [textInput, setTextInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState([
    { timestamp: '19:01:05', type: 'SYS', content: 'INITIALIZING CORE AI INTERVIEW EVALUATOR FRAMEWORK...' },
    { timestamp: '19:01:08', type: 'SYS', content: 'AUDIO CAPTURE PIPELINES: ONLINE.' },
    { timestamp: '19:01:10', type: 'AI', content: 'Welcome. I have initialized your execution pipeline. Let\'s begin by exploring your core technical stack experience. Can you break down your implementation workflow for managing state synchronization or complex rendering trees in highly scalable environments?' }
  ])

  // Simulate AI voice waveform activity cycles for UI demonstration
  useEffect(() => {
    const speakInterval = setInterval(() => {
      setIsAISpeaking(prev => !prev)
    }, 6000)
    return () => clearInterval(speakInterval)
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!textInput.trim()) return
    
    const time = new Date().toLocaleTimeString('en-US', { hour12: false })
    setTerminalLogs(prev => [
      ...prev,
      { timestamp: time, type: 'USER', content: textInput.trim() }
    ])
    setTextInput('')
    
    // Trigger mock AI speaking simulation response flow after user feedback submission
    setTimeout(() => {
      setIsAISpeaking(true)
      setTerminalLogs(prev => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'AI', content: 'Acknowledged. Computing syntax and parsing logic structures...' }
      ])
    }, 1500)
  }

  return (
    <div className="w-full min-h-screen bg-black text-white font-mono flex flex-col justify-between selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      
      {/* 📡 Top Status Grid Network Header */}
      <header className="w-full h-16 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] tracking-wider text-zinc-400 uppercase font-black">LIVE STREAMING CONTAINER SESSION</span>
          </div>
          <span className="text-zinc-800">|</span>
          <span className="text-[10px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-950">ID: TX_7792X</span>
        </div>

        <button 
          onClick={() => navigate('/services/interview')}
          className="text-[10px] tracking-widest text-zinc-600 hover:text-red-400 uppercase border border-zinc-900 hover:border-red-900/40 bg-black px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          [× TERMINATE PIPELINE]
        </button>
      </header>

      {/* 🌪️ Core Grid Matrix Body Workspace Area */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT PANEL: QUESTION FEED AND SYSTEM SHELL METRICS (COL 5)                */}
        {/* ========================================================================= */}
        <section className="lg:col-span-5 border-r border-zinc-900 bg-zinc-950/20 flex flex-col justify-between overflow-y-auto p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="text-xs font-black text-zinc-400 tracking-widest uppercase">[EVALUATION_SHELL_LOGS]</span>
              <span className="text-[9px] text-zinc-600">STRICT LOGGING MODE</span>
            </div>

            <div className="space-y-4 text-left">
              <AnimatePresence initial={false}>
                {terminalLogs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                      log.type === 'AI' 
                        ? 'bg-cyan-950/10 border-cyan-900/40 text-cyan-100' 
                        : log.type === 'USER' 
                        ? 'bg-zinc-900/30 border-zinc-800 text-zinc-300' 
                        : 'bg-black border-transparent text-zinc-500 text-[11px]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[10px] opacity-80">
                      <span className={log.type === 'AI' ? 'text-cyan-400' : log.type === 'USER' ? 'text-blue-400' : 'text-zinc-600'}>
                        {log.type === 'AI' ? '◆ CORE_ENGINE_AI' : log.type === 'USER' ? '◆ USER_SESSION_NODE' : '⚙️ PIPELINE_SYSTEM'}
                      </span>
                      <span className="text-[9px] text-zinc-600">{log.timestamp}</span>
                    </div>
                    <p className="font-sans font-normal text-zinc-300 tracking-wide">{log.content}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Prompt status diagnostics block helper */}
          <div className="pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 space-y-1">
            <p>&gt; Semantic complexity engine: stable</p>
            <p>&gt; Pipeline response validation latency: 84ms</p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* RIGHT PANEL: IMMERSIVE AUDIO MATRIX AND LIVE DYNAMIC WAVEFORM (COL 7)     */}
        {/* ========================================================================= */}
        <section className="lg:col-span-7 bg-black flex flex-col items-center justify-center relative p-8">
          
          {/* Subtle underlying background layout grid indicators */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Realtime Core Waveform Visualization Cluster */}
          <div className="w-full max-w-lg flex flex-col items-center space-y-8 relative">
            
            <div className="text-center space-y-2">
              <span className={`text-[10px] tracking-widest uppercase font-black px-2.5 py-0.5 rounded border transition-all ${
                isAISpeaking 
                  ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400 animate-pulse' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}>
                {isAISpeaking ? '[ENGINE_TRANSMITTING_AUDIO_STREAM]' : '[ENGINE_AWAITING_RESPONSE_ARRAY]'}
              </span>
            </div>

            {/* 🌊 Dynamic Centered Audio Frequency Line Node */}
            <div className="w-full h-40 flex items-center justify-center gap-[6px] relative px-4">
              
              {/* Ground level fallback absolute center axis matrix target line */}
              <div className="absolute left-0 right-0 h-[1px] bg-zinc-900 z-0" />

              {/* Dynamic generated audio sample modules array bars */}
              {Array.from({ length: 28 }).map((_, index) => {
                // Generate layout variance for structural frequency mapping weights
                const centerMultiplier = Math.sin((index / 27) * Math.PI);
                return (
                  <motion.div
                    key={index}
                    animate={isAISpeaking ? {
                      height: [
                        `${15 * centerMultiplier}px`, 
                        `${(70 + Math.random() * 80) * centerMultiplier}px`, 
                        `${15 * centerMultiplier}px`
                      ]
                    } : {
                      height: ["2px", "4px", "2px"]
                    }}
                    transition={{
                      duration: isAISpeaking ? 0.6 + (index % 4) * 0.1 : 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-[4px] rounded-full transition-colors duration-500 z-10 ${
                      isAISpeaking 
                        ? 'bg-gradient-to-t from-cyan-500 via-blue-400 to-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                        : 'bg-zinc-800'
                    }`}
                  />
                );
              })}
            </div>

            {/* Live capture operational analytics readout */}
            <div className="font-mono text-[10px] text-zinc-500 text-center tracking-widest uppercase">
              Frequency Array // 44.1 kHz Decibel Module Ingest
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 📥 BOTTOM CONTROLS: RUNTIME LIVE RECORDING AND DISPATCH CONSOLE          */}
      {/* ========================================================================= */}
      <footer className="w-full h-24 border-t border-zinc-900 bg-[#09090b]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between gap-6 z-20 shrink-0">
        
        {/* Left Interactive Audio Action Node */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsRecording(!isRecording)}
            className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isRecording 
                ? 'bg-red-950/30 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {isRecording ? (
              <div className="h-4 w-4 bg-red-500 rounded animate-pulse" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3v-6a3 3 0 0 1 6 0v6a3 3 0 0 1-3 3Z" />
              </svg>
            )}
          </button>
          
          <div className="hidden sm:block text-left">
            <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">
              {isRecording ? 'STREAMING LOCAL MIC AUDIO' : 'VOICE STREAM READY'}
            </p>
            <p className="text-[9px] text-zinc-600 uppercase">Input channel: Default Array Dev</p>
          </div>
        </div>

        {/* Center/Right Dynamic Response Text Transmission Box Bar */}
        <form onSubmit={handleSendMessage} className="flex-1 max-w-3xl flex items-center gap-3 relative">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your strategic architectural syntax answer payload response here..."
            className="flex-1 h-12 bg-black border border-zinc-900 rounded-xl px-4 text-xs font-sans text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-normal"
          />
          
          <button
            type="submit"
            className="h-12 px-6 bg-cyan-400 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyan-300 transition-all cursor-pointer flex items-center gap-2 active:scale-98 shrink-0"
          >
            <span>DISPATCH</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </form>

      </footer>

    </div>
  )
}

export default InterviewTerminal;