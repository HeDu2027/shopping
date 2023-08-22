const express = require('express');
const router = express.Router();
const { translateText } = require('../middleware/translation');

router.post('/translate', translateText);

module.exports = router;

