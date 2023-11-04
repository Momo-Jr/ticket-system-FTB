const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel'); 

const protect = expressAsyncHandler(async ()=>{
    let token 
// Check for token and then it's starting with bearer as it's the encyption method 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Extract token from headers
                token = req.headers.authorization.split(' ')[1]

                // Verfiy Token & remove password
                const decoded =  jwt.verify(token  , process.env.JWT_SECRET)
                req.user = await User.findById (decoded.id).select('-password')

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('No access token')
        }
    }
    if (!token){
        throw new Error ('No access token')
    }
})
module. exports = {protect}