const express = require('express');
const router = express.Router();

const recruiterController = require('../controllers/RecruiterController');

router.get('/', recruiterController.getRecruiters);
router.post('/register', recruiterController.recruiterRegister);

module.exports = router;
