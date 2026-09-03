import Notification from '../models/notification.model.js';
import { errorHandler } from '../utils/error.js';

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const newNotification = new Notification({
      userId: req.body.userId || req.user.id,
      message: req.body.message,
      type: req.body.type || 'system',
    });
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json('Notifications marked as read');
  } catch (error) {
    next(error);
  }
};