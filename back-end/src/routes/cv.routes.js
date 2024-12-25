const express = require('express');
const router = express.Router();

const CVController = require('../controllers/CVController');
const authenticateToken = require('../middlewares/authenticate.middleware');
const upload = require('../middlewares/multer.middleware');

router.get('/', authenticateToken, CVController.getCVs);
router.get('/get-cv/:cvId', authenticateToken, CVController.getCVById);

router.post('/add-cv', authenticateToken, CVController.addCandidateCV);

router.put('/upload-cv', upload.single('file'), authenticateToken, CVController.uploadCandidateCV);
router.put('/update-cv/:cvId', upload.single('file'), authenticateToken, CVController.updateCandidateCV);

router.delete('/delete-cv/:cvId', authenticateToken, CVController.deleteCandidateCv);

module.exports = router;
