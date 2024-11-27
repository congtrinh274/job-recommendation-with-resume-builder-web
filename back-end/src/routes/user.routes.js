const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/express');

const userController = require('../controllers/UserController');

router.get('/', userController.getUsers);
router.post('/mount-user', userController.mountUser);

module.exports = router;
