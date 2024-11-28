const express= require("express")
const { connectDB } = require("./config/database")
const { PORT } = require("./config")
const userRouter= require("./router/userRouter")
const postRouter= require("./router/postRouter")

const {error} =require("./middleware/error")
const { authenticate } = require("./middleware/auth")


const app= express()
app.use(express.json())

connectDB()

app.use("/user" ,userRouter)
app.use("/post",authenticate,postRouter)

app.use(error)


app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`server running at port ${PORT}`);

})