const mongoose = require('mongoose');

const videoCallSchema = new mongoose.Schema({
    callId: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Assuming you have a User model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('VideoCall', videoCallSchema);
