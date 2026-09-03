import express from 'express';
import { getAdminStats } from '../controllers/admin.controller.js';
import { verifyToken as verifyUser } from '../utils/verifyUser.js'; // your auth middleware

const router = express.Router();
router.get('/stats', verifyUser, getAdminStats);

export default router;