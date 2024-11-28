const{Router}= require("express");
const { addPost, fetchAll, fetchOne, updatePost, deletePost } = require("../controller/postController");
const { authenticate, isAdmin } = require("../middleware/auth");

const router= Router();
router.post("/add",isAdmin,addPost);
router.get("/all", fetchAll);
router.get("/one/:id",fetchOne);
router.patch("/update/:id",isAdmin,updatePost);
router.delete("/delete/:id",isAdmin,deletePost);




module.exports= router