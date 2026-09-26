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
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $set: { isRead: true } },
      { new: true }
    );
    
    if (!updatedNotification) {
      return next(errorHandler(404, 'Notification not found!'));
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    next(error);
  }
};