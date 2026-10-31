import express from 'express';
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
  markNotificationRead,
} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/overview', verifyToken, getDashboardOverview);
router.get('/saved', verifyToken, getSavedProperties);
router.post('/saved', verifyToken, toggleSaveProperty);
router.get('/compare', verifyToken, getCompareProperties);
router.post('/compare', verifyToken, toggleCompareProperty);
router.get('/checklist', verifyToken, getChecklistProgress);
router.post('/checklist', verifyToken, updateChecklistTask);
router.get('/searches', verifyToken, getSavedSearches);
router.post('/searches', verifyToken, createSavedSearch);
router.delete('/searches/:id', verifyToken, deleteSavedSearch);
router.get('/payments', verifyToken, getPaymentsAndAccess);
router.get('/notifications', verifyToken, getNotifications);
router.post('/notifications/:id/read', verifyToken, markNotificationRead);

export default router;