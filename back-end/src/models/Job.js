const jobSchema = new mongoose.Schema(
    {
        recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
        title: { type: String, required: true },
        description: { type: String },
        requirements: [{ type: String }],
        skills: [{ type: String }],
        location: { type: String },
        salary: { type: String },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const Job = mongoose.model('Job', jobSchema);

module.exports = { Job };
