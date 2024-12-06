const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/authenticate.middleware');

router.get('/', userController.getUsers);
router.get('/get-one', authenticateToken, userController.getUser);

module.exports = router;
