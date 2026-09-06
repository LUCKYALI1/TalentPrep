import express from "express";
import dotenv from "dotenv";
import dns from "dns";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.js";
import interviewRoutes from "./routes/interview.routes.js";
import paymentRoutes from "./routes/payment.routes.js";


// Fix DNS resolution for MongoDB Atlas in restricted networks
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Connect Database
connectDB();

const app = express();

// CORS Settings for Vite Frontend
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

// Body Parsers & Cookie Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Route
app.get('/', (req, res) => {
    res.json({ status: "success", message: "Server is up and running" });
});

// API Routes (v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user/profile', profileRoutes);
app.use('/api/v1/interview', interviewRoutes);


// Payments Routes (v1)
app.use('/api/v1/payment', paymentRoutes);

// Global Error Handler Middleware
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