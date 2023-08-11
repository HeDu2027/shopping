const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZrPAau1_CGnwlSAqsEDAPHY-Cs-PlaF6i7Fc2907CSZJSYWPxPEAkU2vS_oJOHeQPaHs8rCLNpl-PwL',
    'client_secret': 'EH63jDZL03T-28-lweAC7LCEXZZ9LvTi0PiA8VgNRQf9tRHp-P6arXkQ1UZQCwv9btdQoqdzEkVDnUPT'
});

router.post('/pay', (req, res) => {
    const payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "amount": {
                "total": "0.01",
                "currency": "USD"
            },
            "description": "Your transaction description"
        }]
    };

    paypal.payment.create(payment, function (error, payment) {
        if (error) {
            console.error(error);
        } else {
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

module.exports = router;
