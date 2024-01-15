const mongoose = require('mongoose');
const seeds = require('./seeds');
const Product = require('../models/products.model');
const connectMongoDB = require('../database/MongoDB/connectMongoDB');

require('dotenv').config();

const seeder = () => {
    connectMongoDB(process.env.MONGODB_CONNECTION_STRING);

    Product.deleteMany()
    .then(() => {
        console.log('Existing Products are deleted');
        Product.insertMany(seeds)
        .then(() => {
            console.log('New Products are seeded');
        })
        .catch((err) => {
            console.log(err.message);
        })
        .finally(() => {
            process.exit();
        })
    })
    .catch(err => {
        console.log(err.message);
        process.exit();
    })
};

seeder();