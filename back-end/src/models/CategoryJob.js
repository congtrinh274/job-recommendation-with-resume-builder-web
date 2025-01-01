const mongoose = require('mongoose');

const CategoryJobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const CategoryJob = mongoose.model('CategoryJob', CategoryJobSchema);

module.exports = CategoryJob;
