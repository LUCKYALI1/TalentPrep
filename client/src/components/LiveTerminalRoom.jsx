import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import api from '../utils/api' // Aapka Axios instance
import ScoreCard from '../components/ScoreCard' // 👈 Naya ScoreCard Component Import kiya hai

const LiveTerminalRoom = () => {
  const navigate = useNavigate()
  const { id: interviewId } = useParams()
  const location = useLocation()

  // 📡 Schedule interview screen se aaya hua payload
  const serverData = location.state?.interviewData

  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [textAnswer, setTextAnswer] = useState('')
  
  const [isLoading, setIsLoading] = useState(true)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationReport, setEvaluationReport] = useState(null)

  const recognitionRef = useRef(null)

  // 1. 🚀 Centralized Axios Instance se Interview Session Start karo
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const payload = {
          interviewId: interviewId || `SESSION-${Date.now()}`,
          jobRole: serverData?.jobRole || 'MERN Full-Stack Developer',
          techStack: serverData?.techStack || ['React', 'Node.js', 'MongoDB'],
          yearOfExperience: Number(serverData?.experienceYears || serverData?.experience || 2)
        }

        console.log('[START SESSION PAYLOAD]:', payload)

        const response = await api.post('/interviews/start', payload)
        console.log('[SESSION START RESPONSE]:', response)
        
        // 🛡️ Safe Extraction Logic
        const rootData = response.data?.data || response.data || response;
        const extractedQuestions = rootData?.questions || rootData?.data?.questions || [];

        console.log('[EXTRACTED QUESTIONS]:', extractedQuestions);

        if (extractedQuestions && extractedQuestions.length > 0) {
          setQuestions(extractedQuestions)
        } else {
          // Fallback agar kisi wajah se array empty aaye
          setQuestions([
            "Explain the difference between SQL and NoSQL databases.",
            "How does Node.js handle asynchronous operations internally?",
            "Describe how React's virtual DOM works and its performance benefits."
          ]);
        }
      } catch (err) {
        console.error('Session initialization failed:', err)
        // Catch block fallback so screen is never blank
        setQuestions([
          "What are the core concepts of React and MERN stack development?",
          "Explain how asynchronous code executes in JavaScript Event Loop.",
          "How do you design scalable RESTful APIs in Node.js/Express?"
        ]);
      } finally {
        setIsLoading(false)
      }
    }

    initializeSession()
  }, [interviewId, serverData])

  const currentQuestion = questions[currentIdx]

  // 2. 🎙️ WEB SPEECH RECOGNITION (Voice to Text Converter)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setTextAnswer(transcript)
      }

      recognition.onerror = (err) => console.error('Speech recognition error:', err)
      recognition.onend = () => setIsRecording(false)

      recognitionRef.current = recognition
    }
  }, [])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.')
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  // 3. 🔊 Question TTS Reader
  useEffect(() => {
    if (currentQuestion) {
      setIsAISpeaking(true)

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const questionText = typeof currentQuestion === 'string' ? currentQuestion : currentQuestion.question
        const utterance = new SpeechSynthesisUtterance(questionText)
        utterance.rate = 0.95
        utterance.pitch = 1.0

        utterance.onend = () => setIsAISpeaking(false)
        utterance.onerror = () => setIsAISpeaking(false)

        window.speechSynthesis.speak(utterance)
      } else {
        const fallbackTimer = setTimeout(() => setIsAISpeaking(false), 3000)
        return () => clearTimeout(fallbackTimer)
      }
    }

    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [currentIdx, currentQuestion])

  // 4. 📤 Submit Answer via Axios & Next Question Flow
  const handleAnswerSubmit = async (e) => {
    e?.preventDefault()
    
    if (!textAnswer.trim() && !isRecording) {
      alert('Please provide a text answer or complete voice recording before proceeding.')
      return
    }

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }

    if ('speechSynthesis' in window) window.speechSynthesis.cancel()

    // Save answer payload via Axios Client
    try {
      await api.patch(`/interviews/${interviewId}/answers`, {
        questionIndex: currentIdx,
        answerText: textAnswer
      })
    } catch (err) {
      console.error('Failed to save answer:', err)
    }

    setTextAnswer('')

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1)
    } else {
      triggerEvaluation()
    }
  }

  // 5. 🤖 Final Gemini Evaluation Trigger (FIXED)
  const triggerEvaluation = async () => {
    setIsEvaluating(true)
    try {
      const response = await api.post(`/interviews/${interviewId}/evaluate`)
      console.log("EVALUATION RAW RESPONSE:", response.data); 
      
      const resData = response.data
      
      // ✅ Super flexible condition
      if (resData.success || resData.statusCode === 200 || resData.data || resData.overallScorePercentage) {
        setEvaluationReport(resData.data || resData); 
      } else {
        setEvaluationReport(resData); 
      }
    } catch (err) {
      console.error('Evaluation call failed:', err)
    } finally {
      setIsEvaluating(false)
    }
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs tracking-widest text-zinc-400 uppercase">INITIALIZING GEMINI QUESTIONS PIPELINE...</p>
      </div>
    )
  }

  // Evaluation Screen
  if (isEvaluating) {
    return (
      <div className="w-full min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs tracking-widest text-emerald-400 uppercase">COMPUTING CANDIDATE EVALUATION TELEMETRY...</p>
      </div>
    )
  }

  // 🚀 Final Evaluation Report View (Clean UI using ScoreCard Component)
  if (evaluationReport) {
    return (
      <div className="w-full min-h-screen bg-black text-white font-mono p-4 md:p-8 flex flex-col justify-between overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full">
          <ScoreCard evaluationData={evaluationReport} />
        </div>
        
        <div className="flex justify-center pt-10 pb-4">
          <button
            onClick={() => navigate('/services/interview')}
            className="px-8 h-12 bg-cyan-400 text-black text-sm font-black uppercase tracking-wider rounded-xl hover:bg-cyan-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const questionString = typeof currentQuestion === 'string' ? currentQuestion : currentQuestion?.question

  return (
    <div className="w-full min-h-screen bg-black text-white font-mono flex flex-col justify-between selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      
      {/* Header Bar */}
      <header className="w-full h-16 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] tracking-wider text-zinc-300 uppercase font-bold">
              LIVE EVALUATION ENGINE
            </span>
          </div>
          <span className="text-zinc-800">|</span>
          <span className="text-[10px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-900/50">
            ID: {interviewId || 'LIVE-ACTIVE'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-zinc-200 font-bold">{serverData?.jobRole || 'MERN Full-Stack Developer'}</span>
            <span className="text-[10px] text-zinc-500">{serverData?.companyTier || 'Tier 2 Startup'}</span>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to exit the ongoing interview?')) {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel()
                if (recognitionRef.current) recognitionRef.current.stop()
                navigate('/services/interview')
              }
            }}
            className="text-[10px] tracking-widest text-zinc-500 hover:text-red-400 uppercase border border-zinc-900 hover:border-red-900/40 bg-zinc-950 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            [× ABORT SESSION]
          </button>
        </div>
      </header>

      {/* Main Grid Body */}
      <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10 p-6 gap-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* LEFT PANEL */}
        <section className="lg:col-span-4 border border-zinc-900 bg-zinc-950/40 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm space-y-6">
          <div className="space-y-6">
            
            <div className="p-4 rounded-xl bg-black border border-zinc-900 space-y-2 text-left">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Assessed Role</span>
              <p className="text-sm font-bold text-cyan-400">{serverData?.jobRole || 'MERN FULL-STACK DEVELOPER'}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(serverData?.techStack || ['React', 'Node.js', 'MongoDB']).map((tech, i) => (
                  <span key={i} className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Questions Tracker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-bold tracking-wider uppercase">[PROGRESS_STREAM]</span>
                <span className="text-cyan-400 font-bold">{currentIdx + 1} / {questions.length}</span>
              </div>

              <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                {questions.map((q, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      idx === currentIdx
                        ? 'bg-cyan-950/20 border-cyan-500/50 text-cyan-200'
                        : idx < currentIdx
                        ? 'bg-emerald-950/10 border-emerald-900/30 text-emerald-400'
                        : 'bg-black/40 border-zinc-900 text-zinc-600'
                    }`}
                  >
                    <span className="font-bold text-[11px]">QUESTION {(idx + 1).toString().padStart(2, '0')}</span>
                    <span className="text-[9px] uppercase tracking-wider">
                      {idx === currentIdx ? '● ACTIVE' : idx < currentIdx ? '✓ SUBMITTED' : 'LOCKED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* AI Voice State */}
          <div className="p-3.5 rounded-xl border bg-black border-zinc-900 flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${isAISpeaking ? 'bg-cyan-400 animate-ping' : 'bg-zinc-700'}`} />
            <div className="text-[10px] text-left">
              <p className="text-zinc-300 font-bold uppercase">{isAISpeaking ? 'AI EVALUATOR SPEAKING' : 'AWAITING RESPONSE'}</p>
              <p className="text-zinc-600">Audio Synth Engine: {isAISpeaking ? 'ACTIVE STREAM' : 'IDLE'}</p>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="lg:col-span-8 border border-zinc-900 bg-zinc-950/30 rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative backdrop-blur-sm space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="text-[10px] text-cyan-400 font-black tracking-widest uppercase bg-cyan-950/30 border border-cyan-900 px-2.5 py-1 rounded">
                EXPERIENCE: {serverData?.experienceYears || 2} YEARS
              </span>
              <button 
                type="button"
                onClick={() => {
                  if ('speechSynthesis' in window && questionString) {
                    window.speechSynthesis.cancel()
                    const u = new SpeechSynthesisUtterance(questionString)
                    setIsAISpeaking(true)
                    u.onend = () => setIsAISpeaking(false)
                    window.speechSynthesis.speak(u)
                  }
                }}
                className="text-[10px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
              >
                <span>🔊 REPLAY QUESTION</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIdx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3 text-left"
              >
                <span className="text-[11px] text-zinc-500 font-bold block">&gt; QUESTION {currentIdx + 1} OF {questions.length}</span>
                <h3 className="text-lg lg:text-xl font-bold text-zinc-100 leading-relaxed font-sans">
                  {questionString}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                  Your Technical Response
                </label>
                <span className="text-[10px] text-zinc-600">
                  {isRecording ? '● Live Recording Active' : 'Voice or Text Input'}
                </span>
              </div>

              <textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Speak via microphone or type your response here..."
                rows={6}
                className="w-full bg-black border border-zinc-900 rounded-xl p-4 text-sm font-sans text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={toggleRecording}
                className={`h-11 px-4 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isRecording 
                    ? 'bg-red-950/40 border-red-500 text-red-400 animate-pulse'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-zinc-500'}`} />
                <span>{isRecording ? 'STOP RECORDING' : 'RECORD VOICE'}</span>
              </button>

              <button
                type="submit"
                className="h-11 px-6 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                <span>{currentIdx + 1 === questions.length ? 'FINISH & EVALUATE' : 'SAVE & NEXT'}</span>
              </button>
            </div>
          </form>

        </section>
      </main>

      <footer className="w-full h-10 border-t border-zinc-900 bg-zinc-950/90 px-6 flex items-center justify-between text-[10px] text-zinc-600 shrink-0 z-20">
        <span>AUDIO SYNTH & SPEECH ENGINE: ONLINE</span>
        <span>CONNECTED VIA API CLIENT [PORT 3000]</span>
      </footer>

    </div>
  )
}

export default LiveTerminalRoom