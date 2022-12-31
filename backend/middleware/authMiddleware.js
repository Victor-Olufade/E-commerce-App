import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import asyncHandler from 'express-async-handler'

export const protect = asyncHandler(async(req, res, next) => {
    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Unauthorized, token failed')
        }
       
    }else if(!token){
        res.status(401).json({
            Error: "Unauthorized, no token"
        })
    }
    next()
})

export const admin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Unauthorized, not an admin")
    }
}