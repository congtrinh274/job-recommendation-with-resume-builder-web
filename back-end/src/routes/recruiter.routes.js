const express = require('express');
const router = express.Router();

const recruiterController = require('../controllers/RecruiterController');
const authenticateToken = require('../middlewares/authenticate.middleware');

router.get('/', recruiterController.getRecruiters);
router.get('/get-one', authenticateToken, recruiterController.getRecruiter);
router.post('/send-verification-code', authenticateToken, recruiterController.sendVerificationCode);
router.post('/verified-code', authenticateToken, recruiterController.verifiedMail);
router.post('/update', authenticateToken, recruiterController.updateRecruiter);

module.exports = router;
