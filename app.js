const vehiclesRoute = require('./routes/vehicleRoute')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()


//connecting to mongodb atlas database (Cloud)
mongoose.connect('mongodb+srv://Larrien:qwerty123456@cluster0.u7xnpo6.mongodb.net/carsforall?retryWrites=true&w=majority&appName=Cluster0')


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