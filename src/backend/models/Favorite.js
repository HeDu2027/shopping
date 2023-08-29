const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: String
    },
    favoritedAt: Date
});
module.exports = mongoose.model('Favorite', FavoriteSchema);

