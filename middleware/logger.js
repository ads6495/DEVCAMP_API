// @desc        Logs requests to console
const logger = (req, res, next) => {
    req.hello = 'hello world';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    //call next to know middleware to move on to the next
    next();
}

module.exports = logger;