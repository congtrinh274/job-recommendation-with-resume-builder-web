const express = require('express');
const router = express.Router();

const recruiterController = require('../controllers/RecruiterController');
const authenticateToken = require('../middlewares/authenticate.middleware');
const upload = require('../middlewares/multer.middleware');

router.get('/', recruiterController.getRecruiters);
router.get('/get-one', authenticateToken, recruiterController.getRecruiter);
router.post('/send-verification-code', authenticateToken, recruiterController.sendVerificationCode);
router.post('/verified-code', authenticateToken, recruiterController.verifiedMail);
router.post('/validated', authenticateToken, recruiterController.recruiterValidated);
router.put('/update', authenticateToken, recruiterController.updateRecruiter);
router.put('/upload-license', authenticateToken, upload.single('file'), recruiterController.uploadLicense);
router.put('/upload-img', authenticateToken, upload.single('file'), recruiterController.uploadImg);

module.exports = router;
