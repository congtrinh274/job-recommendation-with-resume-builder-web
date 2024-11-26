require('dotenv').config();

const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connect DB Successfully!');
    } catch (error) {
        console.log('Connect DB Failure!: ', error);
    }
}

module.exports = { connect };
