const express = require('express');
const router = express.Router();

const categoryJobController = require('../controllers/CategoryJobController');

router.get('/', categoryJobController.getAllCategoryJobs);
router.post('/create', categoryJobController.createCategoryJob);

module.exports = router;
