const UnhandledRejectionHandler = () => {
    process.on('unhandledRejection', err => {
        console.log(`ERR: ${err}`);
        console.log('Shutting down due to Unhandled Rejections');
        server.close(() => {
            process.exit();
        })
    });
}

module.exports = UnhandledRejectionHandler;