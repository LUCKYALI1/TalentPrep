// server/controllers/payment.controller.js
import crypto from 'crypto';
import razorpay from '../config/razorpay.js';
import User from '../models/userModel.js';

const PLAN_MAP = {
  plan_30: { price: 1000, credits: 30 },
  plan_60: { price: 1500, credits: 60 },
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

    // Keys verification guard
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Server Error: Razorpay API keys missing in Vercel environment variables.'
      });
    }

    const userId = req.user?._id || req.user?.id || Date.now();
    const userSuffix = String(userId).slice(-4);

    const options = {
      amount: selectedPlan.price * 100, // Amount in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${userSuffix}`.slice(0, 40),
    };

    console.log("Creating Razorpay order with options:", options);
    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    // 💡 Razorpay error structure extract karein
    const rzpDescription = 
      error?.error?.description || 
      error?.error?.reason || 
      error?.message || 
      'Unknown Razorpay Gateway Error';

    console.error('🔥 Razorpay Full Error:', JSON.stringify(error, null, 2));

    return res.status(500).json({ 
      success: false, 
      message: rzpDescription, // Ab exact reason network tab aur popup me aayega
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

    // HMAC SHA256 Signature Check
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET.trim())
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