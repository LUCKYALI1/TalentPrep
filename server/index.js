import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ye current folder aur server folder dono ke .env ko dhoondh lega
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.router.js";
import interviewRoutes from "./routes/interview.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { protect } from "./middlewares/auth.middleware.js";
import { changePassword } from "./controllers/profile.controller.js";
import accountRoutes from "./routes/account.routes.js";

// Fix DNS resolution for MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);

connectDB();

const app = express();

const allowedOrigins = [
  'https://talentprep.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Bina origin wali requests (e.g. mobile apps, postman) ya allowed list match hone par allow karein
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

// Preflight OPTIONS requests handle karne ke liye
app.options('*', cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user/profile', profileRoutes);
app.use('/api/v1/interview', interviewRoutes);
app.use('/api/v1/payment', paymentRoutes);

// Optional alias for password change if called via /user/auth/change-password
app.put('/api/v1/user/auth/change-password', protect, changePassword);

app.use('/api/v1/user/account', accountRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});