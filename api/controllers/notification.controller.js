import Notification from '../models/notification.model.js';
import { errorHandler } from '../utils/error.js';

// Get all notifications for the logged-in user
export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// Create a new notification (can be used for system alerts, payments, etc.)
export const createNotification = async (req, res, next) => {
  try {
    const { userId, message, type } = req.body;
    
    const newNotification = new Notification({
      userId,
      message,
      type: type || 'system', // defaults to 'system' if not provided
      isRead: false,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    next(error);
  }
};

// Mark notifications as read
export const markAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json('Notifications marked as read.');
  } catch (error) {
    next(error);
  }
};