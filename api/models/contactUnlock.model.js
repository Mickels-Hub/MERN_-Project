import mongoose from 'mongoose';

const contactUnlockSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    propertyId: {
      type: String,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentReference: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ContactUnlock = mongoose.model('ContactUnlock', contactUnlockSchema);
export default ContactUnlock;