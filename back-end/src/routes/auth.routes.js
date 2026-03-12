require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/AuthController');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
    '/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect('/login');
            }

            req.user = user;
            next();
        })(req, res, next);
    },
    (req, res) => {
        console.log(req.user);

        res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}/${req.user?.loginToken}`);
    },
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/github/callback',
    (req, res, next) => {
        passport.authenticate('github', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect('/login');
            }

            req.user = user;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}/${req.user?.loginToken}`);
    },
);

router.post('/login-success', authController.loginSuccess);

module.exports = router;
