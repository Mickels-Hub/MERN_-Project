import express from 'express';
import { createListing, getlisting, getListings, likeListing, dislikeListing, addComment,  addReplyToComment, getAdminListings, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/get', getListings);
router.get('/get/:id', verifyToken, getlisting);
router.post('/like/:listingId', verifyToken,likeListing );
router.post('/dislike/:listingId', verifyToken,dislikeListing );
router.post('/comment/:listingId', verifyToken, addComment);
router.post('/create', verifyToken, createListing);
router.get('/get-admin', verifyToken, getAdminListings);
router.post('/update/:id', verifyToken, updateListing);
router.post('/comment/reply/:listingId/:commentId', verifyToken, addReplyToComment);

export default router;