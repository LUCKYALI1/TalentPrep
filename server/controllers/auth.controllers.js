import { registerUserService, loginUserService, googleLoginService } from '../services/auth.service.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

// Common helper to maintain clean user payload structure
const formatUserResponse = (user) => ({
    id: user._id || user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
});

// 1. Register Controller
export const registerController = async (req, res) => {
    try {
        const user = await registerUserService(req.body);
        const token = generateTokenAndSetCookie(res, user._id);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: formatUserResponse(user)
        });
    } catch (err) {
        return res.status(400).json({ message: err.message || "Registration failed" });
    }
};

// 2. Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await loginUserService(email, password);
        const token = generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            message: "Session established successfully ⚡",
            token,
            user: formatUserResponse(user)
        });
    } catch (err) {
        return res.status(401).json({ message: err.message || "Login failed" });
    }
};

// 3. Google Auth Controller
export const googleLoginController = async (req, res) => {
    try {
        // Accepts both 'credential' (Google API standard) and 'token' (Axios payload default)
        const credential = req.body.credential || req.body.token;
        if (!credential) {
            return res.status(400).json({ message: "Google credential token is required" });
        }

        const user = await googleLoginService(credential);
        const token = generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            message: "Google Authentication Successful ⚡",
            token,
            user: formatUserResponse(user)
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Google login failed" });
    }
};

// 4. Logout Controller
export const logoutController = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });
    return res.status(200).json({ message: 'Session disconnected successfully' });
};

// 5. Verify Session Controller
export const verifyController = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized or invalid session" });
    }

    return res.status(200).json({
        user: formatUserResponse(req.user)
    });
};