import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import cookieParser from "cookie-parser";
import dns from 'dns';
import cors from "cors";


dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);


connectDB();

const app = express();
const router = express.Router();

// Sahi CORS Settings: explicitly whitelist local frontend setup
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('Server is running');
});

// FIXED: Isko /api/v1/auth kiya hai taaki aapka Axios URL isse connect ho sake!
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});