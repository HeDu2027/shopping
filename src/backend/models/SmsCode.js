const mongoose = require('mongoose');

const smsCodeSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, required: true, expires: '10m' },
});

const SmsCode = mongoose.model('SmsCode', smsCodeSchema);

module.exports = SmsCode;
