const express = require('express');
const router = express.Router();
const LeaveMessage = require('../models/LeaveMessage');
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage(); // This will store the file in memory. You can configure it to save to disk or other locations.
const upload = multer({ storage: storage });

router.post('/submit', upload.single('image'), async (req, res) => {
    console.log("Received a request to /submit");
    console.log("Request body:", req.body);
    console.log("Received image:", req.file);

    try {
        const { type, message } = req.body;
        const image = req.file ? req.file.buffer : null; // If you're storing the image in memory

        console.log("Extracted data:", { type, message, image });

        const newMessage = new LeaveMessage({
            type,
            message,
            image
        });

        const savedMessage = await newMessage.save();
        console.log("Saved message:", savedMessage);
        res.json(savedMessage);
    } catch (error) {
        console.error("Error while processing /submit:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
