const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/CandidateController');

router.get('/', candidateController.getCandidates);

router.get('/:userId', candidateController.getCandidateByUserId);

router.post('/', candidateController.createCandidate);

router.put('/:id', candidateController.updateCandidate);

router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
