import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// User Registration / Sign Up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

// User Login / Sign In (Supports both Regular Users and Admin)
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Check if user is admin or explicitly force Admin for your specific email
    const isAdminUser = validUser.isAdmin || validUser.email === 'ugochukwumickel15@gmail.com';

    // Generate JWT token with user id and admin status
    const token = jwt.sign(
      { id: validUser._id, isAdmin: isAdminUser },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000 * 24 * 7); // 7 days

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: expiryDate,
        secure: false,
        sameSite: 'lax',
        path: '/',
      })
      .status(200)
      .json({ 
        ...rest, 
        isAdmin: isAdminUser, 
        token // <--- Added token to response payload!
      });

  } catch (error) {
    next(error);
  }
};

// Google OAuth Login
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isAdminUser = user.isAdmin || user.email === 'ugochukwumickel15@gmail.com';
      const token = jwt.sign(
        { id: user._id, isAdmin: isAdminUser },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000 * 24 * 7);
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
          secure: false,
          sameSite: 'lax',
          path: '/',
        })
        .status(200)
        .json({ ...rest, isAdmin: isAdminUser, token });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        isAdmin: req.body.email === 'ugochukwumickel15@gmail.com',
      });
      await newUser.save();
      const isAdminUser = newUser.isAdmin || newUser.email === 'ugochukwumickel15@gmail.com';
      const token = jwt.sign(
        { id: newUser._id, isAdmin: isAdminUser },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000 * 24 * 7);
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
          secure: false,
          sameSite: 'lax',
          path: '/',
        })
        .status(200)
        .json({ ...rest, isAdmin: isAdminUser, token });
    }
  } catch (error) {
    next(error);
  }
};

// User Sign Out
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token', { path: '/' });
    res.status(200).json({ success: true, message: 'User has been logged out successfully!' });
  } catch (error) {
    next(error);
  }
};