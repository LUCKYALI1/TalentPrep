import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal,
    Cpu,
    ShieldCheck,
    Zap,
    Activity,
    Layers,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Code2,
    Globe,
    Database,
    Scale,
    GitBranch,
    Lock,
    BarChart3,
    ExternalLink,
    ChevronRight
} from 'lucide-react';

const GithubIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const gridBackgroundStyle = {
    backgroundImage: `radial-gradient(circle at 1px 1px, #27272a 1px, transparent 0)`,
    backgroundSize: '24px 24px'
};

const SUBPAGES = [
    { id: 'architecture', label: '01 // Engine Architecture', title: 'System Architecture & Telemetry Pipeline' },
    { id: 'evaluation', label: '02 // STAR Methodology', title: 'Deterministic Evaluation Matrix' },
    { id: 'security', label: '03 // Privacy & Security', title: 'Ephemeral Data Isolation & Cryptography' },
    { id: 'team', label: '04 // Lead Architect', title: 'Mission, Background & Technology Stack' }
];

export default function About() {
    const [activeTab, setActiveTab] = useState('architecture');

    return (
        <div className="relative w-full min-h-screen bg-black text-zinc-300 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">

            {/* Background Ambience Matrix */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed"
                style={gridBackgroundStyle}
            />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-1/2 right-4 w-[500px] h-[300px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

            {/* Main Container */}
            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 space-y-12">

                {/* Hero Banner */}
                <section className="space-y-4 border-b border-zinc-900 pb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/80 text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        Platform Documentation & Architecture Spec
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight">
                        Engineered to replace subjective hiring with <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                            deterministic AI telemetry.
                        </span>
                    </h1>

                    <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
                        TalentPrep is an autonomous evaluation engine built for software developers, algorithmic engineers, and distributed systems practitioners. We benchmark speech structure, code accuracy, and keyword density against staff-level industry rubrics.
                    </p>
                </section>

                {/* Subpage Segmented Cockpit Navigation */}
                <nav className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-24 z-30 font-mono text-xs">
                    {SUBPAGES.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => setActiveTab(page.id)}
                            className={`flex-1 min-w-[170px] py-2.5 px-3.5 rounded-lg text-left transition-all cursor-pointer ${activeTab === page.id
                                    ? 'bg-zinc-900 text-white font-bold border border-zinc-800 shadow-md'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 border border-transparent'
                                }`}
                        >
                            <span className="block text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">
                                {page.label}
                            </span>
                            <span className="truncate block font-sans text-xs mt-0.5">
                                {page.title.split('&')[0]}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Dynamic Subpage Section Container */}
                <AnimatePresence mode="wait">

                    {/* ========================================================= */}
                    {/* SUBPAGE 1: SYSTEM ARCHITECTURE & RUNTIME TELEMETRY         */}
                    {/* ========================================================= */}
                    {activeTab === 'architecture' && (
                        <motion.div
                            key="architecture"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                                <div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">System Topology</span>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Full-Duplex Evaluation Pipeline</h2>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-3 py-1 rounded-md">
                                    <Activity className="w-3.5 h-3.5 animate-pulse" /> Median Evaluation Latency: 240ms
                                </div>
                            </div>

                            {/* Architecture Blueprint Bento */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-4">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase text-zinc-500 block">Layer 01 // Ingestion</span>
                                        <h3 className="text-base font-bold text-white mt-0.5">Web Speech & Stream Capture</h3>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Browser-native audio sampling captures voice tokens in real time. Transcripts are cleaned with phrase segmentation buffers to eliminate filler vocalizations and background noise interference.
                                    </p>
                                    <ul className="text-[11px] font-mono text-zinc-500 space-y-1.5 pt-2 border-t border-zinc-900">
                                        <li>• Zero-plugin browser API</li>
                                        <li>• Real-time confidence weights</li>
                                        <li>• Low-latency STT buffering</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-4">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400">
                                        <Cpu className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase text-zinc-500 block">Layer 02 // Orchestration</span>
                                        <h3 className="text-base font-bold text-white mt-0.5">Gemini 1.5 Inference Core</h3>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Parsed responses are passed to strict, JSON-schema-enforced Gemini models. Questions adapt dynamically based on previous candidate answers, simulating real interviewer follow-up probes.
                                    </p>
                                    <ul className="text-[11px] font-mono text-zinc-500 space-y-1.5 pt-2 border-t border-zinc-900">
                                        <li>• Strict schema JSON responses</li>
                                        <li>• Rate limit circuit breakers</li>
                                        <li>• Contextual follow-up generation</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-4">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                                        <Database className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase text-zinc-500 block">Layer 03 // Telemetry</span>
                                        <h3 className="text-base font-bold text-white mt-0.5">Persistence & Cascade Purge</h3>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Evaluations are stored as structured MongoDB records linked by ObjectId. Assets are indexed through Cloudinary CDN, with automatic cascade purge triggers protecting user privacy.
                                    </p>
                                    <ul className="text-[11px] font-mono text-zinc-500 space-y-1.5 pt-2 border-t border-zinc-900">
                                        <li>• Atomic transactions on deletion</li>
                                        <li>• Cloudinary public_id tracking</li>
                                        <li>• Sub-millisecond indexed queries</li>
                                    </ul>
                                </div>

                            </div>

                            {/* Technical Stack Architecture Details */}
                            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-6">
                                <div className="flex items-center gap-2">
                                    <Code2 className="w-4 h-4 text-cyan-400" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Full Stack Core Specifications</h3>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                                    <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                                        <span className="text-[10px] text-zinc-500 uppercase block">Frontend</span>
                                        <p className="text-white font-bold">React 18 + Vite</p>
                                        <p className="text-zinc-500 text-[11px]">Tailwind & Motion</p>
                                    </div>
                                    <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                                        <span className="text-[10px] text-zinc-500 uppercase block">Runtime</span>
                                        <p className="text-white font-bold">Node.js + Express</p>
                                        <p className="text-zinc-500 text-[11px]">ESM Architecture</p>
                                    </div>
                                    <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                                        <span className="text-[10px] text-zinc-500 uppercase block">Database</span>
                                        <p className="text-white font-bold">MongoDB + Mongoose</p>
                                        <p className="text-zinc-500 text-[11px]">B-Tree Indexed Schema</p>
                                    </div>
                                    <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                                        <span className="text-[10px] text-zinc-500 uppercase block">Storage CDN</span>
                                        <p className="text-white font-bold">Cloudinary SDK</p>
                                        <p className="text-zinc-500 text-[11px]">Auto Face-Crop 400x400</p>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}

                    {/* ========================================================= */}
                    {/* SUBPAGE 2: STAR METHODOLOGY & DETERMINISTIC SCORING MATRIX */}
                    {/* ========================================================= */}
                    {activeTab === 'evaluation' && (
                        <motion.div
                            key="evaluation"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                                <div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Scoring Rubrics</span>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">The 100-Point Algorithmic Grade</h2>
                                </div>
                                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/50 px-3 py-1 rounded-md">
                                    STAR Metric Calibration v2.4
                                </span>
                            </div>

                            {/* 4 Pillars of STAR Breakdown */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                                    <span className="text-cyan-400 font-mono text-xs font-bold block">01 // SITUATION</span>
                                    <h4 className="text-sm font-bold text-white">Contextual Framing</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Evaluates if the candidate sets up background constraints, legacy architecture parameters, team scale, and production traffic volume.
                                    </p>
                                </div>

                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                                    <span className="text-cyan-400 font-mono text-xs font-bold block">02 // TASK</span>
                                    <h4 className="text-sm font-bold text-white">Objective & Conflict</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Identifies whether the core challenge (e.g. race conditions, memory leaks, latency spikes) is clearly isolated and owned by the candidate.
                                    </p>
                                </div>

                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                                    <span className="text-cyan-400 font-mono text-xs font-bold block">03 // ACTION</span>
                                    <h4 className="text-sm font-bold text-white">Technical Execution</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Audits concrete implementation details: data structures chosen, caching invalidation logic, schema designs, and algorithmic trade-offs.
                                    </p>
                                </div>

                                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                                    <span className="text-cyan-400 font-mono text-xs font-bold block">04 // RESULT</span>
                                    <h4 className="text-sm font-bold text-white">Quantifiable Impact</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Demands measurable telemetry: percentage latency reduction, RPS throughput handled, resource utilization, or dollar cost savings.
                                    </p>
                                </div>
                            </div>

                            {/* Weighted Score Breakdown Formula */}
                            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
                                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluation Score Composition</h3>
                                        <p className="text-xs text-zinc-500 font-mono">Weighted formula applied across each answer diagnostic</p>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-white bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800">
                                        Max: 100%
                                    </span>
                                </div>

                                <div className="space-y-4 font-mono text-xs">
                                    <div>
                                        <div className="flex justify-between items-center mb-1 text-zinc-300">
                                            <span>STAR Structural Integrity</span>
                                            <span className="text-cyan-400 font-bold">35% Weight</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                            <div className="h-full w-[35%] bg-cyan-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1 text-zinc-300">
                                            <span>Technical Precision & Problem Solving</span>
                                            <span className="text-indigo-400 font-bold">30% Weight</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                            <div className="h-full w-[30%] bg-indigo-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1 text-zinc-300">
                                            <span>Domain Keywords & Architectural Nomenclature</span>
                                            <span className="text-purple-400 font-bold">20% Weight</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                            <div className="h-full w-[20%] bg-purple-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1 text-zinc-300">
                                            <span>Delivery Conciseness & Filler Suppression</span>
                                            <span className="text-emerald-400 font-bold">15% Weight</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                            <div className="h-full w-[15%] bg-emerald-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}

                    {/* ========================================================= */}
                    {/* SUBPAGE 3: SECURITY, DATA ISOLATION & PRIVACY              */}
                    {/* ========================================================= */}
                    {activeTab === 'security' && (
                        <motion.div
                            key="security"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                                <div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Security Protocol</span>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Zero-Persistent Media & Ephemeral Pipeline</h2>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-3 py-1 rounded-md">
                                    <ShieldCheck className="w-4 h-4" /> End-to-End Session Guard
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                                    <div className="flex items-center gap-2 text-white text-sm font-bold">
                                        <Lock className="w-4 h-4 text-cyan-400" /> Zero Training Guarantee
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                                        Your verbal answers, resumes, and code samples are never used to train public foundation models. We utilize enterprise API contracts where inference requests are zero-retention and dropped from memory immediately post-scoring.
                                    </p>
                                    <div className="pt-2 text-[11px] font-mono text-zinc-500">
                                        STATUS: STRICTLY ADHERED • ENTERPRISE BOUND
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                                    <div className="flex items-center gap-2 text-white text-sm font-bold">
                                        <GitBranch className="w-4 h-4 text-cyan-400" /> Atomic Cascade Purge Engine
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                                        When you request account deletion from your dashboard, an atomic multi-collection transaction executes immediately. All interview logs, score histories, Profile records, and Cloudinary-stored avatars are scrubbed in parallel.
                                    </p>
                                    <div className="pt-2 text-[11px] font-mono text-zinc-500">
                                        STATUS: HARD DELETE • ZERO ORPHAN ASSETS
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                                    <div className="flex items-center gap-2 text-white text-sm font-bold">
                                        <Scale className="w-4 h-4 text-cyan-400" /> JWT & Cookie Cryptography
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                                        Session authentication uses signed JSON Web Tokens (JWT) encrypted with production secrets and stored within HTTP-Only SameSite cookies, isolating authorization credentials from cross-site scripting (XSS) access.
                                    </p>
                                    <div className="pt-2 text-[11px] font-mono text-zinc-500">
                                        STATUS: HTTP-ONLY COOKIES • SECURE FLAG ACTIVE
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                                    <div className="flex items-center gap-2 text-white text-sm font-bold">
                                        <Zap className="w-4 h-4 text-cyan-400" /> Rate-Limiting & DDOS Mitigations
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                                        Inference routes and mock generation endpoints are throttled via IP-based sliding-window rate limiters. This protects inference clusters from sybil attacks while guaranteeing token throughput for authentic sessions.
                                    </p>
                                    <div className="pt-2 text-[11px] font-mono text-zinc-500">
                                        STATUS: SLIDING WINDOW RATE-LIMIT ACTIVE
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}

                    {/* ========================================================= */}
                    {/* SUBPAGE 4: FOUNDING TEAM, MISSION & TECH ROOTS             */}
                    {/* ========================================================= */}
                    {activeTab === 'team' && (
                        <motion.div
                            key="team"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                                <div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Core Contributor</span>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Lead System Architect</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition"
                                    >
                                        <GithubIcon className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition"
                                    >
                                        <LinkedinIcon className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://onlyone.dev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition"
                                    >
                                        <Globe className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Founder Profile Card */}
                            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                                        alt="Lucky Ali"
                                        className="w-full h-full object-cover grayscale-[15%]"
                                    />
                                </div>

                                <div className="space-y-3 text-center md:text-left">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Lucky Ali</h3>
                                        <p className="text-xs font-mono text-cyan-400 mt-0.5">
                                            Full-Stack & Machine Learning Systems Engineer
                                        </p>
                                    </div>
                                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal max-w-2xl">
                                        Specializing in high-throughput backend runtimes, distributed concurrency pipelines, and generative AI orchestration. Architected TalentPrep to bridge the gap between academic algorithms and real-world tech panel interviews.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1 font-mono text-[11px] text-zinc-400">
                                        <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                                            B.Tech CSE (AI/ML) '26
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                                            ABES Engineering College
                                        </span>
                                        <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400">
                                            600+ LeetCode Solved
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* The Platform Ethos */}
                            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-cyan-400" /> Platform Mission & Vision
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                                    Traditional mock interviews rely on inconsistent human feedback, expensive hourly mentorship networks, or generic non-technical advice. TalentPrep was created to turn interview preparation into a repeatable, measurable science. By testing developers against actual production failure scenarios, we empower candidates to articulate technical decisions with authority.
                                </p>
                            </div>

                        </motion.div>
                    )}

                </AnimatePresence>

                {/* Global CTA Strip */}
                <section className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div>
                        <h3 className="text-lg font-bold text-white">Ready to test your runtime knowledge?</h3>
                        <p className="text-xs text-zinc-400 mt-1 font-mono">
                            Calibrate your first AI mock session and inspect your diagnostic score report.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link
                            to="/interview/configure"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                        >
                            Configure Mock Session <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

            </main>

        </div>
    );
}