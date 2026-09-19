import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Mic, 
  MicOff, 
  Volume2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  X, 
  FileText, 
  Activity, 
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Cpu
} from 'lucide-react';
import api from '../utils/api';
import ScoreCard from './ScoreCard';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px',
};

export default function InterviewTerminal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcripts, setTranscripts] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Popup Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluationData, setEvaluationData] = useState(null);

  const recognitionRef = useRef(null);
  const currentQ = questions[currentIndex];

  useEffect(() => {
    const savedLocal = localStorage.getItem(`talentprep_transcript_${id}`);
    if (savedLocal) {
      try {
        setTranscripts(JSON.parse(savedLocal));
      } catch (err) {
        console.error('Error reading saved transcript:', err);
      }
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }

        setTranscripts((prev) => {
          const qId = currentQ?.questionId || currentIndex;
          const updated = {
            ...prev,
            [qId]: (prev[qId] || '') + ' ' + currentTranscript
          };
          localStorage.setItem(`talentprep_transcript_${id}`, JSON.stringify(updated));
          return updated;
        });
      };

      recognition.onerror = (err) => {
        console.error('Speech Recognition Error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      alert('Your browser does not support Speech Recognition. Please use Google Chrome.');
    }
  }, [id, currentIndex, currentQ]);

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window && currentQ) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQ.questionText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentQ) {
      handleSpeakQuestion();
    }
  }, [currentIndex, currentQ]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      window.speechSynthesis.cancel();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    const qId = currentQ?.questionId || currentIndex;
    setTranscripts((prev) => {
      const updated = { ...prev, [qId]: text };
      localStorage.setItem(`talentprep_transcript_${id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmitFinal = async () => {
    if (isListening && recognitionRef.current) recognitionRef.current.stop();
    window.speechSynthesis.cancel();

    setIsSubmitting(true);
    try {
      const formattedPayload = questions.map((q) => ({
        questionId: q.questionId,
        questionText: q.questionText,
        userAnswerText: transcripts[q.questionId] || 'No answer provided.'
      }));

      const res = await api.post(`/interview/${id}/evaluate`, { transcripts: formattedPayload });

      console.log('Backend Raw Response:', res.data);

      localStorage.removeItem(`talentprep_transcript_${id}`);

      const reportPayload = res.data?.evaluation || res.data?.data || res.data;

      setEvaluationData(reportPayload);
      setIsModalOpen(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting interview evaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/dashboard');
  };

  const currentAnswerText = currentQ ? (transcripts[currentQ.questionId] || '') : '';
  const wordCount = currentAnswerText.trim() ? currentAnswerText.trim().split(/\s+/).length : 0;

  if (!currentQ) {
    return (
      <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white flex flex-col items-center justify-center font-sans box-border">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={gridBackgroundStyle} />
        <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4 font-mono">
          <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-xs text-zinc-400">CONNECTING_INTERVIEW_SESSION...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050507] text-white flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans selection:bg-cyan-500/25 selection:text-cyan-200 box-border overflow-x-hidden pt-20">
      
      {/* Background Matrix & Directional Ambience */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(100%,750px)] h-[380px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-[-5%] w-[450px] h-[300px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Top Header Telemetry Strip */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-500 pb-4">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-zinc-400">VOICE_SESSION_PIPELINE</span>
          <span className="text-zinc-700">//</span>
          <span className="text-zinc-500 uppercase">ID: {String(id || 'VIRTUAL').slice(-6)}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${
            isListening 
              ? 'bg-rose-950/50 border-rose-800/60 text-rose-400' 
              : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400'
          }`}>
            <Radio className={`w-3 h-3 ${isListening ? 'animate-pulse text-rose-400' : 'text-emerald-400'}`} />
            <span>{isListening ? 'LIVE_STREAMING_AUDIO' : 'SPEECH_MIC_IDLE'}</span>
          </span>
          <span className="hidden sm:inline text-zinc-600 font-mono">LANG: EN-US</span>
        </div>
      </div>

      {/* Main Terminal Shell Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center my-2">
        <div className="w-full bg-[#09090b]/95 border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col">
          
          {/* 1. Terminal Console Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-7 py-3.5 bg-zinc-950/90 border-b border-zinc-800/80 gap-3 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />
              <span className="text-cyan-400 font-bold tracking-wider uppercase">
                QUESTION {currentIndex + 1} OF {questions.length}
              </span>
            </div>

            {/* Replay Audio Speech Synthesizer Action */}
            <button
              type="button"
              onClick={handleSpeakQuestion}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono cursor-pointer active:scale-95 shadow-inner self-start sm:self-auto"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>REPLAY_AUDIO_QUESTION</span>
            </button>
          </div>

          {/* Segmented Question Progress Bar */}
          <div className="w-full bg-zinc-950 flex h-1 border-b border-zinc-900">
            {questions.map((_, idx) => (
              <div 
                key={idx}
                className={`h-full flex-1 transition-all duration-300 ${
                  idx < currentIndex 
                    ? 'bg-emerald-500' 
                    : idx === currentIndex 
                      ? 'bg-cyan-400' 
                      : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>

          {/* 2. Primary Question Display & Audio HUD */}
          <div className="p-5 sm:p-8 space-y-6">
            
            {/* Target Question Display Box */}
            <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 space-y-2 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3 h-3" />
                  <span>TARGET_PROMPT_CALIBRATION</span>
                </span>
                <span>BEHAVIORAL // TECHNICAL</span>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-zinc-100 leading-relaxed font-sans pt-1">
                "{currentQ.questionText}"
              </p>
            </div>

            {/* Audio Recording Controller Hub */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 font-mono text-xs">
              <button
                type="button"
                onClick={toggleListening}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                  isListening
                    ? 'bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 text-white" />
                    <span>STOP_RECORDING</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-black" />
                    <span>RECORD_VERBAL_ANSWER</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 text-[11px]">
                {isListening ? (
                  <span className="flex items-center gap-2 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span>LISTENING_TO_MICROPHONE_STREAM...</span>
                  </span>
                ) : (
                  <span className="text-zinc-500">
                    Click mic to start verbal response or type below
                  </span>
                )}
              </div>
            </div>

            {/* Live Editable Transcript Workspace */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="uppercase tracking-wider">CAPTURED_ANSWER_TRANSCRIPT</span>
                  <span className="text-zinc-600 text-[10px]">(EDITABLE)</span>
                </span>
                <span className="text-[10px] text-zinc-500">
                  {wordCount} WORDS RECORDED
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={transcripts[currentQ.questionId] || ''}
                  onChange={handleTextChange}
                  rows={5}
                  placeholder="Spoken words will transcribe here in real time. You can edit, format, or type your response manually..."
                  className="w-full bg-zinc-950/90 border border-zinc-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 rounded-xl p-4 text-xs sm:text-sm text-zinc-200 placeholder-zinc-700 outline-none transition font-sans leading-relaxed resize-none shadow-inner"
                />
              </div>
            </div>

          </div>

          {/* 3. Bottom Terminal Navigation Bar */}
          <div className="px-5 sm:px-7 py-4 bg-zinc-950/90 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            
            {/* Previous Question Action */}
            <button
              type="button"
              disabled={currentIndex === 0 || isSubmitting}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="w-full sm:w-auto min-h-[42px] px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed text-zinc-300 hover:text-white border border-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS_PROMPT</span>
            </button>

            {/* Next / Final Submission Action */}
            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="w-full sm:w-auto min-h-[42px] px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>NEXT_QUESTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitFinal}
                className="w-full sm:w-auto min-h-[42px] px-7 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-black font-bold transition-all shadow-[0_0_24px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 font-mono">
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>EVALUATING_SESSION...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SUBMIT_FINAL_INTERVIEW</span>
                  </span>
                )}
              </button>
            )}

          </div>

        </div>
      </main>

      {/* Bottom Architectural Guarantee Strip */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-500 pt-4">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Cache Persistent Buffer Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Speech Rate: Target 140 WPM</span>
          <span className="text-zinc-700">•</span>
          <span>Automatic Transcript Reconciliation</span>
        </div>
      </div>

      {/* ================= MODAL: DIAGNOSTIC SCORECARD POPUP ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Shell */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-5xl my-auto bg-[#09090b] border border-zinc-800/90 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col"
            >
              {/* Modal Top Control Bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-zinc-950 border-b border-zinc-800/80 shrink-0 font-mono">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      DIAGNOSTIC_EVALUATION_REPORT
                    </h3>
                    <p className="text-[10px] text-zinc-500">
                      Gemini model reasoning & STAR calibration metrics
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close report modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
                <ScoreCard evaluationData={evaluationData} />

                {/* Modal Footer Redirect Button */}
                <div className="pt-4 border-t border-zinc-800/80 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="min-h-[42px] px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.25)] active:scale-95"
                  >
                    <span>CLOSE & RETURN TO DASHBOARD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}