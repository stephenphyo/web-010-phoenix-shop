const router = require('express').Router();

/*** Controller Imports ***/
const productsCtrl = require('../controllers/products.controller');

/*** Middleware Imports ***/
const { validateAuthentication, validateAuthorization } = require('../middleware/auth.middleware');

/*** Routers ***/
const userRouter = require('express').Router();
const adminRouter = require('express').Router();

/** USER ROUTES **/
/* GET */
userRouter.get('/', productsCtrl.getAllProducts);
userRouter.get('/search', productsCtrl.getSearchProducts);
userRouter.get('/:id', productsCtrl.getProductById);


/** ADMIN ROUTES **/
/* POST */
adminRouter.post('/create', validateAuthentication, validateAuthorization('user'), productsCtrl.postNewProduct);

/* DELETE */
adminRouter.delete('/delete/:id', validateAuthentication, validateAuthorization('user'), productsCtrl.deleteProduct);

router.use('/products', userRouter);
router.use('/admin/products', adminRouter);
module.exports = router;