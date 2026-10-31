import { SavedProperty, CompareProperty, RecentlyViewed, RentalChecklist, SavedSearch, Notification } from '../models/dashboard.model.js';
import ContactUnlock from '../models/contactUnlock.model.js';
import Property from '../models/property.model.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
// Get Dashboard Overview Statistics & Summary
export const getDashboardOverview = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const savedCount = await SavedProperty.countDocuments({ userId });
    const compareCount = await CompareProperty.countDocuments({ userId });
    const searchesCount = await SavedSearch.countDocuments({ userId });
    const contactUnlockCount = await ContactUnlock.countDocuments({ userId, status: 'success' });

    // Get recently viewed properties
    const recentViews = await RecentlyViewed.find({ userId })
      .sort({ viewedAt: -1 })
      .limit(4)
      .populate('propertyId');

    const recentlyViewedListings = recentViews.map(v => v.propertyId).filter(Boolean);

    return res.status(200).json({
      success: true,
      stats: {
        savedProperties: savedCount,
        comparedProperties: compareCount,
        recentSearches: searchesCount,
        contactAccess: contactUnlockCount
      },
      recentlyViewed: recentlyViewedListings
    });
  } catch (error) {
    next(error);
  }
};

// Get all saved properties for logged-in user
// 2. Comprehensive Fetch Function (Checks all possible locations)
export const getSavedProperties = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let properties = [];

    // Check Collection A: SavedProperty model
    const savedRecords = await SavedProperty.find({ userId }).populate('propertyId');
    if (savedRecords && savedRecords.length > 0) {
      properties = savedRecords.map((s) => s.propertyId).filter(Boolean);
    }

    // Check Collection B: User model fields if Collection A is empty
    if (properties.length === 0) {
      const user = await User.findById(userId).populate('savedProperties') || await User.findById(userId).populate('favorites');
      if (user) {
        properties = user.savedProperties || user.favorites || [];
      }
    }

    console.log('--- MONGODB FETCH DEBUG ---');
    console.log('Total properties resolved for user:', properties.length);

    return res.status(200).json({ 
      success: true, 
      properties 
    });
  } catch (error) {
    console.error('Fetch Saved Error:', error);
    return res.status(200).json({ success: true, properties: [] });
  }
};

// Toggle Save / Unsave Property
// 1. Diagnostic Save/Toggle Function
export const toggleSaveProperty = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.body;

    console.log('--- MONGODB SAVE DEBUG ---');
    console.log('User ID:', userId);
    console.log('Property ID received:', propertyId);

    // Check SavedProperty collection
    const existing = await SavedProperty.findOne({ userId, propertyId });

    if (existing) {
      await SavedProperty.findByIdAndDelete(existing._id);
      console.log('Removed from SavedProperty collection.');
      return res.status(200).json({ success: true, saved: false, message: 'Removed' });
    } else {
      const newSave = await SavedProperty.create({ userId, propertyId });
      console.log('Successfully saved document in SavedProperty collection:', newSave._id);
      return res.status(200).json({ success: true, saved: true, message: 'Saved' });
    }
  } catch (error) {
    console.error('Save Property Error:', error);
    next(error);
  }
};

// Get Compare Properties for the logged-in user
// 1. Get Compare Properties (Manually fetch the properties using the saved IDs)
export const getCompareProperties = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const propertyIds = user.comparedProperties || [];
    const properties = await Property.find({ _id: { $in: propertyIds } });

    return res.status(200).json({ success: true, properties });
  } catch (error) {
    console.error('Error fetching compare properties:', error);
    next(error);
  }
};

// 2. Toggle Compare Property
export const toggleCompareProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.comparedProperties) {
      user.comparedProperties = [];
    }

    const existingIndex = user.comparedProperties.findIndex(
      (id) => id.toString() === propertyId.toString()
    );

    if (existingIndex > -1) {
      user.comparedProperties.splice(existingIndex, 1);
    } else {
      user.comparedProperties.push(propertyId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      comparedProperties: user.comparedProperties,
      message: existingIndex > -1 ? 'Removed from compare' : 'Added to compare',
    });
  } catch (error) {
    console.error('Error toggling compare:', error);
    next(error);
  }
};

// Rental Checklist Endpoints
export const getChecklistProgress = async (req, res, next) => {
  try {
    const tasks = await RentalChecklist.find({ userId: req.user.id });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

export const updateChecklistTask = async (req, res, next) => {
  try {
    const { taskId, completed } = req.body;
    const userId = req.user.id;

    let task = await RentalChecklist.findOne({ userId, taskId });
    if (task) {
      task.completed = completed;
      await task.save();
    } else {
      task = await RentalChecklist.create({ userId, taskId, completed });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

// Saved Searches Endpoints
export const getSavedSearches = async (req, res, next) => {
  try {
    const searches = await SavedSearch.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, searches });
  } catch (error) {
    next(error);
  }
};

export const createSavedSearch = async (req, res, next) => {
  try {
    const { name, searchParams } = req.body;
    const search = await SavedSearch.create({ userId: req.user.id, name, searchParams });
    res.status(201).json({ success: true, search });
  } catch (error) {
    next(error);
  }
};

export const deleteSavedSearch = async (req, res, next) => {
  try {
    await SavedSearch.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ success: true, message: 'Saved search deleted.' });
  } catch (error) {
    next(error);
  }
};

// Payments & Contact Access Endpoints
export const getPaymentsAndAccess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const unlocks = await ContactUnlock.find({ userId }).populate('propertyId');
    res.status(200).json({ success: true, unlocks });
  } catch (error) {
    next(error);
  }
};

// Notifications Endpoints
export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req, res, next) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { read: true });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};