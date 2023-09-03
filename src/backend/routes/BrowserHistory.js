const express = require('express');
const {findById} = require("../models/user");
const router = express.Router();
router.post('/:userId/add-to-history', async (req, res) => {
    console.log("Received request to add to browsing history for user ID:", req.params.userId, "with product ID:", req.body.productId);

    try {
        const user = await findById(req.params.userId);
        console.log("Successfully updated browsing history for user ID:", req.params.userId);

        if (!user) return res.status(404).send("User not found");

        const { productId } = req.body;
        const existingProductIndex = user.browsingHistory.findIndex(p => p.productId.toString() === productId);

        if (existingProductIndex !== -1) {
            // Update the browsedAt time for the existing product
            user.browsingHistory[existingProductIndex].browsedAt = Date.now();
        } else {
            // Add a new entry to the browsingHistory
            user.browsingHistory.push({ productId, browsedAt: Date.now() });
        }

        await user.save();
        res.status(200).send("Updated browsing history");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// Fetch user's browsing history
router.get('/:userId/browser-history', async (req, res) => {
    console.log("Fetching browsing history for user ID:", req.params.userId);
    try {
        const user = await findById(req.params.userId).populate('browsingHistory.productId');
        if (!user) return res.status(404).send("User not found");

        res.status(200).json({ browsingHistory: user.browsingHistory });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;
