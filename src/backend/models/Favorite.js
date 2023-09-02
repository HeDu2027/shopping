const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: String
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    favoritedAt: Date
});
module.exports = mongoose.model('Favorite', FavoriteSchema);

