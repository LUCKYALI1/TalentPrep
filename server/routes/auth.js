import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';



router.post('/register'  , async (req , res) => {
    try{
        const {email , password} = req.body;

        // checking if user if exsts or not ?
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already exists"});
        }

        // creating new user
        const newUser = await User.create({email , password});

        generateTokenAndSetCookie(res , newUser._id)

        res.status(201).json({message : "User registered successfully" , user : newUser});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : "Server error" , error : err.message});
    }
})
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message:'Invalid email or password' , error : "User not found"} );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' , error : "Password mismatch" });
    }

    // Generate JWT cookie
    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      message: 'Logged in successfully',
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // Instantly expires the cookie
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;