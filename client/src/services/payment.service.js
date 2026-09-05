import api from '../utils/api.js';

// 1. Script Loader for Razorpay Checkout JS
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// 2. Create Order API Request
export const createOrderApi = async (planId, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true, // Cookies fallback ke liye
    };

    const res = await api.post('/payment/create-order', { planId }, config);
    return res.data?.order || res.data;
  } catch (error) {
    console.error('API Error in createOrderApi:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// 3. Verify Payment API Request
export const verifyPaymentApi = async (paymentData, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true,
    };

    const res = await api.post('/payment/verify-payment', paymentData, config);
    return res.data;
  } catch (error) {
    console.error('API Error in verifyPaymentApi:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};