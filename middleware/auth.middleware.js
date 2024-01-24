const jwt = require('jsonwebtoken');

/* Model Imports */
const Account = require('../models/accounts.model');

exports.validateAuthentication = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const accountId = decoded?.id;

    req.accountId = accountId;

    next();
}

exports.validateAuthorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.account.role)) {
            return res.status(403).json({
                success: false,
                message: 'Not Authorized'
            });
        }
        next();
    }
}