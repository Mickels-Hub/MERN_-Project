import express from 'express';
import { getCommunityPosts, createCommunityPost, deleteCommunityPost, addReplyToPost } from '../controllers/community.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
router.get('/get', getCommunityPosts);
router.post('/create', verifyToken, createCommunityPost);
router.post('/reply/:id', verifyToken, addReplyToPost);
router.delete('/delete/:id', verifyToken, deleteCommunityPost);

export default router;