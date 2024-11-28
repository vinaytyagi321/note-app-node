const POST_SCHEMA= require("../models/PostModels")
const asyncHandler= require("express-async-handler")



exports.addPost=  asyncHandler(async(req,res)=>{
    let payLoad= req.body
    
   let addPost= await POST_SCHEMA.create(payLoad)
    res.status(201).json({
        success:true,
        message:"user successfully added",payLoad,
    })
})

exports.fetchAll= asyncHandler(async(req,res)=>{
    let posts= await POST_SCHEMA.find().populate("user")

    if(posts.length==0){
        res.status(400).json({success:false,message:"posts not found"})
    }
    res.status(200).json({success:true,message:"posts found successfully",posts})
})

exports.fetchOne= asyncHandler(async(req,res)=>{
    let {id}= req.params
    let posts= await POST_SCHEMA.findOne({_id:id}).populate("user")

    if(!posts){
        res.status(400).json({success:false,message:"post not found"})

    }
    res.status(200).json({success:true,message:"post found ",posts})
})

exports.updatePost= asyncHandler(async(req,res)=>{
    let {id}= req.params
    let posts= await POST_SCHEMA.findById(id)
    if(!posts){
        res.status(400).json({success:false,message:"post not found"})
    }
    let updatepost= await POST_SCHEMA.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json({success:true,message:"post  found",updatepost})  
})

exports.deletePost= asyncHandler(async(req,res)=>{
    let {id}= req.params
    let posts= await POST_SCHEMA.findById(id)
    if(!posts){
        res.status(400).json({success:false,message:"post not found"})
    }
    let deletepost= await POST_SCHEMA.findByIdAndDelete(id,req.body,{new:true})
    res.status(201).json({success:true,message:"post  found",deletepost})  
})