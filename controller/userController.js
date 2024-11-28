const USER_SCHEMA= require("../models/userModel")
const asyncHandler= require("express-async-handler")

exports.addUser=  asyncHandler(async(req,res)=>{
    let payLoad= req.body
    
    await USER_SCHEMA.create(payLoad)
    // res.send("data added")
    res.status(201).json({
        message:"user successfully added",payLoad,
    })
})
//!fetch allusers
exports.fetchAllUsers= asyncHandler(async(req,res)=>{
    let users= await USER_SCHEMA.find()
   if(users.length==0){
    throw new Error ("no user found")
   }
   res.status(200).json({
    message:"users fetched successfully",users
   })
})

//!fetchone

exports.fetchOne= asyncHandler(async(req,res)=>{
    let {id}= req.params
    let user= await USER_SCHEMA.findById(id)
   if(!user){
    throw new Error ("no user found")
   }
   res.status(200).json({
    msg:"users found",
    user
   })
})

//!update user details

exports.updateUser= asyncHandler(async(req,res)=>{
    let {id}= req.params
    let finduser= await USER_SCHEMA.findById(id)
   if(!finduser){
    throw new Error ("no user found")
   }
   let updateUser= await USER_SCHEMA.findByIdAndUpdate(id,req.body,{new:true})
   res.status(201).json({
    messsage:"update successfully",
    updateUser
   })
})

//!delete user details
exports.deleteUser= asyncHandler(async(req,res)=>{
    let {id}= req.params
    let findUser= await USER_SCHEMA.findById(id)
   if(!findUser){
    throw new Error ("no user found")
   }
   let deleteUser= await USER_SCHEMA.findByIdAndDelete(id)
   res.status(200).json({
    messsage:"delete successfully",
    deleteUser
   })
})

//!====================login user==================================

exports.loginUser= asyncHandler(async(req,res)=>{
    let{email,password}= req.body
    let findUser= await USER_SCHEMA.findOne({email:email})
    if(!findUser){
        throw new Error("user not found")
    }
    let isMatch= await findUser.matchPassword(password);
    if(!isMatch) throw new Error("Password did not match")

        if(isMatch){
            // res.status(200).json({
            //     message:"user logged in successfully"
            // })
            sendToken(findUser,200,res)
        }
});

const sendToken= (user,statusCode,res)=>{

    //!generate token
    const token= user.getToken();
    const options={             
        expiresIn:"1d",
        httpOnly:true,
    }

    res.status(statusCode).cookie("token",token,options).json({success:true,token})
}

