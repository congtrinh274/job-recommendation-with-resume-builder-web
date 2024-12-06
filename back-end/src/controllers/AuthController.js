require('dotenv').config();
const User = require('../models/User');
const { generateToken } = require('../utils/jwt.js');
const { v4: uuidv4 } = require('uuid');

class AuthController {
    // [POST] api/auth/login-success/
    loginSuccess = async (req, res) => {
        const { id, loginToken } = req?.body;
        console.log(loginToken);
        try {
            if (!id || !loginToken) {
                return res.status(400).json({
                    err: 1,
                    msg: 'Missing payloads',
                });
            }

            const user = await User.findOne({ authId: id, loginToken: loginToken });

            if (!user) {
                return res.status(404).json({
                    err: 2,
                    msg: 'User not found',
                });
            }

            const newLoginToken = uuidv4();
            user.loginToken = newLoginToken;
            await user.save();

            const token = await generateToken({ id: user.authId, email: user.email, role: user.role });

            return res.status(200).json({
                err: 0,
                msg: 'Login successful',
                token,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'Fail at AuthController: ' + error.message,
            });
        }
    };
}

module.exports = new AuthController();
