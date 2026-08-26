import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { test, updateUser, deleteUser, getUsers, updateUserRole, addUserByAdmin } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

// --- NEW ADMIN ROUTES ---
router.get('/get-users', verifyToken, getUsers);
router.post('/add-user', verifyToken, addUserByAdmin);
router.post('/update-role/:id', verifyToken, updateUserRole);
router.delete('/delete/:id', verifyToken, deleteUser);

export default function userRouter() { return router; } // (Keep your export format matching whatever you currently use)