const mongoose = require('mongoose');
const Candidate = require('./Candidate');

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

userSchema.post('save', async function (doc, next) {
    try {
        const existingCandidate = await Candidate.findOne({ userId: doc._id });
        if (!existingCandidate) {
            await Candidate.create({
                userId: doc._id,
                fullName: '',
                phone: '',
                address: '',
                skills: [],
                experience: '',
                education: '',
                cvs: [],
            });
            console.log(`Candidate created for userId: ${doc._id}`);
        }
        next();
    } catch (error) {
        console.error('Error creating candidate:', error.message);
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
