import User from '../models/user.model.js';
import Listing from '../models/property.model.js';
import Unlock from '../models/contactUnlock.model.js';
import ActivityLog from '../models/ActivityLog.js';
import CmsContent from '../models/CmsContent.js';

// Helper to log admin actions
const logAction = async (admin, action, details, status = 'Success') => {
  try {
    await ActivityLog.create({
      adminId: admin.id || admin._id,
      adminName: admin.username || admin.name || 'Administrator',
      action,
      details,
      status,
    });
  } catch (e) {
    console.error('Failed to write activity log:', e);
  }
};

// 1. Admin Overview Statistics & Activity Feeds
export const getAdminOverview = async (req, res, next) => {
  try {
    const totalProperties = await Listing.countDocuments();
    const publishedProperties = await Listing.countDocuments({ status: 'published' });
    const draftProperties = await Listing.countDocuments({ status: 'draft' });
    const registeredUsers = await User.countDocuments();
    const totalUnlocks = await Unlock.countDocuments({ status: 'completed' });

    // Revenue calculation
    const revenueAgg = await Unlock.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amountPaid' } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Pending contact requests
    const pendingRequests = await Unlock.countDocuments({ status: 'pending' });

    // Recent properties & users
    const recentProperties = await Listing.find().sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(5);
    const activityLogs = await ActivityLog.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      stats: {
        totalProperties,
        publishedProperties,
        draftProperties,
        registeredUsers,
        totalRevenue,
        pendingRequests,
      },
      recentProperties,
      recentUsers,
      activityLogs,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Manage Users: Get all users & update restriction status
export const getAllUsersAdmin = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatusAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isRestricted } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isRestricted },
      { new: true }
    ).select('-password');

    await logAction(req.user, 'User Status Updated', `User ${user.email} restricted status set to ${isRestricted}`);

    res.status(200).json({ success: true, message: 'User status updated successfully', user });
  } catch (error) {
    next(error);
  }
};

// 3. Manage Properties: Admin override (publish, archive, delete)
export const updateListingStatusAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'published', 'draft', 'archived'

    const listing = await Listing.findByIdAndUpdate(id, { status }, { new: true });
    await logAction(req.user, 'Property Status Changed', `Listing "${listing.name}" marked as ${status}`);

    res.status(200).json({ success: true, message: `Listing marked as ${status}`, listing });
  } catch (error) {
    next(error);
  }
};

export const deleteListingAdmin = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    await logAction(req.user, 'Property Deleted', `Listing "${listing?.name || req.params.id}" permanently removed`);

    res.status(200).json({ success: true, message: 'Property deleted successfully by admin' });
  } catch (error) {
    next(error);
  }
};

// 4. Homepage CMS Management
export const getCmsContent = async (req, res, next) => {
  try {
    const settings = await CmsContent.find();
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

export const updateCmsContent = async (req, res, next) => {
  try {
    const { section, content } = req.body;
    const updated = await CmsContent.findOneAndUpdate(
      { section },
      { content },
      { new: true, upsert: true }
    );

    await logAction(req.user, 'Homepage CMS Updated', `Section "${section}" modified successfully`);
    res.status(200).json({ success: true, message: 'CMS updated successfully', updated });
  } catch (error) {
    next(error);
  }
};