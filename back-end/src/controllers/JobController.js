require('dotenv').config();

const Job = require('../models/Job');

class JobController {
    // [GET] api/jobs/
    getJobs = async (req, res) => {
        try {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [GET] api/jobs/get-recommendations
}

module.exports = new JobController();
