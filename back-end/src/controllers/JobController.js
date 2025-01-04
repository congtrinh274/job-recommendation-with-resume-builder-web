require('dotenv').config();

const Job = require('../models/Job');
const Recruiter = require('../models/Recruiter');
const CategoryJob = require('../models/CategoryJob');
const User = require('../models/User');
const Candidate = require('../models/Candidate');

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

    // [GET] jobs/get-one/:jobId
    getJobById = async (req, res) => {
        const { jobId } = req.params;
        try {
            const job = await Job.findById(jobId)
                .populate('recruiterId')
                .populate('categoryId')
                .populate('appliedList');
            res.status(200).json(job);
        } catch (error) {
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
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    // [POST] jobs/change-application-state/:jobId
    changeAcceptingApplicationState = async (req, res) => {
        const userId = req.user?._id;
        const { state } = req.body;
        const { jobId } = req.params;

        console.log(state);
        try {
            const recruiter = await Recruiter.findOne({ userId: userId }).populate('userId').populate('postedJobs');
            if (!recruiter) {
                return res.status(404).json({ message: 'Recruiter not found!' });
            }

            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found.' });
            }

            job.isCanceled = state;
            job.save();

            res.status(200).json(recruiter);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    // POST jobs/apply/:jobId
    getApplication = async (req, res) => {
        const userId = req.user?._id;
        const { jobId } = req.params;
        const { cvId, appliedLetter, fullName, email, phone } = req.body;
        try {
            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found!' });
            }
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found.' });
            }

            const alreadyApplied = job.appliedList.some((application) => application.cvId.toString() === cvId);
            if (alreadyApplied) {
                return res.status(400).json({ message: 'Bạn đã ứng tuyển công việc này trước đó!' });
            }

            job.appliedList.push({
                cvId,
                appliedLetter,
                fullName,
                email,
                phone,
            });

            await job.save();
            return res.status(200).json(job);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    };
}

module.exports = new JobController();
