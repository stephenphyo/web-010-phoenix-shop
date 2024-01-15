const mongoose = require('mongoose');
const Product = require('../models/products.model');

const productsCtrl = {

    getAllProducts: (req, res) => {
        Product.find()
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err
            });
        })
    },

    getProductById: (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
            return res.status(400).json({
                success: false,
                message: 'ProductId is not valid'
            });
        }

        Product.findById(req.params?.id)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Product Not Exists'
                });
            }

            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        })
    },

    searchProducts: (req, res) => {
        var query = {};
        for (var key in req.query) {
            req.body[key] !== ''
            ? query[key] = new RegExp(req.query[key], 'i')
            : null;
        }
        console.log(query);

        Product.find(query)
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        })
    },

    postNewProduct: (req, res) => {
        Product.create(req.body)
        .then(result => {
            res.status(201).json({
                success: true,
                data: result
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err
            })
        })
    },

    deleteProduct: (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
            return res.status(400).json({
                success: false,
                message: 'ProductId is not valid'
            });
        }

        Product.findByIdAndDelete(req.params?.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product Not Exists'
                });
            }

            res.status(200).json({
                success: true
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        })
    },
}

module.exports = productsCtrl;