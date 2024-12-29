require('./passport');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const route = require('./src/routes');
const db = require('./src/configs/dbConfig');

db.connect();

const app = express();
const port = 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    }),
);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

global.io = io;

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('register', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('combined'));

route(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
