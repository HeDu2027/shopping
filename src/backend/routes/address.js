// routes/address.js

const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

router.post('/save', async (req, res) => {
    try {
        const { userId, ...addressData } = req.body;
        const address = new Address({
            userId,
            ...addressData
        });
        await address.save();
        res.status(200).json({ message: 'Address saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving address' });
    }
});

module.exports = router;
