const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/CandidateController');
const authenticateToken = require('../middlewares/authenticate.middleware');
const upload = require('../middlewares/multer.middleware');

router.get('/', candidateController.getCandidates);

router.get('/get-one', authenticateToken, candidateController.getCandidateByUserId);

router.put('/update', candidateController.updateCandidate);
router.put('/:id', upload.single('file'), authenticateToken, candidateController.updateCandidateCVs);

router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
