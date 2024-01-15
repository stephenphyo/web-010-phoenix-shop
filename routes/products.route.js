const router = require('express').Router();

const productsCtrl = require('../controllers/products.controller');

/* GET */
router.get('/', productsCtrl.getAllProducts);
router.get('/search', productsCtrl.searchProducts);
router.get('/:id', productsCtrl.getProductById);

/* POST */
router.post('/new', productsCtrl.postNewProduct);

/* DELETE */
router.delete('/delete/:id', productsCtrl.deleteProduct);


module.exports = router;