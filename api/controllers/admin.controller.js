import Property from '../models/property.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Report from '../models/report.model.js';
import Favorite from '../models/favorite.model.js';

export const createProperty = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Access denied! Admin only.'));
    }
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    return res.status(201).json({ success: true, property: savedProperty });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) return next(errorHandler(403, 'Access denied!'));
    
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, property: updatedProperty });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
        if (!req.user.isAdmin) return next(errorHandler(403, 'Access denied!'));
    await Property.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Property deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Get all reported listings for admin moderation
export const getAdminReports = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Access denied! Admin only.'));
    }
    const reports = await Report.find({})
      .populate('userId', 'username email')
      .populate('propertyId', 'title location');
    return res.status(200).json({ success: true, reports });
  } catch (error) {
    next(error);
  }
};

// Get trending/most-favorited properties for admin market insights
export const getPopularFavorites = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Access denied! Admin only.'));
    }
    const popular = await Favorite.aggregate([
      { $group: { _id: '$propertyId', favoriteCount: { $sum: 1 } } },
      { $sort: { favoriteCount: -1 } },
      { $limit: 5 }
    ]);
    const populatedPopular = await Property.populate(popular, { path: '_id' });
    return res.status(200).json({ success: true, popular: populatedPopular });
  } catch (error) {
    next(error);
  }
};

export const getAdminStats = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) return next(errorHandler(403, 'Access denied!'));
    const totalProperties = await Property.countDocuments();
    const totalUsers = await User.countDocuments();
    return res.status(200).json({ success: true, totalProperties, totalUsers });
  } catch (error) {
    next(error);
  }
};