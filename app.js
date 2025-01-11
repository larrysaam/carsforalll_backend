const vehiclesRoute = require('./routes/vehicleRoute')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()



const app = express()


//connecting to mongodb atlas database (Cloud)
mongoose.connect(process.env.MONGODB)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/uploads', express.static('uploads'))

//avoid cors errors
app.use(cors())


//available routes
app.use('/vehicle', vehiclesRoute)


//unreachable routes
app.use((req, res)=>{
    const error = new Error()
    error.message = 'page not found'
    res.status(500).json({error : {msg: error.message}})
})


module.exports = app