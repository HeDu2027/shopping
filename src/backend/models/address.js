// models/Address.js

const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
    },
    country: String,
    firstName: String,
    lastName: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String,
    countryCode: String,
    phoneNumber: String
});

module.exports = mongoose.model('Address', AddressSchema);
