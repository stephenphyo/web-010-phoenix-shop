const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const parseCookie = require('cookie-parser');

require('dotenv').config();

/* Global Variables */
const app = express();
const PORT = process.env.PORT || 9010;

/* Error Handling */
require('./handlers/UncaughtExceptionHandler')();
require('./handlers/UnhandledRejectionHandler')();

/* MongoDB Connection */
const connectMongoDB = require('./database/MongoDB/connectMongoDB');
connectMongoDB(process.env.MONGODB_CONNECTION_STRING);

/* Static Files */
app.use(express.static('public'));

/* Middleware */

app.use(express.json());
app.use(parseCookie());

const corsOptions = {
    credentials: true,
    origin: [
        'http://localhost:3010',
        'http://current.stephenphyo.click:3010'
    ]
};

app.use(cors(corsOptions));


/* Routes */
app.use('/api/v1', require('./routes/products.route'));
app.use('/api/v1', require('./routes/auth.route'));
app.use('/api/v1', require('./routes/accounts.route'));
app.use('/api/v1', require('./routes/profile.route'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});