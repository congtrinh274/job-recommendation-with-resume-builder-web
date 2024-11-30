require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const User = require('./src//models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.APP_BASE_URL}/api/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, cb) {
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
                        });
                        console.log('User created');
                    } else {
                        console.log('User already exists');
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
