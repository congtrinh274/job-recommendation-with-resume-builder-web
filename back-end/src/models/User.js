const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        authId: { type: String, unique: true },
        email: { type: String, required: true, unique: true },
        username: { type: String },
        password: { type: String },
        typeLogin: { type: String },
        loginToken: { type: String },
        imgUrl: { type: String },
        role: { type: String, enum: ['CANDIDATE', 'RECRUITER', 'ADMIN'], required: true, default: 'CANDIDATE' },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
