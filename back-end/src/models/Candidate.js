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
        applicationHistory: [
            {
                jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
                cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
                state: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILURE'] },
            },
        ],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
