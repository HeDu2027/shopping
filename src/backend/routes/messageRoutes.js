const express = require('express');
const router = express.Router();
const Message = require('../models/msg');

// Route to send a message
router.post('/routes/messages/send', (req, res) => {
    const message = new MessageModel({ content: req.body.content, type: req.body.type });
    message.save()
        .then(savedMessage => {
            console.log("Message saved successfully:", savedMessage);
            res.json(savedMessage);
        })
        .catch(err => {
            console.error("Error saving message:", err);
            res.status(500).json({ error: "Failed to save message" });
        });
});


// Route to get all messages
router.get('/all', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

