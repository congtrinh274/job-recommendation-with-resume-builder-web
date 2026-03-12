const express = require('express');
const router = express.Router();

const jobController = require('../controllers/JobController');
const authenticateToken = require('../middlewares/authenticate.middleware');

router.get('/', jobController.getJobs);
router.get('/get-active-jobs', jobController.getActiveJob);
router.get('/get-one/:jobId', jobController.getJobById);
router.post('/create', authenticateToken, jobController.createJob);
router.post('/approved/:jobId', authenticateToken, jobController.jobApproved);
router.post('/change-application-state/:jobId', authenticateToken, jobController.changeAcceptingApplicationState);
router.post('/apply/:jobId', authenticateToken, jobController.getApplication);
router.post('/update-application-state', authenticateToken, jobController.updateApplicationState);

module.exports = router;
