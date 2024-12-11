const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String },
        phone: { type: String },
        address: { type: String },
        skills: [{ type: String }],
        experience: { type: String },
        education: { type: String },
        cvs: [
            {
                title: { type: String, required: true, unique: true },
                content: { type: Object },
                uploadedCV: { type: String, required: true },
                isPrimary: { type: Boolean, default: false },
                isOwn: { type: Boolean, default: false },
            },
        ],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
