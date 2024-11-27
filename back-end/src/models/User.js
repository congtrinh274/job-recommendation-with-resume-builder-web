const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, unique: true },
        username: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ['candidate', 'recruiter', 'admin'], required: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
