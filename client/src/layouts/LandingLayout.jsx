import React from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../pages/LandingPage'
import WhyChoose from '../pages/WhyChoose'
import Practice from '../pages/Practice'
import TrustMetricsProof from '../pages/TrustMetricsProof'
import ProofAndFAQs from '../pages/ProofAndFAQs'
import Footer from '../pages/Footer'

const LandingLayout = () => {
  return (
    <>
    <Navbar />
    <LandingPage />
    <WhyChoose/>
    <Practice />
    <TrustMetricsProof/>
    <ProofAndFAQs/>
    <Footer />    
    </>
  )
}

export default LandingLayout
