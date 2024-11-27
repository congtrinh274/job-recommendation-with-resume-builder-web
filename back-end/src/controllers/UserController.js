require('dotenv').config();

const User = require('../models/User');
const { users } = require('@clerk/express');

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

    // [Post] users/mount-user
    mountUser = async (req, res) => {
        const { email, username, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            email,
            username,
            role,
        });

        try {
            await newUser.save();
            res.status(201).json({ message: 'User saved successfully', user: newUser });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ message: 'Error saving user' });
        }
    };
}

module.exports = new UserController();
