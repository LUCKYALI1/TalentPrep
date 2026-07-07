import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users' , authRoutes);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})