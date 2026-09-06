import React from 'react';

export default function ActiveSessionModal({ isOpen, activeInterview, onResume, onArchiveAndCreate, isLoading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-[#09090b] border border-zinc-800/90 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <h3 className="text-lg sm:text-xl font-bold text-amber-400">Unfinished Session Found</h3>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-5 leading-relaxed">
                        You have an active mock interview session for{' '}
                        <span className="font-semibold text-zinc-100">{activeInterview?.targetRole}</span>{' '}
                        ({activeInterview?.targetCompany || 'General'}).
                    </p>

                    <div className="bg-zinc-950/80 border border-zinc-900 p-4 rounded-xl mb-6 text-xs font-mono text-zinc-400 space-y-2">
                        <p><strong className="text-zinc-200">Experience:</strong> {activeInterview?.experienceLevel}</p>
                        <p><strong className="text-zinc-200">Tech Stack:</strong> {activeInterview?.techStack?.join(', ')}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onResume}
                            disabled={isLoading}
                            className="w-full sm:flex-1 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-zinc-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] text-xs sm:text-sm"
                        >
                            Resume Session
                        </button>
                        <button
                            onClick={onArchiveAndCreate}
                            disabled={isLoading}
                            className="w-full sm:flex-1 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-zinc-300 font-semibold py-3 rounded-xl border border-zinc-800 transition-all text-xs sm:text-sm"
                        >
                            Archive & Start New
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}