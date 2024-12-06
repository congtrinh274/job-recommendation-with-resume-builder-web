require('dotenv').config();

const User = require('../models/User');

class UserController {
    // [GET] users/
    getUsers = async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json({
                err: 0,
                msg: 'Get users successful',
                users,
            });
        } catch (error) {
            return res.status(404).json({
                err: 2,
                msg: 'Users not found',
            });
        }
    };

    // [GET] user/
    getUser = async (req, res) => {
        try {
            const user = await User.findOne({ authId: req.user?.id });
            if (!user) {
                return res.status(200).json({
                    err: 1,
                    msg: 'User not found',
                });
            }
            return res.status(200).json({
                _id: user._id,
                authId: user.authId,
                email: user.email,
                username: user.username,
                typeLogin: user.typeLogin,
                role: user.role,
                imgUrl: user.imgUrl,
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                err: 2,
                msg: 'Internal server error',
            });
        }
    };
}

module.exports = new UserController();
