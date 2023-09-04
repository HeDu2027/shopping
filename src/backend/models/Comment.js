const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: String,
        ref: 'Project',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    images: [String],
    videos: [String],
    title: String,
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
