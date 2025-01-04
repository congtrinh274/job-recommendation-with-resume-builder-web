require('dotenv').config();

const Job = require('../models/Job');
const Recruiter = require('../models/Recruiter');
const CategoryJob = require('../models/CategoryJob');
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const CV = require('../models/CV');

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
            const job = await Job.findById(jobId).populate('recruiterId').populate('categoryId').populate({
                path: 'appliedList.cvId',
                model: 'CV',
            });
            res.status(200).json(job);
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
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    // [POST] jobs/change-application-state/:jobId
    changeAcceptingApplicationState = async (req, res) => {
        const userId = req.user?._id;
        const { state } = req.body;
        const { jobId } = req.params;

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

            const recruiter = await Recruiter.findById(job.recruiterId);

            await job.save();

            const notificationMessage = `Ứng viên ${fullName} đã gửi hồ sơ ứng tuyển tới tin tuyển dụng với ID ${job._id}!`;

            recruiter.notifications.unshift({
                title: 'Ứng tuyển mới',
                message: notificationMessage,
                type: 'APPLICATION',
            });
            recruiter.save();

            if (global.io) {
                const notificationItem = recruiter.notifications[0];
                global.io.to(recruiter.userId.toString()).emit('notification', {
                    notificationItem,
                    recruiterId: job.recruiterId,
                });
            }

            return res.status(200).json(job);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    };

    // [POST] jobs/update-application-state
    updateApplicationState = async (req, res) => {
        const userId = req.user?._id;
        const { jobId, cvId, newStatus, responseLetter } = req.body;
        try {
            const recruiter = await Recruiter.findOne({ userId: userId }).populate('userId').populate('postedJobs');
            if (!recruiter) {
                return res.status(403).json({ message: 'You do not have permission to perform this action.' });
            }

            const cv = await CV.findById(cvId).populate('candidateId');
            if (!cv || !cv.candidateId) {
                return res.status(404).json({ message: 'Không tìm thấy CV hoặc ứng viên liên quan!' });
            }
            const candidate = cv.candidateId;

            const job = await Job.findOneAndUpdate(
                { _id: jobId, 'appliedList.cvId': cvId },
                { $set: { 'appliedList.$.isApplied': newStatus } },
                { new: true },
            );

            if (!job) {
                return res.status(404).json({ error: 'Job or application not found' });
            }

            const notificationMessage =
                newStatus === 'APPLIED'
                    ? `Chúc mừng bạn đã ứng tuyển thành công vị trí ${job.title}!`
                    : `Rất tiếc! Hồ sơ ứng tuyển vào vị trí ${job.title} chưa phù hợp!`;

            candidate.notifications.unshift({
                title: 'Thông báo tuyển dụng!',
                message: notificationMessage,
                responseLetter: newStatus === 'APPLIED' ? responseLetter : undefined,
                type: newStatus === 'APPLIED' ? 'SUCCESS' : 'FAILURE',
            });

            await candidate.save().catch((err) => {
                console.error('Failed to save candidate notification:', err);
                return res.status(500).json({ error: 'Failed to save candidate notification.' });
            });

            if (global.io) {
                const notificationItem = candidate.notifications[0];
                global.io.to(candidate.userId.toString()).emit('notification', {
                    notificationItem,
                    candidateId: candidate._id,
                });
            }

            res.status(200).json(job);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new JobController();
