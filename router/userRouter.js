const {Router}= require("express")
const { addUser,fetchAllUsers, fetchOne, updateUser, deleteUser, loginUser } = require("../controller/userController")
const { authenticate } = require("../middleware/auth")

const router= Router()

router.post("/add",addUser)
router.get("/find",fetchAllUsers)
router.get("/one/:id",fetchOne)
router.patch("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)
router.post("/login",loginUser)






module.exports= router;