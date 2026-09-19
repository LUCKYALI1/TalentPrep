import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  Lock, 
  Zap,
  Activity,
  CreditCard
} from 'lucide-react';
import { useUser } from '../context/userContext/UserContext.jsx';
import { plans } from '../data/plans.js';
import { loadRazorpayScript, createOrderApi, verifyPaymentApi } from '../services/payment.service.js';

const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(39, 39, 42, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(39, 39, 42, 0.45) 1px, transparent 1px)
  `,
  backgroundSize: '32px 32px'
};

export default function Pricing() {
  const { user, updateUser, fetchUserData } = useUser();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePayment = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoadingPlan(plan.id);

    // Load Razorpay Script
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      Swal.fire({
        title: 'Error!',
        text: 'Razorpay SDK load nahi ho paya. AdBlocker disable karke dekhein.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
        background: '#09090b',
        color: '#ffffff',
        customClass: { popup: 'border border-zinc-800 rounded-2xl' }
      });
      setLoadingPlan(null);
      return;
    }

    try {
      const token = localStorage.getItem('token');

      // Step 1: Create Order via Service
      const orderData = await createOrderApi(plan.id, token);

      if (!orderData || !orderData.id) {
        Swal.fire({
          title: 'Error!',
          text: 'Order ID receive nahi hui backend se.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
          background: '#09090b',
          color: '#ffffff',
          customClass: { popup: 'border border-zinc-800 rounded-2xl' }
        });
        setLoadingPlan(null);
        return;
      }

      const razorpayKey = import.meta.env?.VITE_RAZORPAY_KEY_ID;

      // Step 2: Configure Razorpay Options
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'TalentPrep AI',
        description: `Purchase ${plan.credits} AI Credits`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // Step 3: Verify Payment via Service
            const verifyRes = await verifyPaymentApi(
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                creditsToAdd: plan.credits
              },
              token
            );

            if (verifyRes.success) {
              // 1. Context state update
              if (verifyRes.credits !== undefined) {
                updateUser({ credits: verifyRes.credits });
              } else if (verifyRes.user) {
                updateUser(verifyRes.user);
              }

              // 2. Backend se fresh data re-fetch
              if (fetchUserData) {
                await fetchUserData();
              }

              // 3. Success Popup aur Hard Refresh
              Swal.fire({
                title: '⚡ Success!',
                text: `${plan.credits} credits added to your account!`,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#06B6D4',
                background: '#09090b',
                color: '#ffffff',
                customClass: { popup: 'border border-zinc-800 rounded-2xl' }
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/';
                }
              });
            }
          } catch (err) {
            console.error('Verification error:', err);
            Swal.fire({
              title: 'Verification Failed',
              text: 'Payment verification failed. Please contact support.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#ef4444',
              background: '#09090b',
              color: '#ffffff',
              customClass: { popup: 'border border-zinc-800 rounded-2xl' }
            });
          }
        },
        prefill: {
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          email: user?.email || ''
        },
        theme: {
          color: '#06B6D4'
        }
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        Swal.fire({
          title: 'Payment Failed',
          text: response.error.description || 'Transaction failed.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
          background: '#09090b',
          color: '#ffffff',
          customClass: { popup: 'border border-zinc-800 rounded-2xl' }
        });
      });

      razorpayInstance.open();
    } catch (error) {
      console.error('Order creation error:', error?.response?.data || error.message);
      Swal.fire({
        title: 'Error',
        text: typeof error === 'string' ? error : (error?.message || 'Could not initialize payment order.'),
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
        background: '#09090b',
        color: '#ffffff',
        customClass: { popup: 'border border-zinc-800 rounded-2xl' }
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-black text-white flex flex-col items-center justify-between py-24 sm:py-28 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden selection:bg-cyan-500/25 selection:text-cyan-200 box-border">
      
      {/* 1. Background Grid & Ambient Lighting */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={gridBackgroundStyle}
      />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[min(100%,750px)] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[250px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 2. Main Content Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header Telemetry Stack */}
        <div className="text-center max-w-2xl mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-400 uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Coins className="w-3.5 h-3.5 text-cyan-400" />
            <span>FLEXIBLE_CREDIT_TOP_UPS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Power Up Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              AI Interview Credits
            </span>
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-lg mx-auto">
            Scale your preparation with on-demand tokens. Unlock real-time voice diagnostics, STAR framework evaluations, and resume scoring.
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full items-stretch">
          {plans.map((plan) => {
            const isSelectedPlanLoading = loadingPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#09090b]/90 border ${
                  plan.popular
                    ? 'border-cyan-500/70 shadow-[0_0_35px_rgba(6,182,212,0.16)] ring-1 ring-cyan-500/30'
                    : 'border-zinc-800/90 shadow-xl'
                } flex flex-col justify-between backdrop-blur-xl transition-colors overflow-hidden group`}
              >
                {/* Popular Pill Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-mono font-bold text-[10px] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3 h-3 fill-black" />
                      BEST_VALUE
                    </span>
                  </div>
                )}

                {/* Ambient Card Flare */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Plan Identifier & Meta */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {plan.name}
                    </h2>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                      {plan.credits} SESSIONS
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Tag Display */}
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-zinc-800/80">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                      ₹{plan.price}
                    </span>
                    <span className="text-cyan-400 font-mono font-semibold text-xs sm:text-sm">
                      / {plan.credits} Credits
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 ml-auto">
                      ₹{Math.round(plan.price / plan.credits)} / run
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => handlePayment(plan)}
                  disabled={Boolean(loadingPlan)}
                  className={`w-full min-h-[48px] py-3.5 px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)]'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {isSelectedPlanLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      CONNECTING_GATEWAY...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>PURCHASE {plan.credits} CREDITS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Production Security & Settlement Telemetry */}
        <div className="mt-14 w-full max-w-4xl pt-8 border-t border-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>256-Bit SSL Encrypted Checkout via Razorpay Gateway</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1 text-zinc-400">
              <Zap className="w-3 h-3 text-cyan-400" /> Instant Ledger Allocation
            </span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Activity className="w-3 h-3 text-emerald-400" /> No Subscription Trap
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}