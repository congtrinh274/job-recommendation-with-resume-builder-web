const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const { clerkMiddleware } = require('@clerk/express');

const route = require('./src/routes');
const db = require('./src/configs/dbConfig');
const WebhookController = require('./src/controllers/WebhookController');

db.connect();

const app = express();
const port = 5000;

app.use(cors());

app.use(methodOverride('_method'));

// webhooks route
app.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), WebhookController.handleWebhooks);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Clerk with Auth
app.use(
    clerkMiddleware({
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    }),
);

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
