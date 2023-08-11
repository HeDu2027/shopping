const express = require('express');
const router = express.Router();


router.get('/api/wechatpay', (req, res) => {
    // 与微信支付API交互，获取prepay_id
    // 返回支付参数给前端
    res.json({
        appId: 'YOUR_APP_ID',
        timeStamp: 'YOUR_TIMESTAMP',
        nonceStr: 'YOUR_NONCE_STR',
        prepay_id: 'YOUR_PREPAY_ID',
        paySign: 'YOUR_PAY_SIGN'
    });
});


module.exports = router;
