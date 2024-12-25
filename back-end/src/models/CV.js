const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
    {
        candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
        title: { type: String, required: true, unique: true },
        firstName: { type: String },
        lastName: { type: String },
        jobTitle: { type: String },
        address: { type: String },
        phone: { type: String },
        email: { type: String },
        themeColor: { type: String },
        language: { type: String, default: 'vi' },
        summery: { type: String },
        experience: [
            {
                title: { type: String },
                companyName: { type: String },
                city: { type: String },
                state: { type: String },
                startDate: { type: String },
                endDate: { type: String, default: '' },
                currentlyWorking: { type: Boolean, default: false },
                workSummery: { type: String },
            },
        ],
        education: [
            {
                universityName: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                degree: { type: String },
                major: { type: String },
                description: { type: String },
            },
        ],
        skills: [
            {
                name: { type: String },
                rating: { type: Number },
            },
        ],
        uploadedCV: { type: String },
        isPrimary: { type: Boolean, default: false },
        isOwn: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const CV = mongoose.model('CV', cvSchema);

module.exports = CV;
