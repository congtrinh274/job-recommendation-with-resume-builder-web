const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/CandidateController');
const authenticateToken = require('../middlewares/authenticate.middleware');

router.get('/', candidateController.getCandidates);
router.get('/get-one', authenticateToken, candidateController.getCandidateByUserId);

module.exports = router;
