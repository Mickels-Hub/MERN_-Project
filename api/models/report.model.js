import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    reason: { type: String, required: true },
    details: { type: String },
    status: { type: String, default: 'pending' }, // pending, resolved, dismissed
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;