const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')


// Load env varis
dotenv.config({
    path: './config/config.env'
});

//connect to DB
connectDB()

//Route files
const bootcamps = require('./routes/bootcamps')


//middleware
const app = express()

//Body Parser
app.use(express.json())


//Dev logging middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`)
    //close server & exit process
    server.close(() => process.exit(1))
})