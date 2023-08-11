const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.post('/save-card', async (req, res) => {
    try {
        const cardData = req.body;
        const card = new Card(cardData);
        await card.save();
        res.status(200).json({ message: 'Card saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving card' });
    }
});

router.get('/get-card/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const card = await Card.findOne({ userId, isRemembered: true });
        res.status(200).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching card' });
    }
});

module.exports = router;
