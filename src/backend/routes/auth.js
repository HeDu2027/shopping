const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const twilio = require('twilio');
const User = require('../models/user');
const  SmsCode  = require('../models/SmsCode');
const jwt = require('jsonwebtoken');
const accountSid = 'AC44e133c4865f10f993b4e83f2ea52766';
const authToken = 'a3c2f0b08dcf972106ebd2a31c002337';
const client = new twilio(accountSid, authToken);

router.post('/api/signup', async (req, res) => {
    const {
        email,
        username,
        password,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        profileImage,
        address,
        alternateEmail,
        alternatePhone,
        language,
        currency,
        theme,
        notifications,
        socialAccounts,
        securityQuestions
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
        //password,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        profileImage,
        address,
        alternateEmail,
        alternatePhone,
        language,
        currency,
        theme,
        notifications,
        socialAccounts,
        securityQuestions
    });


    newUser.save()
        .then((user) => {
            console.log('Registered user:', user);
            res.json({ message: 'Registration successful' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error registering new user' });
        });
});

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(`Login attempt: username = ${username}, password = ${password}`);

    // Fetch the user from the MongoDB database
    const user = await User.findOne({ username: username });

    if (!user) {
        console.log(`User ${username} not found in database.`);
        return res.status(400).json({ message: 'Invalid username' });
    }

    console.log(`User found in database: username = ${user.username}, password = ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Password does not match the one in the database.');
        return res.status(400).json({ message: 'Invalid password' });
    }

    console.log(`Login successful for user: ${username}`);

    // Generate JWT
    const payload = {
        userId: user._id,
        username: user.username
        // ... any other data you want to include
    };

    const secretKey = process.env.JWT_SECRET_KEY; // Assuming you're using dotenv
    const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });

    // Return the user's ID, JWT, and other necessary data upon successful login
    res.json({
        message: 'Login successful',
        token: token,
        user: {
            _id: user._id,
            username: user.username
            // You can add other user data you want to return here
        }
    });
});



router.post('/api/send-sms', (req, res) => {
    const phone = req.body.phone;
    function generateRandomCode(length = 6) {
        let code = '';
        for (let i = 0; i < length; i++) {
            code += Math.floor(Math.random() * 10).toString(); // 生成0-9之间的随机数
        }
        return code;
    }

    const code = generateRandomCode(); // 这将生成一个随机的6位验证码

    // 使用Twilio API发送短信
    client.messages.create({
        body: `Your verification code is ${code}`,
        from: '+12184293326', // 这里应该是你在Twilio注册的电话号码
        to: phone
    })
        .then(message => {
            console.log(`SMS sent to ${phone} with message SID ${message.sid}`);

            // 把验证码和电话号码保存到数据库
            const smsCode = new SmsCode({
                phone,
                code,
                createdAt: new Date()
            });
            smsCode.save()
                .then(() => {
                    console.log('SMS code saved in database');
                    res.json({ message: 'SMS sent' });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: 'Error saving SMS code in database' });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error sending SMS' });
        });
});


// 使用短信验证码登录API
router.post('/api/login-by-sms', async (req, res) => {
    const { phone, code } = req.body;

    const smsCode = await SmsCode.findOne({ phone, code });
    if (!smsCode) {
        return res.status(400).json({ message: 'Invalid SMS code' });
    }

    // 检查验证码是否在10分钟内
    const now = new Date();
    const diff = Math.abs(now.getTime() - smsCode.createdAt.getTime());
    const minutes = Math.floor((diff/1000)/60);
    if (minutes > 10) {
        return res.status(400).json({ message: 'SMS code expired' });
    }

    // 找到或创建用户
    let user = await User.findOne({ phone });
    if (!user) {
        user = new User({ phone });
        await user.save();
    }

    res.json({ message: 'Login successful', user });
});

router.post('/api/verify-sms-code', async (req, res) => {
    const { phone, code } = req.body;

    const smsCode = await SmsCode.findOne({ phone, code });
    if (!smsCode) {
        return res.status(400).json({ message: 'Invalid SMS code' });
    }

    // 检查验证码是否在10分钟内
    const now = new Date();
    const diff = Math.abs(now.getTime() - smsCode.createdAt.getTime());
    const minutes = Math.floor((diff/1000)/60);
    if (minutes > 10) {
        return res.status(400).json({ message: 'SMS code expired' });
    }

    // 找到或创建用户
    let user = await User.findOne({ phone });
    if (!user) {
        user = new User({ phone });
        await user.save();
    }

    res.json({ message: 'Verification successful', user });
});

module.exports = router;
