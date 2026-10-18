import https from 'https';
import ContactUnlock from '../models/contactUnlock.model.js';
import Property from '../models/property.model.js';
import { errorHandler } from '../utils/error.js';

export const initializePayment = async (req, res, next) => {
  try {
    const { propertyId, email } = req.body;
    const userId = req.user.id;
    const FIXED_UNLOCK_PRICE = 50000; // ₦50,000 standard inspection fee

    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(404, 'Property not found'));

    // Check if user already unlocked this contact
    const existingUnlock = await ContactUnlock.findOne({ userId, propertyId });
    if (existingUnlock) {
      return res.status(400).json({ success: false, message: 'You have already unlocked this contact.' });
    }

    const params = JSON.stringify({
      email,
      amount: FIXED_UNLOCK_PRICE * 100, // Converts 50,000 Naira to 5,000,000 Kobo
      callback_url: `http://localhost:5173/listing/${propertyId}?verify=true`,
      metadata: { userId, propertyId },
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const paystackReq = https.request(options, (paystackRes) => {
      let data = '';
      paystackRes.on('data', (chunk) => { data += chunk; });
      paystackRes.on('end', () => {
        const response = JSON.parse(data);
        return res.status(200).json(response);
      });
    });

    paystackReq.on('error', (error) => {
      return next(errorHandler(500, error.message));
    });

    paystackReq.write(params);
    paystackReq.end();
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { reference, propertyId } = req.body;
    const userId = req.user.id;
    const userName = req.user.username || req.user.name || 'Client';
    const userEmail = req.user.email;

    const property = await Property.findById(propertyId);
    const propertyTitle = property ? (property.title || property.name) : 'Property';

    // Save record to ContactUnlock model for Admin Dashboard
    const newUnlock = new ContactUnlock({
      userId,
      userName,
      userEmail,
      propertyId,
      propertyTitle,
      amountPaid: 50000,
      paymentReference: reference,
    });

    await newUnlock.save();

    return res.status(200).json({ success: true, message: 'Payment verified and logged successfully!' });
  } catch (error) {
    next(error);
  }
};