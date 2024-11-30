const express = require('express');
const router = express.Router();

const cvController = require('../controllers/CVController');
const upload = require('../middlewares/multer.middleware');

router.get('/', cvController.getAllCVs);

router.get('/:candidateId', cvController.getCVByCandidateId);

router.post('/', upload.single('uploadedCV'), cvController.createCV);

router.put('/:id', cvController.updateCV);

router.delete('/:id', cvController.deleteCV);

module.exports = router;
