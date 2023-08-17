const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const  User  = require('../models/user');

router.post('/send-email', (req, res) => {
    console.log(process.env.GMAIL_APP_PASSWORD);
    // 假设你的邮件服务器设置在这里
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xixiqingcheng@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    let code = Math.floor(Math.random() * 900000) + 100000; // 生成随机验证码
    let mailOptions = {
        from: 'xixiqingcheng@gmail.com',
        to: req.body.email,
        subject: 'Your Verification Code',
        text: `Your verification code is ${code}`,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);

            // 先查找用户
            User.findOne({ email: req.body.email }, (err, user) => {
                if(err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error finding user' });
                }
                if(user) {
                    // 如果用户存在，更新验证码
                    user.verificationCode = code.toString();
                    user.save(err => {
                        if(err) {
                            console.error(err);
                            return res.status(500).json({ message: 'Error updating code' });
                        }
                        console.log('User saved successfully');
                        return res.status(200).json({ message: 'Code updated' });
                    });
                } else {
                    // 如果用户不存在，创建新用户
                    let newUser = new User({
                        userId: uuidv4(),
                        email: req.body.email,
                        verificationCode: code.toString(),
                    });
                    newUser.save(err => {
                        if (err) return res.status(500).send({ message: err });
                        return res.status(200).send({ message: 'Email and code saved' });
                    });
                }
            });
        }
    });
});

router.post('/confirm-email', (req, res) => {
    console.log("Received verification code from frontend:", req.body.verificationCode);

    // 首先只根据email查询用户
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.error("No user found with email:", req.body.email);
                return res.status(400).json({ message: 'Invalid email' });
            }

            console.log("Stored verification code in database:", user.verificationCode);

            // 检查验证码是否匹配
            if (user.verificationCode !== req.body.verificationCode) {
                console.error("Verification codes do not match!");
                return res.status(400).json({ message: 'Invalid code' });
            }

            // 验证码匹配，删除验证码
            user.verificationCode = null; // 验证完成后清除验证码
            user.save()
                .then(() => {
                    return res.status(200).json({ message: 'Email confirmed' });
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ message: 'Error updating user' });
                });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred' });
        });
});

module.exports = router;

