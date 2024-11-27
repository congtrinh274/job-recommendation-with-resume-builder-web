require('dotenv').config();

const Recruiter = require('../models/Recruiter');
const User = require('../models/User');

class RecruiterController {
    // [GET] recruiters/
    getRecruiters = async (req, res) => {
        try {
            const recruiters = await Recruiter.find();
            res.status(200).json(recruiters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [Post] recruiters/register
    recruiterRegister = async (req, res) => {
        try {
            const { userId, companyName, companyAddress, companyWebsite } = req.body;

            if (!userId || !companyName) {
                return res.status(400).json({ message: 'Missing required fields: userId, companyName' });
            }

            const existingRecruiter = await Recruiter.findOne({ userId });
            if (existingRecruiter) {
                return res.status(400).json({ message: 'This userId has already been registered as a recruiter.' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (user.role === 'recruiter') {
                return res.status(400).json({ message: 'User is already a recruiter.' });
            }

            user.role = 'recruiter';
            await user.save();

            const newRecruiter = new Recruiter({
                userId,
                companyName,
                companyAddress,
                companyWebsite,
            });

            const savedRecruiter = await newRecruiter.save();

            return res.status(201).json({ message: 'Recruiter registered successfully', data: savedRecruiter });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
}

module.exports = new RecruiterController();
