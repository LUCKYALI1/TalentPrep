import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import api from '../utils/api';
import ScoreCard from './ScoreCard';

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
      setTranscripts(JSON.parse(savedLocal));
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
          const updated = {
            ...prev,
            [currentQ?.questionId || currentIndex]:
              (prev[currentQ?.questionId || currentIndex] || '') + ' ' + currentTranscript
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
    setTranscripts((prev) => {
      const updated = { ...prev, [currentQ.questionId]: text };
      localStorage.setItem(`talentprep_transcript_${id}`, JSON.stringify(updated));
      return updated;
    });
  };

const handleSubmitFinal = async () => {
  if (isListening) recognitionRef.current.stop();
  window.speechSynthesis.cancel();

  setIsSubmitting(true);
  try {
    const formattedPayload = questions.map((q) => ({
      questionId: q.questionId,
      questionText: q.questionText,
      userAnswerText: transcripts[q.questionId] || 'No answer provided.'
    }));

    const res = await api.post(`/interview/${id}/evaluate`, { transcripts: formattedPayload });

    // Console log karke browser Inspect -> Console me exact structure check karein
    console.log("Backend Raw Response:", res.data);

    localStorage.removeItem(`talentprep_transcript_${id}`);

    // Handles res.data.evaluation, res.data.data, or direct res.data
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

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-[#050507] text-zinc-100 flex items-center justify-center p-6 font-mono text-sm">
        Loading question session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 p-4 sm:p-8 flex flex-col items-center justify-center relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl w-full bg-[#09090b] border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Header Bar */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6 border-b border-zinc-800/90 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 bg-cyan-950/60 text-cyan-400 rounded-full border border-cyan-800/40">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <button
            onClick={handleSpeakQuestion}
            className="text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl border border-zinc-800 transition flex items-center gap-1.5"
          >
            🔊 Replay Question
          </button>
        </div>

        {/* Question Area */}
        <h3 className="text-lg sm:text-xl font-bold mb-6 text-zinc-100 leading-relaxed">
          {currentQ.questionText}
        </h3>

        {/* Mic Control Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={toggleListening}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              isListening
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/10'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-rose-400 animate-ping' : 'bg-zinc-950'}`} />
            {isListening ? 'Recording Answer (Click to Stop)' : 'Start Voice Answer'}
          </button>
          {isListening && <span className="text-xs text-rose-400 font-mono">Listening to your mic...</span>}
        </div>

        {/* Live Transcript Box */}
        <div className="mb-6">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Captured Answer Transcript (Editable)
          </label>
          <textarea
            value={transcripts[currentQ.questionId] || ''}
            onChange={handleTextChange}
            rows={5}
            placeholder="Your spoken answer will appear here in real-time..."
            className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 placeholder-zinc-600 transition resize-none"
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-zinc-800/90">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="w-full sm:w-auto bg-zinc-900 disabled:opacity-40 hover:bg-zinc-800 text-zinc-300 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-zinc-800 transition"
          >
            ← Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-zinc-950 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              Next Question →
            </button>
          ) : (
            <button
              disabled={isSubmitting}
              onClick={handleSubmitFinal}
              className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? 'Evaluating Session...' : 'Submit Interview ✓'}
            </button>
          )}
        </div>
      </div>

      {/* POPUP REPORT WINDOW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#09090b] border border-zinc-800 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-zinc-800">
            
            {/* Top Close Button */}
            <button
              onClick={handleCloseModal}
              className="sticky top-0 float-right z-50 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition"
              aria-label="Close Report"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ScoreCard Report Rendering */}
            <div className="mt-2">
              <ScoreCard evaluationData={evaluationData} />
            </div>

            {/* Bottom Modal Close Action */}
            <div className="mt-8 pt-4 border-t border-zinc-800/80 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition"
              >
                Close & Go to Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}