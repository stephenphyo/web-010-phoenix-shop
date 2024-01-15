const UncaughtExceptionHandler = () => {
    process.on('uncaughtException', err => {
        console.log(`ERR: ${err}`);
        console.log('Shutting down due to Uncaught Exceptions');
        process.exit();
    });
}

module.exports = UncaughtExceptionHandler;