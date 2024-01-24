const cookieOptions = {
    expires: new Date (
        Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
};

module.exports = cookieOptions;