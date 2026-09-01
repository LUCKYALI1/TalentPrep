import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Check if token exists in cookies OR authorization header
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Token framework fallback validation check
        if (!token) {
            return res.status(401).json({ message: 'Authorization denied. No authentication token discovered.' });
        }

        // 2. Core Token Decryption Handshake
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. User node injection inside request pipe
        req.user = await User.findById(decoded.userId || decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(404).json({ message: 'User instance linked with this token does not exist.' });
        }

        next(); // Authorization cleared. Proceeding to target endpoint...
    } catch (err) {
        console.error("Auth Middleware Security Exception:", err);
        return res.status(401).json({ message: 'Token authentication sequence failed or expired.' });
    }
};