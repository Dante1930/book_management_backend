const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const generateToken = require('../utils/jwt');

// Register a new user
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body)
    const { name, email, password } = req.body;

  
    try {
      let user = await User.findOne({ email });
      if (user) {      
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        name,
        email,
        password,
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user
      await user.save();
  
      // Generate token
      const token = generateToken(user);
  
      // Return token
      res.status(201).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  
  

// Login a user
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate token
      const token = generateToken(user);
  
      // Return token
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

// Get the currently logged-in user's profile
exports.getUserProfile = async (req, res) => {
  try {
    // Fetch user data excluding password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
