const{Schema,model,}= require("mongoose")
const mongoose= require("mongoose")

const postSchema= mongoose.Schema(
    {
        contactNo:{
            type:Number,
            required:true
        },
        emailId:{
            type:String,
            required:true, 
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"

        }
    },
  
    {timesstamps:true}
)
module.exports= model("Post",postSchema) //in database posts collection will created