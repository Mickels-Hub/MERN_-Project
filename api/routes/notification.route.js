import express from 'express';
import { 
  getNotifications, 
  createNotification, 
  markAsRead 
} from '../controllers/notification.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', verifyToken, getNotifications);
router.post('/create', createNotification);
router.put('/read', verifyToken, markAsRead);

export default router;