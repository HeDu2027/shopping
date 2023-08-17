const express = require('express');
const router = express.Router();

// This route is just an example. You can add more routes or logic as needed.
router.post('/start', (req, res) => {
    // Your logic here
    res.send('Started screen sharing');
});

// Add this to your backend code where you've defined other routes
router.get('/api/getPeerId', (req, res) => {
    // Replace with your logic to get the peer ID
    const peerId = "staticPeerId12345";
    res.json({ peerId });
});

module.exports = router;
