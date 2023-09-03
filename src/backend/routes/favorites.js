const express = require('express');
const router = express.Router();
///const User = require('../models/user');
const authenticate = require('../middleware/authMiddleware');

const Favorite = require('../models/Favorite'); // Import the Favorite model
const User = require('../models/user');
const Product = require("../models/Product");
router.post('/user/:userId/favorite/:productId', authenticate, async (req, res) => {
    console.log("Inside the favorite route");
    console.log(req.body);
    const { userId, productId } = req.params;

    // Check if required fields are present in the request body
    if (!req.body.productName || !req.body.productPrice || !req.body.productStock) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        console.log("Trying to find existing favorite");
        const existingFavorite = await Favorite.findOne({ userId, productId });
        if (existingFavorite) {
            console.log("Product already favorited");
            return res.status(400).send({ message: 'Product already favorited' });
        }

        console.log("Creating new favorite");

        const newFavorite = new Favorite({
            userId,
            productId,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productStock: req.body.productStock,
            favoritedAt: new Date(),
        });

        console.log("Saving new favorite");
        await newFavorite.save();
        console.log("Product added to favorites");
        res.send({ message: 'Product added to favorites' });
    } catch (error) {
        console.error("Error in favorite route:", error);
        res.status(500).send({ message: 'Server error', error });
    }
});

router.delete('/user/:userId/favorite/:productId', authenticate, async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const favorite = await Favorite.findOneAndDelete({ userId, productId });
        if (!favorite) {
            return res.status(404).send({ message: 'Favorite not found' });
        }
        res.send({ message: 'Product removed from favorites' });
    } catch (error) {
        console.error("Error in remove favorite route:", error);
        res.status(500).send({ message: 'Server error', error });
    }
});




router.get('/user/:userId/favorites', authenticate, async (req, res) => {
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

