import { SavedProperty, CompareProperty, RecentlyViewed, RentalChecklist, SavedSearch, Notification } from '../models/dashboard.model.js';
import ContactUnlock from '../models/contactUnlock.model.js';
import Property from '../models/property.model.js';
import { errorHandler } from '../utils/error.js';

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

// Saved Properties Endpoints
export const getSavedProperties = async (req, res, next) => {
  try {
    const saved = await SavedProperty.find({ userId: req.user.id }).populate('propertyId');
    const properties = saved.map(s => s.propertyId).filter(Boolean);
    res.status(200).json({ success: true, properties });
  } catch (error) {
    next(error);
  }
};

export const toggleSaveProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id;

    const existing = await SavedProperty.findOne({ userId, propertyId });
    if (existing) {
      await SavedProperty.deleteOne({ _id: existing._id });
      return res.status(200).json({ success: true, saved: false, message: 'Removed from saved properties.' });
    } else {
      await SavedProperty.create({ userId, propertyId });
      return res.status(200).json({ success: true, saved: true, message: 'Added to saved properties.' });
    }
  } catch (error) {
    next(error);
  }
};

// Compare Properties Endpoints
export const getCompareProperties = async (req, res, next) => {
  try {
    const compares = await CompareProperty.find({ userId: req.user.id }).populate('propertyId');
    const properties = compares.map(c => c.propertyId).filter(Boolean);
    res.status(200).json({ success: true, properties });
  } catch (error) {
    next(error);
  }
};

export const toggleCompareProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id;

    const count = await CompareProperty.countDocuments({ userId });
    const existing = await CompareProperty.findOne({ userId, propertyId });

    if (existing) {
      await CompareProperty.deleteOne({ _id: existing._id });
      return res.status(200).json({ success: true, compared: false });
    } else {
      if (count >= 3) {
        return next(errorHandler(400, 'You can compare a maximum of 3 properties at once.'));
      }
      await CompareProperty.create({ userId, propertyId });
      return res.status(200).json({ success: true, compared: true });
    }
  } catch (error) {
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