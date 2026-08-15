// controllers/auth.controller.js

import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // 1. Validation check goes right here
  if (!password || password === '') {
    return res.status(400).json({ 
      success: false, 
      message: 'Password is required' 
    });
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    next(error);
  }
};