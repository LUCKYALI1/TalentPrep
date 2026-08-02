import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const InterviewTerminal = () => {
  const navigate = useNavigate()
  const { id: interviewId } = useParams() // 🆔 MongoDB _id route parameter
  const location = useLocation()

  // 📡 Backend payload state passed via navigate state
  const serverData = location.state?.interviewData

  const [isLoading, setIsLoading] = useState(true)
  const [isTimeReached, setIsTimeReached] = useState(false)
  const [timeRemainingText, setTimeRemainingText] = useState('')

  useEffect(() => {
    // Simulated DB fetch delay for smooth load transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // ⏰ Scheduled Time Check Logic
  useEffect(() => {
    if (!serverData?.scheduledAt) {
      // Agar backend se date nahi aayi to default allowed rakhein ya test mode manage karein
      setIsTimeReached(true)
      return
    }

    const checkTime = () => {
      const now = new Date().getTime()
      const scheduledTime = new Date(serverData.scheduledAt).getTime()
      const diff = scheduledTime - now

      if (diff <= 0) {
        setIsTimeReached(true)
        setTimeRemainingText('SESSION READY')
      } else {
        setIsTimeReached(false)

        // Baki time calculate karein (Hours, Minutes, Seconds)
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        if (hours > 24) {
          const days = Math.floor(hours / 24)
          setTimeRemainingText(`Starts in ${days} d ${hours % 24} h`)
        } else if (hours > 0) {
          setTimeRemainingText(`Starts in ${hours}h ${minutes}m`)
        } else {
          setTimeRemainingText(`Starts in ${minutes}m ${seconds}s`)
        }
      }
    }

    checkTime()
    const interval = setInterval(checkTime, 1000) // Har second update
    return () => clearInterval(interval)
  }, [serverData])

  // Date aur time formatting logic
  const formattedScheduledTime = serverData?.scheduledAt
    ? new Date(serverData.scheduledAt).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
    : 'SCHEDULED & VERIFIED'

  // 🚪 Enter Live Room Button Click Handler
  const handleEnterLiveRoom = () => {
    // Option 1: Agar scheduledAt date missing hai (Fallback/Test Mode)
    if (!serverData?.scheduledAt) {
      navigate(`/services/interview/live/${interviewId || ''}`, {
        state: { interviewData: serverData }
      })
      return
    }

    const now = new Date().getTime()
    const scheduledTime = new Date(serverData.scheduledAt).getTime()

    // Option 2: Scheduled time complete hone par Live Room me redirect
    if (now >= scheduledTime) {
      navigate(`/services/interview/live/${interviewId}`, {
        state: { interviewData: serverData } // 📡 Live Room ko MongoDB Data pass ho raha hai
      })
    } else {
      // Option 3: Time baki rehne par notification alert
      alert(
        `Interview ka time abhi nahi hua hai!\nScheduled Time: ${formattedScheduledTime}\nPlease wait until the session time.`
      )
    }
  }

  return (
    <div className="w-full min-h-screen bg-black text-white font-mono flex flex-col justify-between selection:bg-cyan-500 selection:text-black overflow-hidden relative">

      {/* 📡 Top Status Grid Header */}
      <header className="w-full h-16 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">


        <button
          onClick={() => navigate('/services/interview')}
          className="text-[10px] tracking-widest text-zinc-500 hover:text-red-400 uppercase border border-zinc-900 hover:border-red-900/40 bg-zinc-950 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          [× EXIT SHELL]
        </button>
      </header>

      {/* 🌪️ Main Body Area */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10 p-6 lg:p-8 gap-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* LEFT PANEL: DATABASE SYSTEM METRICS LOGS (COL 5) */}
        <section className="lg:col-span-5 border border-zinc-900 bg-zinc-950/30 rounded-2xl flex flex-col justify-between p-6 space-y-6 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="text-xs font-black text-zinc-400 tracking-widest uppercase">
                [DATABASE_RECORD_SHELL]
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded border ${isTimeReached
                  ? 'text-emerald-400 bg-emerald-950/30 border-emerald-900/40'
                  : 'text-amber-400 bg-amber-950/30 border-amber-900/40'
                }`}>
                ● {isTimeReached ? 'SESSION ACTIVE' : 'TIMED LOCK'}
              </span>
            </div>

            {/* Dynamic System Terminal Output Log */}
            <div className="space-y-3 text-left font-mono text-xs">
              <div className="p-3.5 rounded-xl border bg-black/60 border-zinc-800 text-zinc-400 space-y-1.5">
                <p className="text-[10px] text-cyan-400 font-bold">&gt; PIPELINE STATUS</p>
                <p className="text-zinc-300">Interview payload fetched successfully from primary cluster node.</p>
              </div>

              <div className="p-3.5 rounded-xl border bg-black/60 border-zinc-800 text-zinc-400 space-y-1.5">
                <p className="text-[10px] text-cyan-400 font-bold">&gt; CONFIGURATION SUMMARY</p>
                <p className="text-zinc-300">Target Role: <span className="text-cyan-300 font-bold">{serverData?.jobRole || 'FULL-STACK DEVELOPER'}</span></p>
                <p className="text-zinc-300">Target Company: <span className="text-cyan-300 font-bold">{serverData?.companyTier || 'TIER-1 / TARGET TECH'}</span></p>
                <p className="text-zinc-300">Tech Stack Focus: <span className="text-cyan-300 font-bold">{serverData?.techStack?.join(', ') || 'MERN / Web Architecture'}</span></p>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${isTimeReached
                  ? 'bg-emerald-950/10 border-emerald-900/30 text-emerald-300'
                  : 'bg-amber-950/10 border-amber-900/30 text-amber-300'
                }`}>
                <p className="text-[10px] font-bold">{isTimeReached ? '&gt; LIVE STATUS' : '&gt; COUNTDOWN ACTIVE'}</p>
                <p className="text-zinc-300 text-[11px]">
                  {isTimeReached
                    ? 'The interview window is now live. Click "Enter Live Room" to begin.'
                    : `Time Remaining: ${timeRemainingText}`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: INTERVIEW DETAILS CARD (COL 7) */}
        <section className="lg:col-span-7 border border-zinc-900 bg-zinc-950/40 rounded-2xl flex flex-col justify-center items-center p-8 relative backdrop-blur-sm">

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-zinc-500 uppercase tracking-widest">FETCHING INTERVIEW PARAMETERS...</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl space-y-8"
              >
                {/* Header Status Badge */}
                <div className="text-center space-y-2">
                  <span className={`text-[10px] tracking-widest uppercase font-black px-3 py-1 rounded-full border ${isTimeReached
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-950/30 border-amber-500/30 text-amber-400'
                    }`}>
                    {isTimeReached ? '✓ SESSION READY TO ENTER' : `⏱ ${timeRemainingText}`}
                  </span>
                  <h2 className="text-2xl font-black text-white tracking-wide uppercase mt-4">
                    {serverData?.jobRole || 'MERN FULL-STACK DEVELOPER'}
                  </h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">
                    Target Evaluation Tier: <span className="text-zinc-300">{serverData?.companyTier || 'Product Firm'}</span>
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-black border border-zinc-900 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Candidate Email / User</span>
                    <p className="text-xs text-cyan-400 font-semibold truncate">{serverData?.candidateEmail || serverData?.userEmail || 'Active Candidate'}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-zinc-900 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Scheduled Time</span>
                    <p className="text-xs text-cyan-400 font-semibold">{formattedScheduledTime}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-zinc-900 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Experience Level</span>
                    <p className="text-xs text-zinc-300 font-semibold">{serverData?.experienceLevel || serverData?.yoe || 'Intermediate / Senior'}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-zinc-900 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">Session Type</span>
                    <p className="text-xs text-zinc-300 font-semibold">{serverData?.interviewType || 'AI Technical Assessment'}</p>
                  </div>
                </div>

                {/* Focus Areas Tag Cloud */}
                {serverData?.techStack && serverData.techStack.length > 0 && (
                  <div className="text-left space-y-2">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">Assessed Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {serverData.techStack.map((tech, index) => (
                        <span key={index} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/services/interview')}
                    className="flex-1 h-11 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-zinc-800"
                  >
                    Return to Dashboard
                  </button>

                  <button
                    onClick={handleEnterLiveRoom}
                    className={`flex-1 h-11 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${isTimeReached
                        ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                      }`}
                  >
                    <span>{isTimeReached ? 'Enter Live Room' : 'Locked (Waiting)'}</span>
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </section>
      </main>

      {/* Footer Bar */}
      <footer className="w-full h-12 border-t border-zinc-900 bg-zinc-950/80 px-6 flex items-center justify-between text-[10px] text-zinc-600 shrink-0">
        <span>STATUS: {isTimeReached ? 'PIPELINE_ACTIVE' : 'PIPELINE_LOCK_WAITING_SCHEDULE'}</span>
        <span>DATABASE CLUSTER: ACTIVE</span>
      </footer>

    </div>
  )
}

export default InterviewTerminal