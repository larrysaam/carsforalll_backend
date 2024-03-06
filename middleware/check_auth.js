const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
   try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, "carsforall")
        req.userData = decoded
        next()
   } catch (error) {
    return res.send(error.message)
   }
}