require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/AuthController');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
    '/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, profile) => {
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}`);
    },
);

router.post('/login-success', authController.loginSuccess);
module.exports = router;
