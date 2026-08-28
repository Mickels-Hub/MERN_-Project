import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// Optional: Initialize payment from backend if needed
export const initializePayment = async (req, res, next) => {
  try {
    // You can handle backend initialization here if required, 
    // or let the frontend react-paystack handle it directly.
    res.status(200).json({ success: true, message: 'Ready to initialize' });
  } catch (error) {
    next(error);
  }
};

// Verify payment and update user status
export const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.body;
    const userId = req.user.id; // From your verifyToken middleware

    if (!reference) {
      return next(errorHandler(400, 'Payment reference is required'));
    }

    // Verify the transaction with Paystack's API
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== 'success') {
      return next(errorHandler(400, 'Payment verification failed'));
    }

    // If successful, update the user's status in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isPaid: true,
        paymentReference: reference,
      },
      { new: true }
    );

    // Create and save the permanent welcome notification for the paid user
    const newNotification = new Notification({
      userId: updatedUser._id,
      message: "Welcome to Mikel's Estate! Your account is active.",
      type: "system",
      isRead: false,
    });
    await newNotification.save();

    return res.status(200).json({
      success: true,
      message: 'Payment successful and access granted!',
      user: updatedUser,
    });

  } catch (error) {
    next(error);
  }
};