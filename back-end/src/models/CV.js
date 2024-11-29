const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema(
    {
        candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
        title: { type: String, required: true },
        uploadedCV: { type: String },
        isPrimary: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const CV = mongoose.model('CV', CVSchema);

module.exports = CV;
