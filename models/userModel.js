const mongoose= require("mongoose")
const bcrypt= require("bcrypt")
const jwt  = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")


const userSchema= mongoose.Schema(
    {
        name:{ type:String, required:true, trim:true},

        password:{
            type:String,
            required:true,
            trim:true

        },
        email:{
            type:String,
            required:true, 
            trim:true,
            unique:true

        },
        phoneNo:{
            type:Number,
            unique:true,
            required:true


        },
        role:{
            type:String,
            enum:["user","admin"],
            required:true
        } 
        

        },
       { timestamps:true}
)
//prehook and post hook
userSchema.pre("save",async function(){
    let salt= await bcrypt.genSalt(10) //random string generate 
    this.password= await bcrypt.hash(this.password,salt)
})

//!match password

userSchema.methods.matchPassword= async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password) //compaire the password
}

userSchema.methods.getToken= function(){
     return jwt.sign({id:this._id},JWT_SECRET,{expiresIn:"1d"})
}

module.exports= mongoose.model("User",userSchema)
