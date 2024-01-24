const mongoose = require('mongoose');

/* Model Imports */
const Account = require('../models/accounts.model');

const profileCtrl = {

    getUserProfile: (req, res) => {
        Account.findById(req?.accountId)
            .then(account => {
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

    updateUserProfile: (req, res) => {
        const newData = {
            username: req.body?.username,
        }

        Account.findByIdAndUpdate(req?.accountId, newData, { new: true })
            .then(account => {
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

module.exports = profileCtrl;