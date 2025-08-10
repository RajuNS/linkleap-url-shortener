const mongoose = require('mongoose');

// Schema for detailed click analytics
const clickSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
});

const urlSchema = new mongoose.Schema({
    original_url: { 
        type: String, 
        required: true 
    },
    short_code: { 
        type: String, 
        required: true, 
        unique: true,
        index: true 
    },
    custom_alias: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: false 
    },
    clicks: { 
        type: Number, 
        default: 0 
    },
    click_details: [clickSchema],
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
