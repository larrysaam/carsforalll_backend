const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    made: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    images: [{
        type: String,
        require: true
    }],
    price: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    fuel: {
        type: String,
        require: true
    },
    transmition: {
        type: String,
        require: true
    },
    ac: {
        type: String,
        require: true
    },
    reverse_camera: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        require: true
    }
})


module.exports = mongoose.model('Vehicle', vehicleSchema)