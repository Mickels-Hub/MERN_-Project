import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
  updateUser, 
  getUserUnlocks, 
  toggleFavorite, 
  getUserFavorites,
  toggleSaveListing,
  toggleCompareListing,
  getUserSearches,
  deleteUserSearch,
  updateUserSearch,
  getUserPayments,
  deletePayment,
  verifyPaystackPayment,
  saveSearchQuery,
   getSavedSearches
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.get('/unlocks/:id', verifyToken, getUserUnlocks);
router.post('/favorite', verifyToken, toggleFavorite);
router.get('/favorites/:id', verifyToken, getUserFavorites);

// New Dashboard & Feature Routes
router.post('/save-listing/:listingId', verifyToken, toggleSaveListing);
router.post('/compare-listing/:listingId', verifyToken, toggleCompareListing);
router.get('/searches', verifyToken, getUserSearches);
router.delete('/search/:id', verifyToken, deleteUserSearch);
router.put('/search/:id', verifyToken, updateUserSearch);
router.get('/payments', verifyToken, getUserPayments);
router.delete('/payments/:id', verifyToken, deletePayment);
router.post('/paystack/verify', verifyToken, verifyPaystackPayment);
router.post('/save-search', verifyToken, saveSearchQuery);
router.get('/searches', verifyToken, getUserSearches);
router.delete('/search/:id', verifyToken, deleteUserSearch);

export default router;