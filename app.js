const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

/* Global Variables */
const app = express();
const PORT = process.env.PORT || 9010;

/* Error Handling */
require('./utils/UncaughtExceptionHandler')();
require('./utils/UnhandledRejectionHandler')();

/* MongoDB Connection */
const connectMongoDB = require('./database/MongoDB/connectMongoDB');
connectMongoDB(process.env.MONGODB_CONNECTION_STRING);

/* Middleware */
app.use(express.json());

/* Static Files */
app.use(express.static('public'));

/* Routes */
app.use('/api/v1/products', require('./routes/products.route'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});