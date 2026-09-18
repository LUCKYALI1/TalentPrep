// server/config/razorpay.js
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const key_id = process.env.RAZORPAY_KEY_ID?.trim();
const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

if (!key_id || !key_secret) {
  console.error("❌ CRITICAL: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in process.env!");
}

const razorpay = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

export default razorpay;