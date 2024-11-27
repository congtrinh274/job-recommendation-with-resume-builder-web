require('dotenv').config();

const { Webhook } = require('svix');

const User = require('../models/User');

class UserController {
    // [GET] users/
    getUsers = async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = new UserController();
