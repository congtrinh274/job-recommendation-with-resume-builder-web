const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        cvs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CV' }],
        notifications: [
            {
                title: { type: String, required: true },
                message: { type: String, required: true },
                responseLetter: { type: String },
                type: { type: String, enum: ['SUCCESS', 'FAILURE'] },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
