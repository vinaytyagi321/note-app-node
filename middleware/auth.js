const { JWT_SECRET } = require("../config")
const USER_SCHEMA=  require("../models/userModel")
const asyncHandler= require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.authenticate= asyncHandler(async(req,res,next)=>{
    if(req?.headers?.authorization?.startsWith("Bearer")){ //?optional channing 
        var token= req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new Error("no token provided")
    }

    //!decode token

    let decode= jwt.verify(token,JWT_SECRET)

    let user= await USER_SCHEMA.findById(decode.id)

    if(!user){
        throw new Error("user not found")

    }
    req.user= user
    next()
})

exports.isAdmin= asyncHandler(async(req,res,next) =>{
    if(req.user.role=== "admin"){   
        next()
    }
    else{
        throw new Error ("not authorized")
    }

})
