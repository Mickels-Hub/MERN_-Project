import express from 'express';
import { createReport, getAllReportsAdmin, updateReportStatusAdmin } from '../controllers/report.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Inline admin check using your existing user token payload
const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// User route
router.post('/create', verifyToken, createReport);

// Admin routes
router.get('/admin/all', verifyToken, verifyAdmin, getAllReportsAdmin);
router.patch('/admin/:reportId', verifyToken, verifyAdmin, updateReportStatusAdmin);

export default router;