require('dotenv').config();

const Job = require('../models/Job');
const Recruiter = require('../models/Recruiter');
const CategoryJob = require('../models/CategoryJob');
const User = require('../models/User');

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

    // [POST] jobs/approved/:jobId
    jobApproved = async (req, res) => {
        const userId = req.user?._id;
        const { recruiterId, approvedState, cancelReason } = req.body;
        const { jobId } = req.params;

        try {
            const user = await User.findOne({ _id: userId });
            if (!user || user.role !== 'ADMIN') {
                return res.status(403).json({ message: 'Not permission' });
            }

            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found.' });
            }

            job.approvedState = approvedState;
            job.save();

            const recruiter = await Recruiter.findOne({ _id: recruiterId });
            if (!recruiter) {
                return res.status(404).json({ message: 'Recruiter not found!' });
            }

            const notificationMessage =
                approvedState === 'APPROVED'
                    ? `Tin tuyển dụng với ID ${job._id} đã được duyệt!`
                    : `Tin tuyển dụng với ID ${job._id} đã bị hủy vì ${cancelReason}`;

            recruiter.notifications.unshift({
                title: 'Trạng thái tin tuyển dụng',
                message: notificationMessage,
                type: 'POST_APPROVAL',
            });
            recruiter.save();

            if (global.io) {
                const notificationItem = recruiter.notifications[0];
                global.io.to(recruiter.userId.toString()).emit('notification', {
                    notificationItem,
                    recruiterId: recruiterId,
                });
            }

            const jobs = await Job.find().populate('recruiterId').populate('categoryId');
            return res.status(200).json({ message: 'Updated successfully!', data: jobs });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}

module.exports = new JobController();
