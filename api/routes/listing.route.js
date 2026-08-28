import express from 'express';
import { createListing, getlisting, getListings, toggleLike, addComment, getAdminListings, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/get', getListings);
router.get('/get/:id', verifyToken, getlisting);
router.post('/like/:id', verifyToken, toggleLike);
router.post('/comment/:id', verifyToken, addComment);
router.post('/create', verifyToken, createListing);
router.get('/get-admin', verifyToken, getAdminListings);
router.post('/update/:id', verifyToken, updateListing);

export default router;