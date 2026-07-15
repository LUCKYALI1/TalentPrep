import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

// ==========================================
// REGISTRATION ROUTE
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Check if user already exists via email OR workspace handle (username)
        const userExists = await User.findOne({ 
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] 
        });

        if (userExists) {
            const conflict = userExists.email === email.toLowerCase() ? "Email" : "Username";
            return res.status(400).json({ message: `${conflict} is already routed to an active instance.` });
        }

        // Creating new sandbox configuration mapping
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password
        });

        // Initialize dynamic authorization context cookie
        generateTokenAndSetCookie(res, newUser._id);

        // Sanitize return object to omit sensitive credential strings
        res.status(201).json({
            message: "Candidate profile initialized successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error("Registration Pipe Failure:", err);
        res.status(500).json({ message: "Server parsing pipeline error", error: err.message });
    }
});

// ==========================================
// AUTHENTICATION LOGIN ROUTE
// ==========================================
// ==========================================
// AUTHENTICATION LOGIN ROUTE
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // ❌ Puraana: const user = await User.find(...)
        //  Naya: findOne use kijiye taaki Single Document Object mile, Array nahi!
        const user = await User.findOne({ email: email.toLowerCase() });
        
        // Agar user null milta hai (yaani nahi mila)
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials provided', error: "Node mapping failed" });
        }

        // Ab 'user' ek actual mongoose instance hai, toh comparePassword flawlessly chalega!
        const isMatch = await user.comparePassword(password);
        console.log("Password Match Status:", isMatch); 
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials provided', error: "Passkey verification mismatch" });
        }

        // Generate JWT cookie sequence
        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            message: 'Session established successfully ⚡',
            user: { 
                id: user._id, 
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email 
            },
        });
    } catch (error) {
        console.error("Login Authentication Failure:", error);
        res.status(500).json({ message: 'Server routing failure', error: error.message });
    }
});

// ==========================================
// SESSION DISCONNECT LOGOUT ROUTE
// ==========================================
router.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Instantly purges active validation key from browser
    });
    res.status(200).json({ message: 'Session disconnected successfully' });
});

export default router;