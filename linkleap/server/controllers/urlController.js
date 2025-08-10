const shortid = require('shortid');
const Url = require('../models/urlModel');

// @desc    Create a short URL
// @route   POST /api/urls
// @access  Public (with optional auth)
const createShortUrl = async (req, res) => {
    const { originalUrl, customAlias } = req.body;

    // Check if the main URL was provided
    if (!originalUrl) {
        return res.status(400).json({ message: 'Please provide an original URL' });
    }

    try {
        // If a user wants a custom name, check if it's already taken
        if (customAlias) {
            const existingAlias = await Url.findOne({ custom_alias: customAlias });
            if (existingAlias) {
                return res.status(400).json({ message: 'Custom alias already in use' });
            }
        }
        
        // Use the custom name if provided, otherwise generate a random short ID
        const shortCode = customAlias || shortid.generate();

        // Create the new URL document in the database
        const newUrl = new Url({
            original_url: originalUrl,
            short_code: shortCode,
            custom_alias: customAlias,
            user: req.user ? req.user.id : null, // Attach user ID if they are logged in
        });

        await newUrl.save();
        res.status(201).json(newUrl);

    } catch (error) {
        console.error('Create URL Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all URLs for a logged-in user
// @route   GET /api/urls
// @access  Private
const getUrlsForUser = async (req, res) => {
    try {
        const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (error) {
        console.error('Get URLs Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a URL
// @route   DELETE /api/urls/:id
// @access  Private
const deleteUrl = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        if (!url.user || url.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await url.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'URL removed' });
    } catch (error) {
        console.error('Delete URL Error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createShortUrl,
    getUrlsForUser,
    deleteUrl,
};
