const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Endpoint to get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
