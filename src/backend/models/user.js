const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // Personal Information
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    profileImage: { type: String },

    // Contact Information
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    alternateEmail: { type: String },
    alternatePhone: { type: String },

    // Account Information
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    email: { type: String, unique: false, required: true },
    verificationCode: { type: Number, unique: true, sparse: true },
    accountStatus: { type: String, enum: ['Active', 'Suspended', 'Deactivated'] },
    roles: [{ type: String }],
    lastLogin: { type: Date },
    joinedDate: { type: Date, default: Date.now },
    // Preferences and Settings
    language: { type: String },
    currency: { type: String },
    theme: { type: String, enum: ['Light', 'Dark'] },
    notifications: {
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: false },
        pushNotifications: { type: Boolean, default: true }
    },

    // Social Media and External Accounts
    socialAccounts: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String }
    },

    // Security
    securityQuestions: [
        {
            question: { type: String },
            answer: { type: String }
        }
    ],
    twoFactorAuthentication: { type: Boolean, default: false },
    twoFactorMethod: { type: String, enum: ['SMS', 'AuthenticatorApp'] },

    // Miscellaneous
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    subscriptions: [{ type: String }],
    loyaltyPoints: { type: Number, default: 0 },

    // Ratings
    ratings: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            rating: { type: Number, min: 1, max: 5 },
            comment: String,
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }
        }
    ],
    // Favorites
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

    // Purchase History
    purchaseHistory: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            purchasedAt: { type: Date, default: Date.now },
            quantity: Number
        }
    ],


    // Followed Shops
    followedShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;

