const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/process-google-pay', async (req, res) => {
    const paymentData = req.body.paymentData;

    try {
        const charge = await stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            source: paymentData.paymentMethodToken.token,
            description: 'Google Pay charge'
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports=router;
