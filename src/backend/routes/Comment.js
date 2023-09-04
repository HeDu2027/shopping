const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Create a new comment
router.post('/comments', async (req, res) => {
    try {
        const { projectId, userId, ...otherFields } = req.body;

        if (!projectId || !userId) {
            return res.status(400).send({ error: 'Missing productId or userId' });
        }

        const comment = new Comment({
            projectId,
            userId,
            ...otherFields
        });
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
    console.log('Received data:', req.body);
});

// Get all comments for a specific user
router.get('/products/:productId/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ projectId: req.params.productId });
        res.send(comments);
    } catch (error) {
        res.status(500).send();
    }
});


router.put('/comments/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
