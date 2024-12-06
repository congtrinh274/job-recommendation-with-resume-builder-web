require('dotenv').config();
const User = require('../models/User');
const { generateToken } = require('../utils/jwt.js');

class AuthController {
    // [POST] api/auth/login-success
    loginSuccess = async (req, res) => {
        const { id } = req?.body;
        try {
            if (!id) {
                return res.status(400).json({
                    err: 1,
                    msg: 'Missing payloads',
                });
            }

            const user = await User.findOne({ authId: id });

            if (!user) {
                return res.status(404).json({
                    err: 2,
                    msg: 'User not found',
                });
            }

            const token = await generateToken({ id: user.authId, email: user.email, role: user.role });

            user.loginToken = token;
            await user.save();

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
