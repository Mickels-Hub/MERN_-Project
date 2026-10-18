import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
  createListing,
  getListings, 
  getListingById 
} from '../controllers/listing.controller.js';

const router = express.Router();

router.get('/get', getListings);
router.post('/create', verifyToken, createListing);
router.get('/get/:id', verifyToken, getListingById); // Secured so middleware can check if user paid the ₦45,000 fee

export default router;