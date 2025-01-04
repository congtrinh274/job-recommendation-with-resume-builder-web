const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryJob' },
        title: { type: String, required: true },
        level: { type: String },
        description: { type: String },
        requirements: { type: String },
        skills: { type: String },
        location: { type: String },
        salary: { type: String },
        expiredDate: { type: Date },
        approvedState: { type: String, enum: ['PENDING', 'APPROVED', 'CANCELED'], default: 'PENDING' },
        isCanceled: { type: Boolean, default: false },
        appliedList: [
            {
                cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV' },
                appliedLetter: { type: String },
                fullName: { type: String },
                email: { type: String },
                phone: { type: String },
                isApplied: { type: String, enum: ['PENDING', 'APPLIED', 'CANCELED'], default: 'PENDING' },
            },
        ],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
