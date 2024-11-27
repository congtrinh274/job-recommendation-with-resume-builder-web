const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const webhookController = require('../controllers/WebhookController');

// Middleware xử lý body raw cho webhook
router.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), webhookController.handleWebhooks);

module.exports = router;
