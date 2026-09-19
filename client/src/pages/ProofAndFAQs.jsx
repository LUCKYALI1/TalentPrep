import React from 'react';
import { motion } from 'framer-motion';
import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';
import TestimonialMarquee from '../components/TestimonialMarquee';

// Unified telemetry grid pattern
const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px'
};

function ProofAndFAQs() {
  return (
    <section className="relative w-full bg-black text-white flex flex-col items-center justify-start py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none box-border">

      {/* Background Grid Matrix */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />

      {/* Ambient Radial Gradient Accents */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[min(100%,750px)] h-[320px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[420px] h-[280px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Core Workspace Layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-16 sm:space-y-24">

        {/* 1. FAQ Section Container */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <FAQSection />
        </motion.div>

        {/* 2. Structured Two-Column Workspace (Inquiry Form + Live Marquee) */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full pt-12 sm:pt-16 border-t border-zinc-900/90"
        >
          {/* Subtle separator glow point */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch w-full">
            
            {/* Left: Contact & Support Console (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <ContactForm />
            </div>

            {/* Right: Rolling Candidate Proof Marquee (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <TestimonialMarquee />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default React.memo(ProofAndFAQs);