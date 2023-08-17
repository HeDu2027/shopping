// models/LeaveMessage.js

const mongoose = require('mongoose');

const LeaveMessageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    image: Buffer,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LeaveMessage', LeaveMessageSchema);

