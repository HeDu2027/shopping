const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Assuming you have a User model
    },
    sharedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', fileSchema);
