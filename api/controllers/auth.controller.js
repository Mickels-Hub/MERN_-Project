import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import Notification from '../models/notification.model.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();

    // --- 1. SEND WELCOME NOTIFICATION TO THE NEW USER ---
    const welcomeNotification = new Notification({
      userId: newUser._id,
      message: 'Welcome to Mikel’s Estate! Explore properties and connect with our community.',
      type: 'welcome',
    });
    await welcomeNotification.save();

    // --- 2. SEND REGISTRATION ALERT EXCLUSIVELY TO THE ADMIN ---
    const adminUser = await User.findOne({ isAdmin: true });
    if (adminUser) {
      const adminAlert = new Notification({
        userId: adminUser._id,
        message: `${newUser.username} just signed up successfully!`,
        type: 'signup-alert',
      });
      await adminAlert.save();
    }

      const newNotification = new Notification({
  userId: newUser._id,
  message: `${newUser.username} just signed in.`,
  type: 'signup', // This makes it easy to filter for the admin dashboard!
});
await newNotification.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid credentials'));
    }

    // --- TRIGGER NOTIFICATION ON SUCCESSFUL SIGNIN ---
    const newNotification = new Notification({
      userId: validUser._id,
      message: `${validUser.username || validUser.email} just signed in.`,
      type: 'login',
    });
    await newNotification.save();

    const token = jwt.sign(
      { 
        id: validUser._id, 
        email: validUser.email, 
        isPaid: validUser.isPaid, 
        isAdmin: validUser.isAdmin 
      }, 
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id, email: user.email, isPaid: user.isPaid, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, email: newUser.email, isPaid: newUser.isPaid }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};