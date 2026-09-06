import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

function Profile() {
  const { user } = useAuth();

  // Primary user profile attributes with safe fallbacks
  const profileData = {
    fullName: user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : 'Lucky Ali',
    title: 'Full-Stack & AI/ML Engineer',
    email: user?.email || 'lucky.ali@example.com',
    location: 'Ghaziabad / NCR, India',
    degree: 'B.Tech in Computer Science (AI & ML)',
    institution: 'ABES Engineering College',
    graduationYear: '2026',
    bio: 'Passionate Software Engineer specializing in scalable full-stack web architectures, AI/ML integrations, and system design. Experienced in building high-performance SaaS applications and solving complex algorithmic challenges.',
    avatarUrl: user?.avatar?.url || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    stats: {
      leetcodeSolved: '600+',
      codingNinjasSolved: '300+',
      atsScore: '88%',
      overallRating: '4.9 / 5.0',
    },
    skills: {
      frontend: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Microservices'],
      languages: ['C++', 'JavaScript', 'Python', 'Java', 'SQL'],
      tools: ['Git / GitHub', 'Docker', 'Kubernetes', 'Firebase', 'Postman'],
    },
    certifications: [
      { title: 'TypeScript Certification', issuer: 'Infosys Springboard', year: '2026' },
      { title: 'Programming Essentials in Python', issuer: 'Cisco Networking Academy', year: '2026' },
      { title: 'Data Analysis Professional Certificate', issuer: 'IBM', year: '2025' },
    ],
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      portfolio: 'https://onlyone.dev',
    }
  };

  return (
    <div className="w-full space-y-8 pb-12 text-zinc-300">
      
      {/* Hero Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Ambient Glow Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          {/* Avatar with Glow Border */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/40 p-1 bg-zinc-900 shadow-xl">
              <img 
                src={profileData.avatarUrl} 
                alt={profileData.fullName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-zinc-950 rounded-full" title="Active Account" />
          </div>

          {/* User Essential Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {profileData.fullName}
                </h1>
                <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                  {profileData.title}
                </p>
              </div>

              {/* External Links */}
              <div className="flex items-center justify-center md:justify-end gap-2">
                {Object.entries(profileData.links).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold capitalize transition-all"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1.5">
                <span className="text-cyan-400">🎓</span> {profileData.institution}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1.5">
                <span className="text-indigo-400">📍</span> {profileData.location}
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-900/50 text-cyan-300 flex items-center gap-1.5 font-mono">
                Class of {profileData.graduationYear}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Competitive Programming & Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 shadow-xl text-center sm:text-left"
        >
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">LeetCode Solved</p>
          <p className="text-2xl font-black text-white mt-1">{profileData.stats.leetcodeSolved}</p>
          <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Problems Completed</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 shadow-xl text-center sm:text-left"
        >
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Coding Ninjas</p>
          <p className="text-2xl font-black text-white mt-1">{profileData.stats.codingNinjasSolved}</p>
          <p className="text-[10px] text-cyan-400 font-medium mt-0.5">Challenges Cleared</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 shadow-xl text-center sm:text-left"
        >
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Resume ATS Match</p>
          <p className="text-2xl font-black text-white mt-1">{profileData.stats.atsScore}</p>
          <p className="text-[10px] text-indigo-400 font-medium mt-0.5">High Compatibility</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 shadow-xl text-center sm:text-left"
        >
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Evaluation Score</p>
          <p className="text-2xl font-black text-white mt-1">{profileData.stats.overallRating}</p>
          <p className="text-[10px] text-amber-400 font-medium mt-0.5">Top Candidate Tier</p>
        </motion.div>

      </div>

      {/* Main Content Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Academic & Technical Stack */}
        <div className="space-y-6">
          
          {/* Education Details Card */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
              <span className="text-cyan-400">📜</span> Academic Background
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">{profileData.degree}</p>
              <p className="text-xs text-zinc-400">{profileData.institution}</p>
              <p className="text-[11px] font-mono text-cyan-400 pt-1">Specialization: AI & Machine Learning</p>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
              <span className="text-indigo-400">🏅</span> Verified Credentials
            </h2>
            <div className="space-y-3">
              {profileData.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl space-y-1">
                  <p className="text-xs font-semibold text-white">{cert.title}</p>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500">
                    <span>{cert.issuer}</span>
                    <span className="font-mono text-zinc-400">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Bio & Full Skill Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About / Bio Section */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
              <span className="text-cyan-400">👤</span> Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
              {profileData.bio}
            </p>
          </div>

          {/* Categorized Skills Breakdown */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Technical Stack
            </h2>

            <div className="space-y-4">
              {/* Frontend */}
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-2">FRONTEND DEVELOPMENT</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.frontend.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-2">BACKEND & DATABASES</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.backend.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-indigo-300 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-2">PROGRAMMING LANGUAGES</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.languages.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <p className="text-xs font-mono text-zinc-500 mb-2">TOOLS & PLATFORMS</p>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.tools.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default React.memo(Profile);