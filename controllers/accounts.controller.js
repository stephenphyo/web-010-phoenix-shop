const mongoose = require('mongoose');

/* Model Imports */
const Account = require('../models/accounts.model');

const accountsCtrl = {

    getAccountCheck: (req, res) => {
        Account.findOne({ email: req.query?.email })
            .then(account => {

                if (!account) {
                    return res.status(404).json({
                        success: false,
                        message: 'Account does not exist'
                    });
                }

                res.status(200).json({
                    success: true,
                    data: account
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

module.exports = accountsCtrl;