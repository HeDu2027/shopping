const express = require('express');
const router = express.Router();
const { getLocationFromCoordinates } = require('../middleware/place');

router.post('/getLocation', getLocationFromCoordinates);

module.exports = router;
