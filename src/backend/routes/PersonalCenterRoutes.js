const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticate = require('../middleware/authMiddleware');

router.get('/user/:userId/browser-history', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('browsingHistory.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ browsingHistory: user.browsingHistory });
    } catch (error) {
        console.error("Error fetching browser history:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add product to user's browser history
router.post('/user/:userId/browser-history', authenticate, async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        // Check if the product is already in the browsing history
        const existingProduct = user.browsingHistory.find(item => item.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.browsedAt = new Date(); // Update the timestamp
        } else {
            user.browsingHistory.push({
                productId,
                browsedAt: new Date()
            });
        }

        await user.save();
        res.json({ message: 'Product added to browser history' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

module.exports = router;
