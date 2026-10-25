import express from 'express';
// 1. Make sure you import the correct function name (verifyToken or verifyUser)
import { verifyToken } from '../utils/verifyUser.js'; 
import {
  getDashboardOverview,
  getSavedProperties,
  toggleSaveProperty,
  getCompareProperties,
  toggleCompareProperty,
  getChecklistProgress,
  updateChecklistTask,
  getSavedSearches,
  createSavedSearch,
  deleteSavedSearch,
  getPaymentsAndAccess,
  getNotifications,
  markNotificationRead
} from '../controllers/dashboard.controller.js';

const router = express.Router();

// 2. Replace verifyUser with verifyToken on all your routes:
router.get('/overview', verifyToken, getDashboardOverview);
router.get('/saved', verifyToken, getSavedProperties);
router.post('/saved/toggle', verifyToken, toggleSaveProperty);
router.get('/compare', verifyToken, getCompareProperties);
router.post('/compare/toggle', verifyToken, toggleCompareProperty);
router.get('/checklist', verifyToken, getChecklistProgress);
router.post('/checklist/update', verifyToken, updateChecklistTask);
router.get('/searches', verifyToken, getSavedSearches);
router.post('/searches', verifyToken, createSavedSearch);
router.delete('/searches/:id', verifyToken, deleteSavedSearch);
router.get('/payments-access', verifyToken, getPaymentsAndAccess);
router.get('/notifications', verifyToken, getNotifications);
router.patch('/notifications/:id/read', verifyToken, markNotificationRead);

export default router;