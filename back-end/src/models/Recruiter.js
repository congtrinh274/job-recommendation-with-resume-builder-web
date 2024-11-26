const recruiterSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        companyName: { type: String, required: true },
        companyAddress: { type: String },
        companyWebsite: { type: String },
        postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = { Recruiter };
