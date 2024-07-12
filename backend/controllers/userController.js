
import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/AuthMiddleware.js';


// Inside registerUser function in userController.js

export const registerUser = async (req, res) => {
  const { username, email, password, socketId } = req.body;
  console.log('Registering user with socketId:', socketId);

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Log to check if password and salt are properly defined
    console.log('Password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Salt:', salt);

    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ username, email, password: hashedPassword, socketId });
    await user.save();

    res.status(201).json({
      message: user._id,
      username: user.username
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  export const loginUser = async (req, res) => {
    const { email, password, socketId } = req.body;
    console.log('Logging in user with socketId:', socketId);
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Update socketId
      if (socketId) {
        user.socketId = socketId;
        await user.save();
      }
  
      // Generate JWT token
      const token = generateToken(user._id);
  
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
 
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };