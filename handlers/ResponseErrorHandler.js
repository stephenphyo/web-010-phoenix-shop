const ResponseErrorHandler = (err, req, res, next) => {
    console.log(err)
    const errStatus = err?.statusCode || 500;
    const errMessage = err?.message || 'Internal Server Error';

    res.status(errStatus).json({
        success: false,
        message: errMessage
    })
}

module.exports = ResponseErrorHandler;