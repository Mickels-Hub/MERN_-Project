import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
  createProperty, 
  updateProperty, 
  deleteProperty, 
  getAdminStats, 
  getAdminReports, 
  getPopularFavorites 
} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createProperty);
router.post('/update/:id', verifyToken, updateProperty);
router.delete('/delete/:id', verifyToken, deleteProperty);
router.get('/stats', verifyToken, getAdminStats);
router.get('/reports', verifyToken, getAdminReports);
router.get('/popular-favorites', verifyToken, getPopularFavorites);

export default router;