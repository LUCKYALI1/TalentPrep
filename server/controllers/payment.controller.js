// server/controllers/payment.controller.js
import crypto from 'crypto';
import Razorpay from 'razorpay';
import User from '../models/userModel.js';

const PLAN_MAP = {
  plan_30: { price: 1000, credits: 30 },
  plan_60: { price: 1500, credits: 60 },
};

// Sanitizes keys by removing leading/trailing spaces and accidental surrounding quotes
const getRazorpayCredentials = () => {
  const rawKeyId = process.env.RAZORPAY_KEY_ID || '';
  const rawKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

  const key_id = rawKeyId.trim().replace(/^["']|["']$/g, '');
  const key_secret = rawKeySecret.trim().replace(/^["']|["']$/g, '');

  return { key_id, key_secret };
};

// 1. Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const selectedPlan = PLAN_MAP[planId];

    if (!selectedPlan) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid plan selected' 
      });
    }

    const { key_id, key_secret } = getRazorpayCredentials();

    // Telemetry log for Vercel runtime diagnosis (does not expose secret)
    console.log("PAYMENT_AUTH_DEBUG:", {
      keyIdPrefix: key_id ? key_id.slice(0, 9) : 'MISSING',
      keyIdLength: key_id.length,
      hasSecret: Boolean(key_secret),
      secretLength: key_secret.length,
      isTestKey: key_id.startsWith('rzp_test_')
    });

    if (!key_id || !key_secret) {
      return res.status(500).json({
        success: false,
        message: 'Server Error: Razorpay API keys missing in Vercel environment variables.'
      });
    }

    // Dynamic per-request instantiation avoids serverless cold-start import races
    const razorpayInstance = new Razorpay({
      key_id,
      key_secret,
    });

    const userId = req.user?._id || req.user?.id || Date.now();
    const userSuffix = String(userId).slice(-4);

    const options = {
      amount: selectedPlan.price * 100, // Amount in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${userSuffix}`.slice(0, 40),
    };

    console.log("Submitting order to Razorpay gateway:", options);
    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    const rzpDescription = 
      error?.error?.description || 
      error?.error?.reason || 
      error?.message || 
      'Unknown Razorpay Gateway Error';

    console.error('🔥 Razorpay Order Error:', JSON.stringify(error, null, 2));

    return res.status(500).json({ 
      success: false, 
      message: rzpDescription,
      statusCode: error?.statusCode || 500
    });
  }
};

// 2. Verify Payment Signature & Add Credits
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, creditsToAdd } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Incomplete payment verification payload' 
      });
    }

    const { key_secret } = getRazorpayCredentials();

    if (!key_secret) {
      return res.status(500).json({
        success: false,
        message: 'Server Error: Razorpay secret not configured for verification.'
      });
    }

    // HMAC SHA256 Signature Check
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
    }

    // Safely increment credits for the authenticated user
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication session expired.'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { credits: Number(creditsToAdd) } },
      { new: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      credits: updatedUser?.credits,
    });
  } catch (error) {
    console.error('Payment Verification Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during verification' 
    });
  }
};

export { createOrder, verifyPayment };