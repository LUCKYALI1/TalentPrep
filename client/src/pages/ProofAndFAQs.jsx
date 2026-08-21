import React from 'react'
import FAQSection from '../components/FAQSection'
import ContactForm from '../components/ContactForm'
import TestimonialMarquee from '../components/TestimonialMarquee'

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, #3f3f46 1px, transparent 1px),
    linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px"
};

const ProofAndFAQs = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
      
      {/* Background Grid Matrix */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={gridBackgroundStyle}
      />

      {/* Ambient Purple Backdrop Soft Glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Core Workspace Layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-20">
        
        {/* FAQ Accordion Module */}
        <FAQSection />

        {/* Form + Testimonials Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full pt-8 border-t border-zinc-900/60">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <TestimonialMarquee />
          </div>
        </div>

      </div>
    </section>
  )
}

export default React.memo(ProofAndFAQs)