import mongoose from 'mongoose';

const contactUnlockSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    transactionReference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, default: 45000 },
    status: { type: String, default: 'success' },
  },
  { timestamps: true }
);

const ContactUnlock = mongoose.model('ContactUnlock', contactUnlockSchema);
export default ContactUnlock;