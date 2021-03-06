const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

const app = express()

// Load env varis
dotenv.config({
    path: './config/config.env'
});

//connect to DB
connectDB()

//Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')


//Body Parser
app.use(express.json())


//Dev logging middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorHandler);


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`)
    //close server & exit process
    server.close(() => process.exit(1))
})