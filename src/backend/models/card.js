const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: String,
    securityCode: String,
    cardHolderName: String,
    isRemembered: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Card', cardSchema);
