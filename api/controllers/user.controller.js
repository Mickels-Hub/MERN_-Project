import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

// --- EXISTING FUNCTIONS ---
export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  try {
    if (req.body.password && req.body.password.trim() !== '') {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    } else {
      delete req.body.password;
    }

    const updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.avatar) updateData.avatar = req.body.avatar;
    if (req.body.password) updateData.password = req.body.password;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.email !== 'ugochukwumickel15@gmail.com') {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  if (req.user.email !== 'ugochukwumickel15@gmail.com') {
    return next(errorHandler(403, 'You are not authorized to see all users!'));
  }
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Admin manually add user / community member
export const addUserByAdmin = async (req, res, next) => {
  if (req.user.email !== 'ugochukwumickel15@gmail.com') {
    return next(errorHandler(403, 'Only admin can add members directly!'));
  }
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Update User Role
export const updateUserRole = async (req, res, next) => {
  if (req.user.email !== 'ugochukwumickel15@gmail.com') {
    return next(errorHandler(403, 'Only main admin can change roles!'));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { role: req.body.role } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};