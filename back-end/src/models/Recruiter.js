const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String },
        email: { type: String, required: true },
        imgUrl: { type: String },
        validateEmail: { type: Boolean, default: false },
        verificationCode: { type: String },
        verificationExpires: { type: Date },
        taxCode: { type: String },
        companyName: { type: String },
        businessLicense: { type: String },
        province: { type: String },
        district: { type: String },
        companyAddress: { type: String },
        webLink: { type: String },
        postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
        level: { type: Number },
        notifications: [
            {
                title: { type: String, required: true },
                message: { type: String, required: true },
                type: { type: String, enum: ['RESUME_APPROVAL', 'POST_APPROVAL', 'APPLICATION'], required: true },
                createdAt: { type: Date, default: Date.now },
                read: { type: Boolean, default: false },
            },
        ],
        validatedState: { type: String, enum: ['FALSE', 'TRUE', 'CANCELED'], default: 'FALSE' },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
