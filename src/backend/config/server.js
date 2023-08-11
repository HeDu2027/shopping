require('dotenv').config();
console.log(process.cwd());  // 打印出当前工作目录
const express = require('express');
const app = express(); // Initialize Express
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const twilio = require('twilio');
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const path = require('path');
const emailVerify = require(path.join(__dirname, './routes/emailverify.js'));
app.use('/emailverify',emailVerify);
// server.js and emailverify.js
const { User } = require('../models.js');


const { SmsCode } = require('../models/SmsCode'); //你需要创建一个新的SmsCode模型来保存验证码和电话号码

const accountSid = 'AC44e133c4865f10f993b4e83f2ea52766';
const authToken = 'a3c2f0b08dcf972106ebd2a31c002337';
const client = new twilio(accountSid, authToken);


let users = {};

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); // 连接错误
db.once('open', function() {
    console.log('Successfully connected to MongoDB.'); // 连接成功
});

app.listen(4000, () => console.log('Server listening on port 4000'));
