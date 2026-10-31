import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createReport } from '../controllers/report.controller.js';

const router = express.Router();
router.post('/create', verifyToken, createReport);

export default router;