const router = require('express').Router();

/*** Controller Imports ***/
const authCtrl = require('../controllers/auth.controller');

/*** Middleware Imports ***/
const { validateAuthentication } = require('../middleware/auth.middleware');

/*** Routers ***/
const authRouter = require('express').Router();

/* GET */
authRouter.get('/logout', authCtrl.getLogout);

/* POST */
authRouter.post('/register', authCtrl.postRegister);
authRouter.post('/login', authCtrl.postLogin);
authRouter.post('/password/forgot', authCtrl.postForgotPassword);
authRouter.post('/password/reset', authCtrl.postResetPassword);

/* PUT */
authRouter.put('/password/update', validateAuthentication, authCtrl.putUpdatePassword);

router.use('/auth', authRouter);
module.exports = router;