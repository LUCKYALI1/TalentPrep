// server/routes/auth.routes.js
import express from 'express';
import { 
    registerController, 
    loginController, 
    googleLoginController, 
    logoutController, 
    verifyController 
} from '../controllers/auth.controllers.js'; // <-- Added '.controllers.js'
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/google', googleLoginController);
router.post('/logout', logoutController);
router.get('/verify', protect, verifyController);

export default router;