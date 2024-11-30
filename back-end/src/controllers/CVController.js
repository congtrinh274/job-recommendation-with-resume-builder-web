require('dotenv').config();

const CV = require('../models/CV');

class CVController {
    // [GET] api/cvs
    getAllCVs = async (req, res) => {
        try {
            const cvs = await CV.find();
            res.status(200).json({ message: 'CVs retrieved successfully', data: cvs });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving CVs', error: error.message });
        }
    };

    // [POST] api/cvs
    createCV = async (req, res) => {
        try {
            const { candidateId, title, isPrimary } = req.body;
            const uploadedCV = req.file ? `/uploads/${req.file.filename}` : null;

            if (!uploadedCV) {
                return res.status(400).json({ message: 'No CV file uploaded' });
            }

            const newCV = await CV.create({ candidateId, title, uploadedCV, isPrimary });

            res.status(201).json({ message: 'CV created successfully', data: newCV });
        } catch (error) {
            res.status(500).json({ message: 'Error creating CV', error: error.message });
        }
    };

    // [GET] api/cvs/:candidateId
    getCVByCandidateId = async (req, res) => {
        try {
            const { candidateId } = req.params;
            const cvs = await CV.find({ candidateId }).populate('candidateId');

            if (!cvs || cvs.length === 0) {
                return res.status(404).json({ message: 'No CVs found for this candidateId' });
            }

            res.status(200).json({ message: 'CVs retrieved successfully', data: cvs });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving CVs', error: error.message });
        }
    };

    // [PUT] api/cvs
    updateCV = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedCV = await CV.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedCV) {
                return res.status(404).json({ message: 'CV not found' });
            }
            res.status(200).json({ message: 'CV updated successfully', data: updatedCV });
        } catch (error) {
            res.status(500).json({ message: 'Error updating CV', error: error.message });
        }
    };

    // [DELETE] api/cvs/:cvId
    deleteCV = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCV = await CV.findByIdAndDelete(id);
            if (!deletedCV) {
                return res.status(404).json({ message: 'CV not found' });
            }
            res.status(200).json({ message: 'CV deleted successfully', data: deletedCV });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting CV', error: error.message });
        }
    };
}

module.exports = new CVController();
