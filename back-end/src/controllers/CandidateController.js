require('dotenv').config();

const Candidate = require('../models/Candidate');

class CandidateController {
    // [GET] candidates/
    getCandidates = async (req, res) => {
        try {
            const candidates = await Candidate.find();
            res.status(200).json(candidates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    // [Post] recruiters/register
}

module.exports = new CandidateController();
