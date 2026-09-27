import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { initializePayment, verifyPayment } from '../controllers/paystack.controller.js';

const router = express.Router();

router.post('/initialize', verifyToken, initializePayment);
router.post('/verify', verifyToken, verifyPayment);

export default router;