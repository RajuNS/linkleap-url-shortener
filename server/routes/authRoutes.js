const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public route for user registration
router.post('/register', registerUser);

// Public route for user login
router.post('/login', loginUser);

// Protected route to get the current logged-in user's data
router.get('/me', protect, getMe);

module.exports = router;
