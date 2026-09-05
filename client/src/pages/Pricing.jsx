import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUser } from '../context/userContext/UserContext.jsx';
import { plans } from '../data/plans.js';
import { loadRazorpayScript, createOrderApi, verifyPaymentApi } from '../services/payment.service.js';

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

              // 2. Backend se fresh data re-fetch karo
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
                  // Hard refresh taaki Navbar, LocalStorage aur Context fully sync ho jayein
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
          name: `${user?.firstName || ''} ${user?.lastName || ''}`,
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
        text: 'Could not initialize payment order.',
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