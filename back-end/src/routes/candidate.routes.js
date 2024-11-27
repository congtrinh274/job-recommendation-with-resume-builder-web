const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/CandidateController');

router.get('/', candidateController.getCandidates);

module.exports = router;
