// (Keep your export format matching whatever you currently use)
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser, getUserUnlocks, toggleFavorite, getUserFavorites } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.get('/unlocks/:id', verifyToken, getUserUnlocks);
router.post('/favorite', verifyToken, toggleFavorite);
router.get('/favorites/:id', verifyToken, getUserFavorites);

export default router;