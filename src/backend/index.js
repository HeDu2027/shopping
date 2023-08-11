require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const emailVerifyRoutes = require('./routes/emailVerify');
const addressRoutes = require('./routes/address');
const express = require('express');
const app = express();
const cors = require('cors');
const cardRoutes = require('./routes/card');
const paypalRoutes=require('./routes/paypal')
const googleRoutes=require('./routes/google')
// 连接到数据库
connectDB();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// 使用路由
app.use(cors());
app.use('/routes/auth', authRoutes);
app.use('/routes/emailverify', emailVerifyRoutes);
app.use('/address', addressRoutes);
app.use('/card', cardRoutes);
app.use('/routes/paypal',paypalRoutes);
app.use('/routes/google',googleRoutes);

app.listen(4000, () => console.log('Server listening on port 4000'));
