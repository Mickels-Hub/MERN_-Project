import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createListing,
  getListings,
  getListing, // or getListingById depending on what your controller function is named
} from '../controllers/listing.controller.js';

const router = express.Router();

router.get('/get', getListings);
// Allow anyone to hit get/:id, but if verifyToken is needed, let's make it optional 
// or remove verifyToken from here so guests don't get blocked with 401:
router.get('/get/:id', getListing); 

router.post('/create', verifyToken, createListing);

export default router;