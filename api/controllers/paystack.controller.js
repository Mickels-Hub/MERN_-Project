import https from 'https';
import ContactUnlock from '../models/contactUnlock.model.js';
import Payment from '../models/payment.model.js';
import Property from '../models/property.model.js';
import { errorHandler } from '../utils/error.js';

// Inside api/controllers/paystack.controller.js (initializePayment function update)
export const initializePayment = async (req, res, next) => {
  try {
    const { propertyId, email } = req.body;
    const userId = req.user.id;
    const FIXED_UNLOCK_PRICE = 45000; // Locked platform price in Naira

    const property = await Property.findById(propertyId);
    if (!property) return next(errorHandler(404, 'Property not found'));

    const existingUnlock = await ContactUnlock.findOne({ userId, propertyId, status: 'success' });
    if (existingUnlock) {
      return res.status(400).json({ success: false, message: 'You have already unlocked this contact.' });
    }
    // ... rest of the Paystack request code remains the same, using FIXED_UNLOCK_PRICE for the Payment record creation
    const params = JSON.stringify({
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      callback_url: `http://localhost:5173/property/${propertyId}?verify=true`,
      metadata: { userId, propertyId }
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const paystackReq = https.request(options, (paystackRes) => {
      let data = '';
      paystackRes.on('data', (chunk) => { data += chunk; });
      paystackRes.on('end', async () => {
        const response = JSON.parse(data);
        if (response.status) {
          // Log payment attempt
          await Payment.create({
            userId,
            propertyId,
            reference: response.data.reference,
            amount,
            status: 'pending'
          });
          return res.status(200).json({ success: true, authorization_url: response.data.authorization_url, reference: response.data.reference });
        } else {
          return res.status(400).json({ success: false, message: response.message || 'Payment initialization failed' });
        }
      });
    });

    paystackReq.on('error', (error) => { next(error); });
    paystackReq.write(params);
    paystackReq.end();
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.params;
    const userId = req.user.id;

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };

    const paystackReq = https.request(options, (paystackRes) => {
      let data = '';
      paystackRes.on('data', (chunk) => { data += chunk; });
      paystackRes.on('end', async () => {
        const response = JSON.parse(data);
        if (response.status && response.data.status === 'success') {
          const { propertyId } = response.data.metadata;
          const amountPaid = response.data.amount / 100;

          // Update payment status
          await Payment.findOneAndUpdate({ reference }, { status: 'success' });

          // Create secure ContactUnlock record if not exists
          const existingUnlock = await ContactUnlock.findOne({ userId, propertyId });
          if (!existingUnlock) {
            await ContactUnlock.create({
              userId,
              propertyId,
              transactionReference: reference,
              amount: amountPaid,
              status: 'success'
            });
          }

          return res.status(200).json({ success: true, message: 'Payment verified and contact unlocked successfully!', propertyId });
        } else {
          return res.status(400).json({ success: false, message: 'Payment verification failed.' });
        }
      });
    });

    paystackReq.on('error', (error) => { next(error); });
    paystackReq.end();
  } catch (error) {
    next(error);
  }
};