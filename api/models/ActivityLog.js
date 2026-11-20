import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true, // e.g. "Property Created", "User Restricted"
    },
    details: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Success', 'Warning', 'Failed'],
      default: 'Success',
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;