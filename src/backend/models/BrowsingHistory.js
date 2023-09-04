const mongoose = require('mongoose');

const browsingHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: {
            type: String,  // Adjusted to accept UUID string
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const BrowsingHistory = mongoose.model('BrowsingHistory', browsingHistorySchema);

module.exports = BrowsingHistory;
