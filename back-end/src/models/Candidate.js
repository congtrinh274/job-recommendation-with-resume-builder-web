const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        skills: [{ type: String }],
        experience: { type: String },
        education: { type: String },
        uploadedCV: { type: String },
        generatedCV: { type: String },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
