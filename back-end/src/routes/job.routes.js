const express = require('express');
const router = express.Router();

const jobController = require('../controllers/JobController');

router.get('/', jobController.getJobs);

module.exports = router;
