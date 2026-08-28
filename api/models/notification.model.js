import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Who triggered it or who it's for
  message: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'listing', 'comment', 'payment'
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;