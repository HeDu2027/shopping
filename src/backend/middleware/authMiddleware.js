const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

const authenticate = async (req, res, next) => {
    console.log("Authentication middleware triggered with headers:", req.headers);

    // Check if the Authorization header exists
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authentication failed: Authorization header missing' });
    }

    // Split the header and check its format
    const parts = req.headers.authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Authentication failed: Invalid Authorization header format' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, secretKey); // Use the secret key from environment variable

        // Fetch the user from the MongoDB database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Check if the error is specifically a TokenExpiredError
        if (error instanceof jwt.TokenExpiredError) {
            console.error("Authentication middleware error: Token has expired");
            return res.status(401).json({ message: 'Authentication failed: Token has expired' });
        }

        console.error("Authentication middleware error:", error.name); // Log only the error name
        res.status(500).json({ message: 'Authentication error', error: error.name });
    }

};

module.exports = authenticate;
