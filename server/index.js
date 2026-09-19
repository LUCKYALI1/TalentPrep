import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import dns from "dns"; // ⚡ Fix 1: Added missing dns import
import cors from "cors";
import cookieParser from "cookie-parser";

// Route & Middleware Imports (All imports grouped at the top)
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.router.js";
import interviewRoutes from "./routes/interview.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import accountRoutes from "./routes/account.routes.js";
import { protect } from "./middlewares/auth.middleware.js";
import { changePassword } from "./controllers/profile.controller.js";

// Path resolution & environment setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Fix DNS resolution for MongoDB Atlas in serverless environments
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Database Connection
connectDB();

const app = express();

// Allowed Origins for Netlify & Localhost
const allowedOrigins = [
  "https://talentprep.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
  })
);

// Preflight OPTIONS requests handler
app.options("*", cors());

// Body & Cookie Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Root Health-Check Route (Prevents 404/500 when opening the backend URL directly)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "active",
    service: "TalentPrep Backend API",
    uptime: process.uptime()
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user/profile", profileRoutes);
app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/user/account", accountRoutes);

// Optional alias for password change
app.put("/api/v1/user/auth/change-password", protect, changePassword);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Internal Server Error"
  });
});

// Local dev port listener
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ⚡ Fix 2: Required by Vercel to invoke your serverless Express app
export default app;