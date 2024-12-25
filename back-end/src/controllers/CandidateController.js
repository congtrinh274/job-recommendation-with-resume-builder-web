require('dotenv').config();

const Candidate = require('../models/Candidate');
const CV = require('../models/CV');

class CandidateController {
    // [GET] candidates/
    getCandidates = async (req, res) => {
        try {
            // Sử dụng populate để lấy thông tin của user liên kết qua userId
            const candidates = await Candidate.find().populate('userId');
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching candidates', error: error.message });
        }
    };

    // [GET] candidates/get-one
    getCandidateByUserId = async (req, res) => {
        try {
            // Tìm Candidate dựa trên userId
            const candidate = await Candidate.findOne({ userId: req.user?._id }).populate('cvs');
            if (!candidate) {
                return res.status(200).json({
                    err: 1,
                    msg: 'Candidate not found',
                });
            }

            return res.status(200).json({
                _id: candidate._id,
                userId: candidate.userId,
                cvs: candidate.cvs,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                err: 2,
                msg: 'Internal server error',
            });
        }
    };
}

module.exports = new CandidateController();
