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

    // [PUT] candidates/update
    updateCandidate = async (req, res) => {
        try {
            const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            res.status(200).json({ message: 'Candidate updated successfully', data: candidate });
        } catch (error) {
            res.status(500).json({ message: 'Error updating candidate', error: error.message });
        }
    };

    // [PUT] candidates/update-cv
    updateCandidateCVs = async (req, res) => {
        try {
            const userId = req.user?._id;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'No file provided or invalid file type.' });
            }

            const { title, content, isPrimary, isOwn } = req.body;
            console.log(isOwn);

            const candidate = await Candidate.findOne({ userId: userId });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            const titleExists = candidate.cvs.some((cv) => cv.title === title);
            if (titleExists) {
                return res.status(400).json({ message: 'Title already exists. Each CV title must be unique.' });
            }

            const newCV = {
                title: title || file.originalname,
                content: content,
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

    // [DELETE] candidates/:id
    deleteCandidate = async (req, res) => {
        try {
            const candidate = await Candidate.findByIdAndDelete(req.params.id);
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            res.status(200).json({ message: 'Candidate deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting candidate', error: error.message });
        }
    };
}

module.exports = new CandidateController();
