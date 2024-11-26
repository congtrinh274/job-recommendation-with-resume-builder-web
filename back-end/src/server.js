const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./configs/dbConfig');

db.connect();

console.log(db);

const app = express();
const port = 5000;

app.use(cors());

// Middleware handle body data of post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
