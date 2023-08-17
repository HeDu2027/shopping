const express = require('express');
const VideoCall = require('../models/VideoCall');

const router = express.Router();

router.post('/start', async (req, res) => {
    const { callId, users } = req.body;

    if (!callId) {
        return res.status(400).json({ error: 'callId is required' });
    }

    if (!users || !Array.isArray(users) || users.some(userId => typeof userId !== 'string' || userId.length !== 24)) {
        return res.status(400).json({ error: 'Invalid users array' });
    }

    try {
        const newCall = new VideoCall({ callId, users });
        await newCall.save();
        console.log(`Video call with ID ${callId} started successfully between users: ${users.join(', ')}`);
        res.status(201).json({ message: 'Call started successfully', callId });
    } catch (error) {
        console.error('Error saving VideoCall:', error);
        return res.status(500).json({ error: 'Failed to start call' });
    }

});

module.exports = router;
