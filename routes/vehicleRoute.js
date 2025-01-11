const express = require('express')
const vehicleController = require('../controller/vehicle')
const multer = require('multer')

const router = express.Router()


//storing image file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})


//image filter, accepts only jpeg and png
const fileFilter = (req, file, cb)=>{
    if(file.minetype === 'image/jpeg' || file.minetype === 'image/png' || file.minetype === 'image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}


const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
}
})


router.get('/', vehicleController.getVehicles)

router.post('/', upload.array('images', 10), vehicleController.createVehicle)

router.patch('/', vehicleController.editVehicle)

router.patch('/image/:id', vehicleController.addImageVehicle)

router.delete('/:id', vehicleController.deleteVehicle)


module.exports = router