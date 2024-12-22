require('dotenv').config();

const Candidate = require('../models/Candidate');

class CandidateController {
    // [GET] candidates/
    getCandidates = async (req, res) => {
        try {
            const candidates = await Candidate.find();
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching candidates', error: error.message });
        }
    };

    // [GET] candidates/get-one
    getCandidateByUserId = async (req, res) => {
        try {
            const candidate = await Candidate.findOne({ userId: req.user?._id });
            if (!candidate) {
                return res.status(200).json({
                    err: 1,
                    msg: 'Candidate not found',
                });
            }
            return res.status(200).json({
                _id: candidate._id,
                userId: candidate.userId,
                fullName: candidate.email,
                phone: candidate.phone,
                address: candidate.address,
                skills: candidate.skills,
                experience: candidate.experience,
                education: candidate.education,
                cvs: candidate.cvs,
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                err: 2,
                msg: 'Internal server error',
            });
        }
    };

    // [GET] candidates/get-cv/:cvId
    getCVById = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { cvId } = req.params;

            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const cv = candidate.cvs.id(cvId);
            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }

            res.status(200).json({
                message: 'CV retrieved successfully',
                data: cv,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving CV', error: error.message });
        }
    };

    // [POST] candidates/add-cv
    addCandidateCV = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { title, isPrimary, isOwn } = req.body;
            const file = req.file;

            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const titleExists = candidate.cvs.some((cv) => cv.title === title);
            if (titleExists) {
                return res.status(400).json({ message: 'Tên hồ sơ đã tồn tại, vui lòng chọn tên khác!' });
            }

            const newCV = {
                title: title || (file ? file.originalname : 'Untitled'),
                uploadedCV: file ? `/uploads/${file.filename}` : null,
                isPrimary: isPrimary || false,
                isOwn: isOwn || false,
            };

            if (newCV.isPrimary) {
                candidate.cvs.forEach((cv) => (cv.isPrimary = false));
            }

            candidate.cvs.push(newCV);
            await candidate.save();

            const addedCV = candidate.cvs[candidate.cvs.length - 1];

            res.status(201).json({
                message: 'CV added successfully',
                data: addedCV,
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

            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const titleExists = candidate.cvs.some((cv) => cv.title === title);
            if (titleExists) {
                return res.status(400).json({ message: 'Tên hồ sơ đã tồn tại, vui lòng chọn tên khác!' });
            }

            const newCV = {
                title: title || file.originalname,
                uploadedCV: `/uploads/${req.file.filename}`,
                isPrimary: isPrimary,
                isOwn: isOwn,
            };

            if (newCV.isPrimary) {
                candidate.cvs.forEach((cv) => (cv.isPrimary = false));
            }

            candidate.cvs.push(newCV);
            await candidate.save();

            res.status(200).json({
                message: 'CV updated successfully',
                data: candidate,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating CV', error: error.message });
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

            const cv = candidate.cvs.id(cvId);
            if (!cv) {
                return res.status(404).json({ message: 'CV not found' });
            }

            if (updateData.title) {
                const titleExists = candidate.cvs.some(
                    (cv) => cv.title === updateData.title && cv._id.toString() !== cvId,
                );
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

            // Update experience
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

            // Update experience
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

            // Update other fields
            Object.keys(updateData).forEach((key) => {
                if (!['education', 'skills', 'experience'].includes(key)) {
                    cv[key] = updateData[key];
                }
            });

            await candidate.save();

            res.status(200).json({
                message: 'CV updated successfully',
                data: cv,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating CV', error: error.message });
        }
    };

    // [DELETE] candidates/delete-cv/:cvId
    deleteCandidate = async (req, res) => {
        try {
            const userId = req.user?._id;
            const { cvId } = req.params;

            if (!userId || !cvId) {
                return res.status(400).json({ message: 'Thiếu thông tin userId hoặc cvId.' });
            }

            const candidate = await Candidate.findOne({ userId: userId });

            if (!candidate) {
                return res.status(404).json({ message: 'Không tìm thấy ứng viên.' });
            }

            const cvIndex = candidate.cvs.findIndex((cv) => cv._id.toString() === cvId);

            if (cvIndex === -1) {
                return res.status(404).json({ message: 'Không tìm thấy CV cần xóa.' });
            }

            candidate.cvs.splice(cvIndex, 1);

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

module.exports = new CandidateController();
