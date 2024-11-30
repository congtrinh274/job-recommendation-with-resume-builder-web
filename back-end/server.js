require('./passport');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');

const route = require('./src/routes');
const db = require('./src/configs/dbConfig');

db.connect();

const app = express();
const port = 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
);

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//HTTP logger
app.use(morgan('combined'));

// Route init
route(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
