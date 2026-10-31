import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userRef: { type: String, required: true },
  propertyId: { type: String, required: true },
  listingTitle: { type: String },
  listingDescription: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'NGN' },
  reference: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;