require('dotenv').config();
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const generateToken = async (
    payload,
    accessTokenSecret = process.env.JWT_SECRET_KEY,
    accessTokenLife = process.env.JWT_TOKEN_LIFE,
) => {
    try {
        return await sign(
            {
                payload,
            },
            accessTokenSecret,
            {
                expiresIn: accessTokenLife,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};

const verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};

module.exports = { generateToken, decodeToken, verifyToken };
