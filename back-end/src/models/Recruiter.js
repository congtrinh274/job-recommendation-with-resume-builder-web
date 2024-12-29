const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String },
        email: { type: String, required: true },
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
        notification: { type: String },
        validatedState: { type: String, enum: ['FALSE', 'TRUE', 'CANCELED'], default: 'FALSE' },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
