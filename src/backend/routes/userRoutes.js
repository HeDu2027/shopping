const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Product = require('../models/Product');

// Fetch detailed favorite products for a user
router.get('/user/:userId/favorites', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch the favorite product IDs for the user
        const favorites = await Favorite.find({ userId: userId });

        // Log the fetched favorites for the user
        console.log("Found favorites for user:", favorites);

        // Extract product IDs from the favorites
        const productIds = favorites.map(fav => fav.productId);

        // Fetch the details of each favorite product
        const products = await Product.find({ _id: { $in: productIds } });

        // Log the fetched favorite products
        console.log("Found favorite products:", products);

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorite products' });
    }
});

module.exports = router;
