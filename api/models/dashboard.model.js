import mongoose from 'mongoose';

// Saved Properties Schema
const savedPropertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
}, { timestamps: true });

// Compared Properties Schema
const comparePropertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
}, { timestamps: true });

// Recently Viewed Schema
const recentlyViewedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  viewedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Rental Checklist Schema
const rentalChecklistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: String, required: true }, // e.g., 'task-1' to 'task-6'
  completed: { type: Boolean, default: false }
}, { timestamps: true });

// Saved Searches Schema
const savedSearchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  searchParams: { type: Object, required: true },
  alertsEnabled: { type: Boolean, default: true }
}, { timestamps: true });

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String, default: '#' },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema);
export const CompareProperty = mongoose.model('CompareProperty', comparePropertySchema);
export const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);
export const RentalChecklist = mongoose.model('RentalChecklist', rentalChecklistSchema);
export const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);
export const Notification = mongoose.model('Notification', notificationSchema);