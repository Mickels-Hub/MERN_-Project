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

// Toggle Save Listing
export const toggleSaveListing = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const listingId = req.params.listingId;
    let savedProperties = [...user.savedProperties];
    
    if (savedProperties.includes(listingId)) {
      savedProperties = savedProperties.filter(id => id !== listingId);
    } else {
      savedProperties.push(listingId);
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { savedProperties } },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Toggle Compare Listing
export const toggleCompareListing = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const listingId = req.params.listingId;
    let comparedProperties = [...user.comparedProperties];
    
    if (comparedProperties.includes(listingId)) {
      comparedProperties = comparedProperties.filter(id => id !== listingId);
    } else {
      if (comparedProperties.length >= 4) return next(errorHandler(400, 'You can compare up to 4 properties at a time.'));
      comparedProperties.push(listingId);
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { comparedProperties } },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Get User Searches
export const getUserSearches = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.searches || []);
  } catch (error) {
    next(error);
  }
};

// Delete Search
// Delete Search
export const deleteUserSearch = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.searches) {
      user.searches = [];
    }

    // Filter out the item matching req.params.id
    user.searches = user.searches.filter(
      (s) => s._id.toString() !== req.params.id
    );

    await user.save();
    return res.status(200).json({ success: true, message: 'Search deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Edit Search
export const updateUserSearch = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const updatedSearches = user.searches.map(s => {
      if (s._id.toString() === req.params.id) {
        s.query = req.body.query;
      }
      return s;
    });
    await User.findByIdAndUpdate(req.user.id, { $set: { searches: updatedSearches } });
    res.status(200).json({ success: true, message: 'Search updated successfully' });
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
  try {
    const userId = req.params.id || req.user.id;
    const payments = await Payment.find({ userRef: userId }).sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// Delete Payment Record
export const deletePayment = async (req, res, next) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Payment record deleted' });
  } catch (error) {
    next(error);
  }
};

// Verify & Save Paystack Payment
export const verifyPaystackPayment = async (req, res, next) => {
  try {
    const { reference, propertyId, listingTitle, listingDescription, amount, currency } = req.body;
    const newPayment = new Payment({
      userRef: req.user.id,
      propertyId,
      listingTitle,
      listingDescription,
      amount,
      currency,
      reference,
    });
    await newPayment.save();
    res.status(200).json({ success: true, message: 'Payment recorded successfully' });
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
// Save a search query to user history
export const saveSearchQuery = async (req, res, next) => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: 'Query cannot be empty' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
if (!user.searches) {
      user.searches = [];
    }

    // Add search term to array
    user.searches.push({ query: query.trim() });
    await user.save();

    return res.status(200).json({ success: true, message: 'Search query saved' });
  } catch (error) {
    next(error);
  }
};

// Get user saved search history
export const getSavedSearches = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return searches array sorted by newest first
    const searches = (user.searches || []).reverse();
    return res.status(200).json({ success: true, searches });
  } catch (error) {
    next(error);
  }
};