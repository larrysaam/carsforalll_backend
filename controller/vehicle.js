const mongoose = require('mongoose')
const Vehicle = require('../model/vehicleModel')
const cloudinary = require("../helper/imageUploader")

//get all vehicles
exports.getVehicles = (req, res)=>{
    Vehicle.find().exec()
    .then(vehicles =>{
        res.status(200).json({
            size: vehicles.length,
            data: vehicles
        })
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}


//add new vehicle
exports.createVehicle = async(req, res)=>{
    const {made, model, images, price, age, location, fuel, transmition, ac, reverse_camera, description, owner, tel} = req.body
    const imageArray = []
    for(var i=0; i<req.files.length; i++){
        const result = await cloudinary.uploader.upload(req.files[i].path)
        imageArray.push(result.url)
        console.log(result)
    }
    console.log(imageArray)
    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        made,
        model,
        images:imageArray,
        price,
        age,
        location,
        fuel,
        transmition,
        ac,
        reverse_camera,
        description,
        owner,
        tel
    })
    vehicle.save()
    .then(result=>{
        res.status(200).json({
            message: "success"
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}


//edit vehicles
exports.editVehicle = (req, res)=>{
    const id = req.body.id
    const {made, model, price, age, location, fuel, transmition, ac, reverse_camera, description, owner, tel} = req.body
    console.log(req.body)
    Vehicle.findByIdAndUpdate({_id: id},
        {$set : { made, model, price, age, location, fuel, transmition, ac, reverse_camera, description, owner, tel}} 
    ).exec()
    .then(result =>{
        res.status(200).json({
            message: 'success'
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}


//add image
exports.addImageVehicle = (req, res)=>{
    Vehicle.findByIdAndUpdate({_id: req.params.id},{$push : {images: req.body.image}})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'success'
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}


//delete vehicle
exports.deleteVehicle = (req, res)=>{
    Vehicle.deleteOne({_id: req.params.id}).exec()
    .then(result =>{
        res.status(200).json({
            message: 'deleted'
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}