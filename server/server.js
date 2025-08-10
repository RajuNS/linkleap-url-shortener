require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Url = require('./models/urlModel');

// --- App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- !! TEMPORARY DEBUGGING STEP !! ---
// Replace the placeholder below with your full MongoDB Atlas connection string.
const MONGO_URI_DEBUG = "mongodb+srv://nelapatir1:Ramadevi@143@cluster0.zuhccvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// --- Database Connection ---
mongoose.connect(MONGO_URI_DEBUG) // We are using the hardcoded string here
  .then(() => console.log('MongoDB Connected Successfully...'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/urls', require('./routes/urlRoutes'));

// --- Redirect Logic ---
app.get('/:code', async (req, res) => {
  const code = req.params.code;
  try {
    const url = await Url.findOne({ $or: [{ short_code: code }, { custom_alias: code }] });

    if (url) {
      url.clicks++;
      url.click_details.push({
        timestamp: new Date(),
        userAgent: req.headers['user-agent']
      });
      await url.save();
      return res.redirect(url.original_url);
    } else {
      return res.status(404).json('No URL Found');
    }
  } catch (err) {
    console.error('Redirect Error:', err);
    res.status(500).json('Server Error');
  }
});

// --- Server Listen ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
