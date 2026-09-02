import { OAuth2Client } from 'google-auth-library';
import User from '../models/userModel.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 1. Register Service
export const registerUserService = async (userData) => {
    const { firstName, lastName, username, email, password } = userData;

    const userExists = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (userExists) {
        const conflict = userExists.email === email.toLowerCase() ? "Email" : "Username";
        throw new Error(`${conflict} is already registered.`);
    }

    // Credits automatically 3 set ho jayenge schema default se
    const newUser = await User.create({
        firstName,
        lastName,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
    });

    return newUser;
};

// 2. Login Service
export const loginUserService = async (email, password) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
        throw new Error("Invalid credentials provided");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials provided");
    }

    return user;
};

// 3. Google Login / Register Service
export const googleLoginService = async (credential) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        let username = baseUsername.toLowerCase();
        if (username.length < 3) username = username + "user";

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            username = `${username}${Math.floor(1000 + Math.random() * 9000)}`;
        }

        const dummyPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

        // Naye Google User ko bhi automatic 3 credits milenge
        user = await User.create({
            firstName: given_name || "Google",
            lastName: family_name || "User",
            username,
            email: email.toLowerCase(),
            password: dummyPassword
        });
    }

    return user;
};