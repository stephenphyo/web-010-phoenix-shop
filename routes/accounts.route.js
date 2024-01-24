const router = require('express').Router();

/*** Controller Imports ***/
const accountsCtrl = require('../controllers/accounts.controller');

/*** Routers ***/
const accountsRouter = require('express').Router();

/* GET */
accountsRouter.get('/check', accountsCtrl.getAccountCheck);

router.use('/accounts', accountsRouter);
module.exports = router;