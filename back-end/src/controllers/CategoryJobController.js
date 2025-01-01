require('dotenv').config();

const CategoryJob = require('../models/CategoryJob');

class CategoryJobController {
    // [POST] job-categories/create
    createCategoryJob = async (req, res) => {
        try {
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({ message: 'Title is required.' });
            }

            const newCategoryJob = await CategoryJob.create({ title, description });
            res.status(201).json({
                message: 'CategoryJob created successfully.',
                data: newCategoryJob,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    };

    // [GET] job-categories/
    getAllCategoryJobs = async (req, res) => {
        try {
            const categoryJobs = await CategoryJob.find();
            res.status(200).json({
                message: 'CategoryJobs fetched successfully.',
                data: categoryJobs,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    };

    // Lấy một CategoryJob theo ID
    getCategoryJobById = async (req, res) => {
        try {
            const { id } = req.params;
            const categoryJob = await CategoryJob.findById(id);

            if (!categoryJob) {
                return res.status(404).json({ message: 'CategoryJob not found.' });
            }

            res.status(200).json({
                message: 'CategoryJob fetched successfully.',
                data: categoryJob,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    };

    // Cập nhật một CategoryJob
    updateCategoryJob = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const updatedCategoryJob = await CategoryJob.findByIdAndUpdate(
                id,
                { title, description },
                { new: true, runValidators: true },
            );

            if (!updatedCategoryJob) {
                return res.status(404).json({ message: 'CategoryJob not found.' });
            }

            res.status(200).json({
                message: 'CategoryJob updated successfully.',
                data: updatedCategoryJob,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    };

    // Xóa một CategoryJob
    deleteCategoryJob = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedCategoryJob = await CategoryJob.findByIdAndDelete(id);

            if (!deletedCategoryJob) {
                return res.status(404).json({ message: 'CategoryJob not found.' });
            }

            res.status(200).json({
                message: 'CategoryJob deleted successfully.',
                data: deletedCategoryJob,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    };
}

module.exports = new CategoryJobController();
