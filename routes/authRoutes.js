const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { registerValidator, loginValidator } = require('../validators/validators');

const router = express.Router();

router.post('/register',registerValidator, registerUser);
router.post('/login',loginValidator, loginUser);
router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
