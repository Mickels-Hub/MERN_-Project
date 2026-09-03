import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import listingRoutes from './routes/listing.route.js';
import paystackRouter from './routes/paystack.route.js';
import communityRouter from './routes/community.route.js';
import notificationRouter from './routes/notification.route.js';
import cors from 'cors';
import adminRouter from './routes/admin.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Move all route declarations here, BEFORE app.listen():
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/paystack', paystackRouter);
app.use('/api/community', communityRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/admin', adminRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
