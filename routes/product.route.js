const router = require('express').Router();

const productsCtrl = require('../controllers/products.controller');

/* GET */
router.get('/', productsCtrl.getAllProducts);

module.exports = router;