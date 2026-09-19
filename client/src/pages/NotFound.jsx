// src/pages/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-[calc(100dvh-80px)] bg-[#050507] text-white flex items-center justify-center p-4 sm:p-6 box-border font-sans overflow-hidden select-none">

            {/* Subtle Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,480px)] h-[260px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Centered Minimal Container */}
            <div className="relative z-10 max-w-sm w-full text-center space-y-6">

                {/* Status Chip */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800/90 bg-zinc-950/80 text-xs font-mono text-cyan-400 uppercase tracking-widest backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Error 404</span>
                </div>

                {/* Core Heading & Description */}
                <div className="space-y-2">
                    <h1 className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                        404
                    </h1>
                    <h2 className="text-base sm:text-lg font-bold text-zinc-200 tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                        The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all duration-200 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Go Back</span>
                    </button>

                    <Link
                        to="/"
                        className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Return Home</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}