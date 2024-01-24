const mongoose = require('mongoose');

const crypto = require('crypto');

/* Model Imports */
const Account = require('../models/accounts.model');

/* Util Imports */
const sendEmail = require('../utils/sendEmail');
const cookieOptions = require('../utils/cookieOptions');
const { getResetPasswordEmailTemplate } = require('../templates/templateResetPasswordEmail');

const authCtrl = {

    postRegister: (req, res) => {
        Account.create(req.body)
            .then(account => {
                res.status(201).json({
                    success: true,
                    accountId: account._id
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            })
    },

    postLogin: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Enter email & password'
            });
        }

        Account.findOne({ email }).select('+password')
            .then(account => {
                if (!account) {
                    return res.status(404).json({
                        success: false,
                        message: 'Account does not exist'
                    });
                }

                account.comparePassword(password)
                    .then(isPasswordMatched => {
                        if (!isPasswordMatched) {
                            return res.status(401).json({
                                success: false,
                                message: 'Invalid password'
                            });
                        }

                        const token = account.getJwtToken();
                        return res.status(200)
                            .cookie('token', token, cookieOptions)
                            .json({
                                success: true,
                            });
                    })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            })
    },

    getLogout: (req, res) => {
        res.clearCookie('token').json({
            success: true,
            message: 'Logout Successful'
        })
    },

    postForgotPassword: (req, res) => {
        const email = req.body.email;

        if (!email) {
            res.status(400).json({
                success: false,
                message: 'Enter email address'
            });
        }

        Account.findOne({ email })
            .then(async account => {
                if (!account) {
                    res.status(404).json({
                        success: false,
                        message: 'Account does not exist'
                    });
                }

                // Get Reset Password Token
                const resetToken = account.getResetPasswordToken();
                await account.save();

                // Create Reset Password URL
                const frontendUrl = process.env.FRONTEND_URL;
                const resetUrl = `${frontendUrl}/api/v1/password/reset/?email=${account?.email}&token=${resetToken}`;
                const resetMessage = getResetPasswordEmailTemplate(account, resetUrl);

                try {
                    await sendEmail({
                        recipientEmail: account.email,
                        subject: 'Reset Password <Phoenix Shop>',
                        html: resetMessage
                    });

                    res.status(200).json({
                        success: true,
                        message: `Reset Password Email has been sent to ${account.email}`
                    });
                }
                catch (err) {
                    account.resetPasswordToken = null;
                    account.resetPasswordExpiry = null;

                    await account.save();

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
            })
    },

    postResetPassword: (req, res) => {
        const email = req.body?.email;
        const resetToken = req.body?.token;

        // Hash token from URL
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        Account.findOne({ email })
            .then(async account => {
                if (!account) {
                    return res.status(404).json({
                        success: false,
                        message: 'Account does not exist'
                    });
                }

                if (
                    account.resetPasswordToken !== hashedToken
                    || account.resetPasswordExpiry < Date.now()
                ) {
                    return res.status(401).json({
                        success: false,
                        message: 'Reset Password Token Invalid'
                    });
                }

                if (!req.body?.password || req.body?.password === '') {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid Password'
                    });
                }

                account.password = req.body?.password;
                account.resetPasswordToken = null;
                account.resetPasswordExpiry = null;

                await account.save();

                const token = account.getJwtToken();
                res.status(201)
                    .cookie('token', token, cookieOptions)
                    .json({
                        success: true,
                    });
            })
    },

    putUpdatePassword: (req, res) => {
        Account.findById(req.accountId).select('+password')
            .then(async account => {
                if (!account) {
                    return res.status(404).json({
                        success: false,
                        message: 'Account does not exist'
                    });
                }

                const oldPassword = req.body?.oldPassword;
                const newPassword = req.body?.password;
                if (
                    !oldPassword || !newPassword ||
                    oldPassword === '' || newPassword === ''
                ) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid Password'
                    });
                }

                const isPasswordMatched = await account.comparePassword(oldPassword);
                if (!isPasswordMatched) {
                    return res.status(401).json({
                        success: false,
                        message: 'Incorrect Old Password'
                    });
                }

                account.password = newPassword;
                account.save();
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

module.exports = authCtrl;