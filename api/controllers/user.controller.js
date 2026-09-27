import User from '../models/user.model.js';
import ContactUnlock from '../models/contactUnlock.model.js';
import Payment from '../models/payment.model.js';
import Favorite from '../models/favorite.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

// Update User Profile with password hashing and validation
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
};

// Get properties unlocked by the user
export const getUserUnlocks = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'Unauthorized access to unlocks!'));
  }
  try {
    const unlocks = await ContactUnlock.find({ userId: req.params.id }).populate('propertyId');
    res.status(200).json({ success: true, unlocks });
  } catch (error) {
    next(error);
  }
};

// Get payment audit logs for the user
export const getUserPayments = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'Unauthorized access to payments!'));
  }
  try {
    const payments = await Payment.find({ userId: req.params.id }).populate('propertyId').sort({ createdAt: -1 });
    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};

// Toggle a property favorite
export const toggleFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const existing = await Favorite.findOne({ userId: req.user.id, propertyId });
    
    if (existing) {
      await Favorite.findByIdAndDelete(existing._id);
      return res.status(200).json({ success: true, message: 'Removed from favorites' });
    }
    
    const newFavorite = new Favorite({ userId: req.user.id, propertyId });
    await newFavorite.save();
    res.status(200).json({ success: true, message: 'Added to favorites' });
  } catch (error) {
    next(error);
  }
};

// Get user favorite properties
export const getUserFavorites = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'Unauthorized access to favorites!'));
  }
  try {
    const favorites = await Favorite.find({ userId: req.params.id }).populate('propertyId');
    res.status(200).json({ success: true, favorites });
  } catch (error) {
    next(error);
  }
};