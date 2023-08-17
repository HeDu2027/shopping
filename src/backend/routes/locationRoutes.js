// locationRoutes.js

const express = require('express');
const router = express.Router();

// This is just a placeholder. You can add more routes or logic as needed.
const Location = require('../models/Location');  // Import the Location model

// Endpoint to save a new location
router.post('/save', async (req, res) => {
    try {
        const { latitude, longitude, placeName } = req.body;
        const newLocation = new Location({ latitude, longitude, placeName });
        await newLocation.save();
        res.status(201).json({ message: 'Location saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save location' });
    }
});

module.exports = router;
