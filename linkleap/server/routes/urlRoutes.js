const express = require('express');
const router = express.Router();
const { createShortUrl, getUrlsForUser, deleteUrl } = require('../controllers/urlController');
const { protect } = require('../middleware/authMiddleware');

// Route to create a short URL. Can be accessed by anyone, but will be associated with a user if logged in.
// NOTE: We make this a protected route so we can access `req.user` if the user is logged in.
// The controller logic will handle cases where `req.user` is null (i.e., anonymous user).
router.post('/', protect, createShortUrl);

// Protected route to get all URLs for the currently logged-in user
router.get('/', protect, getUrlsForUser);

// Protected route to delete a specific URL by its ID
router.delete('/:id', protect, deleteUrl);

// This is the most important line! It exports the router itself.
module.exports = router;
