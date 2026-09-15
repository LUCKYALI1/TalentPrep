import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  MapPin, 
  GraduationCap, 
  Award, 
  Cpu, 
  Layers, 
  Terminal, 
  Sparkles, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// Clean inline minimalist brand SVGs
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

function Profile() {
  const { user } = useAuth();

  const profileData = {
    fullName: user?.firstName ? `${user.firstName} ${user?.lastName || ''}`.trim() : 'Lucky Ali',
    title: 'Full-Stack & Machine Learning Engineer',
    email: user?.email || 'lucky.ali@example.com',
    location: 'Ghaziabad / NCR, India',
    degree: 'B.Tech in Computer Science (AI & ML)',
    institution: 'ABES Engineering College',
    graduationYear: '2026',
    bio: 'Software engineer focused on high-throughput backend systems, distributed architectures, and generative AI integrations. Dedicated to building reliable, developer-first tooling and solving algorithmic complexity.',
    avatarUrl: user?.avatar?.url || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    stats: [
      { label: 'LeetCode Solved', value: '600+', hint: 'Top 5% percentile' },
      { label: 'Coding Ninjas', value: '300+', hint: 'Master rank' },
      { label: 'ATS Relevance', value: '88%', hint: 'Production ready' },
      { label: 'Evaluation Score', value: '4.9 / 5.0', hint: 'Senior rating' }
    ],
    skills: {
      frontend: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'RESTful APIs', 'Microservices'],
      languages: ['C++', 'JavaScript', 'Python', 'Java', 'SQL'],
      infrastructure: ['Git / GitHub', 'Docker', 'Kubernetes', 'Firebase', 'Postman', 'Supabase']
    },
    certifications: [
      { title: 'TypeScript Core Certification', issuer: 'Infosys Springboard', year: '2026' },
      { title: 'Programming Essentials in Python', issuer: 'Cisco Academy', year: '2026' },
      { title: 'Data Analysis Professional Certificate', issuer: 'IBM', year: '2025' }
    ],
    links: [
      { name: 'GitHub', url: 'https://github.com', icon: GithubIcon },
      { name: 'LinkedIn', url: 'https://linkedin.com', icon: LinkedinIcon },
      { name: 'Portfolio', url: 'https://onlyone.dev', icon: Globe }
    ]
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-16 text-zinc-300 selection:bg-zinc-800 selection:text-white">
      
      {/* Hero Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-2xl">
              <img 
                src={profileData.avatarUrl} 
                alt={profileData.fullName}
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%]"
              />
            </div>
            <span 
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" 
              title="Telemetry Online" 
            />
          </div>

          <div className="flex-1 space-y-3.5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {profileData.fullName}
                </h1>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-0.5">
                  {profileData.title}
                </p>
              </div>

              {/* Minimalist Icon Links */}
              <div className="flex items-center justify-center md:justify-end gap-2">
                {profileData.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer group"
                      title={link.name}
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Context Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-0.5 text-xs text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-1.5 font-mono text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
                {profileData.institution}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-1.5 font-mono text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {profileData.location}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800/80 font-mono text-[11px] text-zinc-300">
                Cohort {profileData.graduationYear}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {profileData.stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 transition-colors hover:border-zinc-700"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-zinc-100 mt-1">{stat.value}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">{stat.hint}</p>
          </div>
        ))}
      </div>

      {/* Main Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Academic & Credentials */}
        <div className="space-y-6">
          
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 space-y-3.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <GraduationCap className="w-4 h-4 text-zinc-500" /> Education
            </h2>
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">{profileData.degree}</p>
              <p className="text-xs text-zinc-400">{profileData.institution}</p>
              <p className="text-[11px] font-mono text-zinc-500 pt-1">Field: AI & Machine Learning</p>
            </div>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 space-y-3.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Award className="w-4 h-4 text-zinc-500" /> Credentials
            </h2>
            <div className="space-y-2.5">
              {profileData.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 bg-zinc-900/40 border border-zinc-800/60 rounded-xl space-y-1">
                  <p className="text-xs font-medium text-zinc-200">{cert.title}</p>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span>{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Bio & Technical Stack */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Sparkles className="w-4 h-4 text-zinc-500" /> Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {profileData.bio}
            </p>
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Code2 className="w-4 h-4 text-zinc-500" /> Technical Capabilities
            </h2>

            <div className="space-y-4 text-xs">
              
              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-2 flex items-center gap-1.5 uppercase">
                  <Layers className="w-3 h-3 text-zinc-500" /> Interface & Systems
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.skills.frontend.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] hover:border-zinc-700 transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-2 flex items-center gap-1.5 uppercase">
                  <Cpu className="w-3 h-3 text-zinc-500" /> Runtime & Data Layer
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.skills.backend.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] hover:border-zinc-700 transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-2 flex items-center gap-1.5 uppercase">
                  <Terminal className="w-3 h-3 text-zinc-500" /> Programming Languages
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.skills.languages.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] hover:border-zinc-700 transition">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono text-zinc-500 mb-2 flex items-center gap-1.5 uppercase">
                  <ExternalLink className="w-3 h-3 text-zinc-500" /> Tooling & Infrastructure
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.skills.infrastructure.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] hover:border-zinc-700 transition">
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