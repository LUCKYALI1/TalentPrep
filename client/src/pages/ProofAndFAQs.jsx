import React from 'react';
import { motion } from 'framer-motion';
import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';
import TestimonialMarquee from '../components/TestimonialMarquee';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #27272a 1px, transparent 1px),
    linear-gradient(to bottom, #27272a 1px, transparent 1px)
  `,
  backgroundSize: "36px 36px"
};

function ProofAndFAQs() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">

      {/* Background Grid Matrix */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />

      {/* Ambient Gradient Glow */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[250px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Core Workspace Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-24">

        {/* FAQ Section Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <FAQSection />
        </motion.div>

        {/* Form + Testimonials Layout Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full pt-12 border-t border-zinc-900"
        >
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <TestimonialMarquee />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default React.memo(ProofAndFAQs);