const express = require('express');
const router = express.Router();

router.get('/get-peer-id', (req, res) => {
    // Replace with your logic to get the peer ID
    const peerId = "123";
    res.json({ peerId });
});

router.get('/peerjs', (req, res) => {
    res.send('PeerJS route');
});

// ... 其他路由 ...

module.exports = router;
