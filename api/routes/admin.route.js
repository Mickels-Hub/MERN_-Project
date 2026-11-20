import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; // Change to your exact exported function name from verifyUser.js if different
import {
  getAdminOverview,
  getAllUsersAdmin,
  updateUserStatusAdmin,
  updateListingStatusAdmin,
  deleteListingAdmin,
  getCmsContent,
  updateCmsContent,
} from '../controllers/admin.controller.js';

const router = express.Router();

// Middleware check ensuring only admins pass
const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

router.get('/overview', verifyToken, checkAdmin, getAdminOverview);
router.get('/users', verifyToken, checkAdmin, getAllUsersAdmin);
router.patch('/users/:userId', verifyToken, checkAdmin, updateUserStatusAdmin);
router.patch('/listings/:id', verifyToken, checkAdmin, updateListingStatusAdmin);
router.delete('/listings/:id', verifyToken, checkAdmin, deleteListingAdmin);
router.get('/cms', verifyToken, checkAdmin, getCmsContent);
router.post('/cms', verifyToken, checkAdmin, updateCmsContent);

export default router;