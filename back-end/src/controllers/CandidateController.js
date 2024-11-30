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

    // [GET] candidates/:userId
    getCandidateByUserId = async (req, res) => {
        try {
            const { userId } = req.params;
            const candidate = await Candidate.findOne({ userId: userId });

            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found for this userId' });
            }

            res.status(200).json({ message: 'Candidate found successfully', data: candidate });
        } catch (error) {
            res.status(500).json({ message: 'Error finding candidate', error: error.message });
        }
    };

    // [POST] candidates/
    createCandidate = async (req, res) => {
        try {
            const { userId } = req.body; // Lấy userId từ body request

            const existingCandidate = await Candidate.findOne({ userId });

            if (existingCandidate) {
                return res.status(400).json({ message: 'Candidate with this userId already exists' });
            }

            const newCandidate = new Candidate(req.body);
            const savedCandidate = await newCandidate.save();

            res.status(201).json({ message: 'Candidate created successfully', data: savedCandidate });
        } catch (error) {
            res.status(500).json({ message: 'Error creating candidate', error: error.message });
        }
    };

    // [PUT] candidates/:id
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
