const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/CandidateController');
const authenticateToken = require('../middlewares/authenticate.middleware');
const upload = require('../middlewares/multer.middleware');

router.get('/', candidateController.getCandidates);
router.get('/get-one', authenticateToken, candidateController.getCandidateByUserId);
router.get('/get-cv/:cvId', authenticateToken, candidateController.getCVById);

router.post('/add-cv', authenticateToken, candidateController.addCandidateCV);

router.put('/upload-cv', upload.single('file'), authenticateToken, candidateController.uploadCandidateCV);
router.put('/update-cv/:cvId', upload.single('file'), authenticateToken, candidateController.updateCandidateCV);

router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
