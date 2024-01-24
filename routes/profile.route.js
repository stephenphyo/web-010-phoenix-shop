const router = require('express').Router();

/*** Controller Imports ***/
const profileCtrl = require('../controllers/profile.controller');

/*** Middleware Imports ***/
const { validateAuthentication, validateAuthorization } = require('../middleware/auth.middleware');

/*** Routers ***/
const profileRouter = require('express').Router();

/* GET */
profileRouter.get('/me', validateAuthentication, profileCtrl.getUserProfile);

/* PUT */
profileRouter.put('/me/update', validateAuthentication, profileCtrl.updateUserProfile);

router.use('/profile', profileRouter);
module.exports = router;