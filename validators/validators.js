const { check } = require('express-validator');

const registerValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  
  check('email')
    .isEmail()
    .withMessage('Please include a valid email'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidator = [
  check('email')
    .isEmail()
    .withMessage('Please include a valid email'),
  
  check('password', 'Password is required').exists(),
];

module.exports = {
  registerValidator,
  loginValidator,
};
