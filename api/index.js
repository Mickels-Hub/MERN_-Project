import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

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

app.use(express.json());

// Routes MUST come before app.listen
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Put app.listen at the VERY BOTTOM
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});