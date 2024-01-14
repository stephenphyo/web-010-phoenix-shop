const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();


/* Global Variables */
const app = express();
const PORT = process.env.PORT || 9010;

/* Middleware */
app.use(express.json());

/* Static Files */
app.use(express.static('public'));

/* Routes */
app.use('/products', require('./routes/product.route'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});