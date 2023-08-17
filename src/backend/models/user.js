const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
    verificationCode: { type: Number, unique: true }
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});
const User = mongoose.model('User', userSchema);

module.exports = User;
