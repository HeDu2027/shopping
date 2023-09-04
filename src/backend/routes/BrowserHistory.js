const express = require('express');
const BrowsingHistory = require("../models/browsingHistory");
const router = express.Router();

router.post('/:userId/add-to-history', async (req, res) => {
    console.log("Received request to add to browsing history for user ID:", req.params.userId, "with product ID:", req.body.productId);

    try {
        let history = await BrowsingHistory.findOne({ userId: req.params.userId });
        if (!history) {
            history = new BrowsingHistory({ userId: req.params.userId });
        }

        const { productId } = req.body;
        const existingProductIndex = history.products.findIndex(p => p.productId.toString() === productId);

        if (existingProductIndex !== -1) {
            // Update the timestamp for the existing product
            history.products[existingProductIndex].timestamp = Date.now();
        } else {
            // Add a new entry to the browsingHistory
            history.products.push({ productId, timestamp: Date.now() });
        }

        await history.save();
        res.status(200).send("Updated browsing history");
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send(`Server error: ${error.message}`);
    }
});

// Fetch user's browsing history
router.get('/:userId/browser-history', async (req, res) => {
    console.log("Fetching browsing history for user ID:", req.params.userId);
    try {
        const history = await BrowsingHistory.findOne({ userId: req.params.userId });
        if (!history) return res.status(404).send("Browsing history not found");

        // Return only the productIds and their associated timestamps
        res.status(200).json({ browsingHistory: history.products });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send(`Server error: ${error.message}`);
    }
});

module.exports = router;
