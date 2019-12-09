const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;


    console.log(err)

    //log to console for developer
    // console.log(error.stack);

    //Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with the id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    //mongoose duplicate key
    if (err.code === 11000) {
        const Message = 'This already exsists!'
        error = new ErrorResponse(Message, 400);
    }


    //mongoose validation error
    if (err.name === 'ValidationError') {
        const Message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(Message, 400);
    }

    res.status(error.statusCode || 500).json({ sucess: false, error: error.message || 'Server Error' });
}

module.exports = errorHandler;