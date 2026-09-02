import React from 'react';
import { useForm } from 'react-hook-form';

export default function AIInterviewForm({ onSubmit, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: '',
      company: '',
      experience: 'Fresher / Student',
      previousRole: '',
      techStack: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 text-left font-sans">
      
      {/* Target Role & Target Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            Target Role <span className="text-cyan-400">*</span>
          </label>
          <input
            {...register('role', { required: 'Role is required' })}
            type="text"
            placeholder="e.g. Full Stack Developer"
            className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-all"
          />
          {errors.role && (
            <p className="text-[10px] text-red-400 font-mono">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            Target Company
          </label>
          <input
            {...register('company')}
            type="text"
            placeholder="e.g. Google, Amazon"
            className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-all"
          />
        </div>
      </div>

      {/* Experience Level & Previous Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            Experience Level <span className="text-cyan-400">*</span>
          </label>
          <select
            {...register('experience', { required: true })}
            className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-cyan-500/80 transition-all cursor-pointer"
          >
            <option value="Fresher / Student">Fresher / Student (0 Yrs)</option>
            <option value="Junior">Junior (1 - 2 Yrs)</option>
            <option value="Mid-Level">Mid-Level (3 - 5 Yrs)</option>
            <option value="Senior">Senior (5+ Yrs)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            Previous / Current Role
          </label>
          <input
            {...register('previousRole')}
            type="text"
            placeholder="e.g. Frontend Intern"
            className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-all"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
          Tech Stack / Primary Skills <span className="text-cyan-400">*</span>
        </label>
        <input
          {...register('techStack', { required: 'Tech stack is required' })}
          type="text"
          placeholder="e.g. React, Node.js, TypeScript"
          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/80 transition-all"
        />
        {errors.techStack && (
          <p className="text-[10px] text-red-400 font-mono">{errors.techStack.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Creating AI Session...
            </>
          ) : (
            'Create AI Interview Session →'
          )}
        </button>
      </div>

    </form>
  );
}