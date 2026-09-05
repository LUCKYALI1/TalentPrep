import { Router } from 'express';

const router = Router();
import  {
    createOrder,
    verifyPayment
}  from '../controllers/payment.controller.js';

import {protect} from '../middlewares/auth.middleware.js';

router.post('/create-order' , protect, createOrder);
router.post('/verify-payment' , protect, verifyPayment);

export default router;