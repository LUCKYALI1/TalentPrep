import React, { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../pages/LandingPage'

// ⚡ Pure React lazy loading (Bundle Splitting)
const WhyChoose = lazy(() => import('../pages/WhyChoose'))
const TrustMetricsProof = lazy(() => import('../pages/TrustMetricsProof'))
const ProofAndFAQs = lazy(() => import('../pages/ProofAndFAQs'))
const Footer = lazy(() => import('../pages/Footer'))

// Lightweight Fallback Loader
const SectionSkeleton = () => <div className="w-full h-96 bg-black" />

const LandingLayout = () => {
  return (
    <div className="w-full bg-black min-h-screen text-white flex flex-col justify-start">
      {/* Above The Fold: Sync Load (Hero Section) */}
      <Navbar />
      <LandingPage />

      {/* Below The Fold: Async / Suspense Chunks */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChoose />
        <TrustMetricsProof />
        <ProofAndFAQs />
        <Footer />
      </Suspense>
    </div>
  )
}

export default React.memo(LandingLayout)