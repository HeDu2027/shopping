const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: String,  // Use _id instead of id for UUID
    name: String,
    price: Number,
    stock: Number,
    mainImage: String,
    images: [String],
    rating: {
        average: { type: Number, default: 0 },
        totalRatings: { type: Number, default: 0 },
        sumOfRatings: { type: Number, default: 0 }
    },
    category: {
        type: String,
        enum: ['drink', 'clothing', 'food', 'cosmetics', 'electronics'] // Add or remove categories as needed
    }
});

module.exports = mongoose.model('Product', ProductSchema);
