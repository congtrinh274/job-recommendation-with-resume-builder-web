const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        cvs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CV' }],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
