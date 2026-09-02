import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/userContext/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const plans = [
  {
    id: 'plan_30',
    name: 'Starter Booster',
    price: 1000,
    credits: 30,
    popular: false,
    description: 'Perfect for resume checks and targeted interview preparation.',
    features: [
      '30 AI Credits',
      'Instant ATS Resume Analysis',
      'AI Mock Interview Feedback',
      'Standard Processing Speed',
      'Email Support'
    ]
  },
  {
    id: 'plan_60',
    name: 'Pro Career Pack',
    price: 1500,
    credits: 60,
    popular: true,
    description: 'Best value for aggressive job hunting and deep preparation.',
    features: [
      '60 AI Credits (Save ₹500)',
      'Deep ATS Optimization & Keyword Mapping',
      'Unlimited Mock Interview Rounds',
      'Priority AI Processing Speed',
      'Detailed Performance Analytics',
      '24/7 Dedicated Support'
    ]
  }
];

export default function Pricing() {
  const { user, fetchUserData } = useUser();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);

  // Script Loader for Razorpay Checkout JS
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoadingPlan(plan.id);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Check your network connection.');
      setLoadingPlan(null);
      return;
    }

    try {
      const token = localStorage.getItem('token');

      // Step 1: Request Backend for Order Creation
      const { data } = await axios.post(
        '/api/payment/create-order',
        { planId: plan.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Step 2: Configure Razorpay Gateway Modal
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummyKey123',
        amount: data.order.amount,
        currency: 'INR',
        name: 'TalentPrep AI',
        description: `Purchase ${plan.credits} AI Credits`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // Step 3: Verify Payment Signature on Backend
            const verifyRes = await axios.post(
              '/api/payment/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                creditsToAdd: plan.credits
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              if (fetchUserData) await fetchUserData();
              alert(`⚡ Success! ${plan.credits} credits added to your account.`);
              navigate('/dashboard');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: `${user?.firstName || ''} ${user?.lastName || ''}`,
          email: user?.email || ''
        },
        theme: {
          color: '#06B6D4'
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Could not initialize payment order.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-28 px-4 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center max-w-2xl mb-16 space-y-4">
        <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
          Flexible Top-Ups
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-cyan-400 bg-clip-text text-transparent">
          Get More AI Credits
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          Power up your interview prep & ATS resume optimizations with instant credit packs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`relative rounded-3xl p-8 bg-[#09090b] border ${
              plan.popular 
                ? 'border-cyan-500/80 shadow-[0_0_35px_rgba(6,182,212,0.18)]' 
                : 'border-zinc-800'
            } flex flex-col justify-between backdrop-blur-xl`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 right-8 bg-cyan-400 text-black font-extrabold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                Best Value
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{plan.description}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-white">₹{plan.price}</span>
                <span className="text-cyan-400 font-semibold text-xs">/ {plan.credits} Credits</span>
              </div>

              <div className="border-t border-zinc-800/80 pt-6 mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-zinc-300">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePayment(plan)}
              disabled={loadingPlan === plan.id}
              className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                plan.popular
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
              }`}
            >
              {loadingPlan === plan.id ? 'Connecting Gateway...' : `Buy ${plan.credits} Credits`}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}