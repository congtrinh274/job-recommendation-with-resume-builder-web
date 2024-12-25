require('dotenv').config();

const Candidate = require('../models/Candidate');
const CV = require('../models/CV');

class CVController {
    // [GET] cvs/get-cv/:cvId
    getCVById = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { cvId } = req.params;

            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const isCVLinkedToCandidate = candidate.cvs.includes(cvId);
            if (!isCVLinkedToCandidate) {
                return res.status(404).json({ message: 'CV not associated with this candidate' });
            }

            const cv = await CV.findById(cvId);
            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }

            res.status(200).json({
                message: 'CV retrieved successfully',
                data: cv,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving CV', error: error.message });
        }
    };

    // [POST] cvs/add-cv
    addCandidateCV = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { title, isPrimary, isOwn } = req.body;
            const file = req.file;

            const candidate = await Candidate.findOne({ userId: userId }).populate('cvs');
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const titleExists = candidate.cvs.some((cv) => cv.title === title);
            if (titleExists) {
                return res.status(400).json({ message: 'Tên hồ sơ đã tồn tại, vui lòng chọn tên khác!' });
            }

            const newCV = new CV({
                title: title || (file ? file.originalname : 'Untitled'),
                uploadedCV: file ? `/uploads/${file.filename}` : null,
                isPrimary: isPrimary || false,
                isOwn: isOwn || false,
            });

            if (newCV.isPrimary) {
                await CV.updateMany({ _id: { $in: candidate.cvs } }, { $set: { isPrimary: false } });
            }

            await newCV.save();

            candidate.cvs.push(newCV._id);
            await candidate.save();

            res.status(201).json({
                message: 'CV added successfully',
                data: newCV,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error adding CV', error: error.message });
        }
    };

    // [PUT] candidates/upload-cv
    uploadCandidateCV = async (req, res) => {
        try {
            const userId = req.user?._id;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No file provided or invalid file type.' });
            }

            const { title, isPrimary, isOwn } = req.body;

            const candidate = await Candidate.findOne({ userId: userId }).populate('cvs');
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const titleExists = candidate.cvs.some((cv) => cv.title === title);
            if (titleExists) {
                return res.status(400).json({ message: 'Tên hồ sơ đã tồn tại, vui lòng chọn tên khác!' });
            }

            const newCV = new CV({
                title: title || file.originalname,
                uploadedCV: `/uploads/${file.filename}`,
                isPrimary: isPrimary || false,
                isOwn: isOwn || false,
            });

            if (newCV.isPrimary) {
                candidate.cvs.forEach((cv) => (cv.isPrimary = false));
            }

            await newCV.save();

            candidate.cvs.push(newCV._id);
            await candidate.save();

            res.status(200).json({
                message: 'CV uploaded successfully',
                data: newCV,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error uploading CV', error: error.message });
        }
    };

    // [PUT] candidates/update-cv/:id
    updateCandidateCV = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { cvId } = req.params;
            const updateData = req.body;

            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const cv = await CV.findById(cvId);
            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }

            if (updateData.title) {
                const titleExists = await CV.findOne({ title: updateData.title, _id: { $ne: cvId } });
                if (titleExists) {
                    return res.status(400).json({ message: 'Tên hồ sơ đã tồn tại. Vui lòng nhập tên khác!' });
                }
            }

            if (updateData.skills) {
                if (typeof updateData.skills === 'string') {
                    try {
                        updateData.skills = JSON.parse(updateData.skills);
                    } catch (err) {
                        return res.status(400).json({ message: 'Invalid skills format' });
                    }
                }

                if (Array.isArray(updateData.skills) && updateData.skills.every((item) => typeof item === 'object')) {
                    cv.skills = updateData.skills;
                } else {
                    return res.status(400).json({ message: 'Skills must be an array of objects' });
                }
            }

            if (updateData.experience) {
                if (typeof updateData.experience === 'string') {
                    try {
                        updateData.experience = JSON.parse(updateData.experience);
                    } catch (err) {
                        return res.status(400).json({ message: 'Invalid experience format' });
                    }
                }

                if (
                    Array.isArray(updateData.experience) &&
                    updateData.experience.every((item) => typeof item === 'object')
                ) {
                    cv.experience = updateData.experience;
                } else {
                    return res.status(400).json({ message: 'Experience must be an array of objects' });
                }
            }

            if (updateData.education) {
                if (typeof updateData.education === 'string') {
                    try {
                        updateData.education = JSON.parse(updateData.education);
                    } catch (err) {
                        return res.status(400).json({ message: 'Invalid education format' });
                    }
                }

                if (
                    Array.isArray(updateData.education) &&
                    updateData.education.every((item) => typeof item === 'object')
                ) {
                    cv.education = updateData.education;
                } else {
                    return res.status(400).json({ message: 'Education must be an array of objects' });
                }
            }

            Object.keys(updateData).forEach((key) => {
                if (!['education', 'skills', 'experience'].includes(key)) {
                    cv[key] = updateData[key];
                }
            });

            await cv.save();

            res.status(200).json({
                message: 'CV updated successfully',
                data: cv,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating CV', error: error.message });
        }
    };

    // [DELETE] candidates/delete-cv/:cvId
    deleteCandidateCv = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { cvId } = req.params;

            if (!userId || !cvId) {
                return res.status(400).json({ message: 'Thiếu thông tin userId hoặc cvId.' });
            }

            const candidate = await Candidate.findOne({ userId: userId }).populate('cvs');

            if (!candidate) {
                return res.status(404).json({ message: 'Không tìm thấy ứng viên.' });
            }

            const cv = await CV.findById(cvId);
            if (!cv) {
                return res.status(404).json({ message: 'Không tìm thấy CV cần xóa.' });
            }

            await cv.deleteOne();

            candidate.cvs = candidate.cvs.filter((cv) => cv._id.toString() !== cvId);
            await candidate.save();

            return res.status(200).json({
                message: 'Xóa CV thành công.',
                data: candidate,
            });
        } catch (error) {
            console.error('Lỗi khi xóa CV:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa CV.', error });
        }
    };
}

module.exports = new CVController();
