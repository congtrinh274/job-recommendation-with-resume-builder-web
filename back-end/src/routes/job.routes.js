const express = require('express');
const router = express.Router();

const jobController = require('../controllers/JobController');
const authenticateToken = require('../middlewares/authenticate.middleware');

router.get('/', jobController.getJobs);
router.post('/create', authenticateToken, jobController.createJob);
router.post('/approved/:jobId', authenticateToken, jobController.jobApproved);

module.exports = router;
