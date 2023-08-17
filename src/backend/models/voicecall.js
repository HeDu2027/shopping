const mongoose = require('mongoose');

const VoiceCallSchema = new mongoose.Schema({
    // 根据您的需求定义模型字段，例如：
    caller: String,
    receiver: String,
    startTime: Date,
    endTime: Date,
    // ... 其他字段
});

module.exports = mongoose.model('VoiceCall', VoiceCallSchema);
