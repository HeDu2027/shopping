const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticate = require('../middleware/authMiddleware');

// Route to fetch user data
router.get('/api/getUserData', authenticate, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the authenticate middleware adds the user object to the request

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

// Existing route to update user data
router.put('/api/updateUserData', authenticate, async (req, res) => {
    try {
        const updatedData = req.body;
        const userId = req.user._id;

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

module.exports = router;
