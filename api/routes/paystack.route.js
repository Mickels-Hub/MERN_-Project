import express from 'express';
import { initializePayment, verifyPayment } from '../controllers/paystack.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/pay', verifyToken, initializePayment);
router.post('/verify', verifyToken, verifyPayment);

export default router;