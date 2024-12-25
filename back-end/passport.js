require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

const User = require('./src/models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.APP_BASE_URL}/api/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, cb) {
            const loginToken = uuidv4();
            profile.loginToken = loginToken;
            try {
                if (profile?.id) {
                    let user = await User.findOne({ authId: profile.id });

                    if (!user) {
                        user = await User.create({
                            authId: profile.id,
                            email: profile?.emails?.[0]?.value || null,
                            typeLogin: profile?.provider || 'google',
                            username: profile?.displayName || 'No name',
                            imgUrl: profile?.photos?.[0]?.value || null,
                            loginToken,
                        });
                        console.log('User created');
                    } else {
                        user.loginToken = loginToken;
                        await user.save();
                        console.log('User loginToken updated');
                    }
                }
            } catch (error) {
                console.error('Error during user creation:', error);
                return cb(error, null);
            }

            return cb(null, profile);
        },
    ),
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.APP_BASE_URL}/api/auth/facebook/callback`,
            profileFields: ['id', 'emails', 'name', 'photos', 'profile'],
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
            return cb(null, profile);
        },
    ),
);
