require('dotenv').config();

const Job = require('../models/Job');
const Recruiter = require('../models/Recruiter');
const CategoryJob = require('../models/CategoryJob');

class JobController {
    // [GET] jobs/
    getJobs = async (req, res) => {
        try {
            const jobs = await Job.find().populate('recruiterId').populate('categoryId');
            res.status(200).json(jobs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // POST /jobs/create
    createJob = async (req, res) => {
        try {
            const userId = req.user?._id;
            const {
                category,
                title,
                level,
                description,
                requirements,
                skills,
                location,
                salary,
                expiredDate,
                newCategory,
            } = req.body;

            const recruiter = await Recruiter.findOne({ userId: userId });
            if (!recruiter) {
                return res.status(404).json({ message: 'Recruiter not found!' });
            }

            let categoryId;

            if (category) {
                const existingCategory = await CategoryJob.findById(category);
                if (!existingCategory) {
                    return res.status(400).json({ message: 'Category not found!' });
                }
                categoryId = existingCategory._id;
            } else if (newCategory) {
                const newCategoryObj = new CategoryJob({ title: newCategory });
                const savedCategory = await newCategoryObj.save();
                categoryId = savedCategory._id;
            } else {
                return res.status(400).json({ message: 'Category or newCategory is required!' });
            }

            const newJob = new Job({
                recruiterId: recruiter._id,
                categoryId: categoryId,
                title,
                level,
                description,
                requirements,
                skills,
                location,
                salary,
                expiredDate,
            });

            const savedJob = await newJob.save();

            recruiter.postedJobs.push(savedJob._id);
            await recruiter.save();

            return res.status(201).json({
                message: 'Job created successfully!',
                data: savedJob,
            });
        } catch (error) {
            console.error('Error creating job:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    };
}

module.exports = new JobController();
