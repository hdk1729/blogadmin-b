//const router  =require('express').Router();
//const { createPost} =require("../controllers/post");
//router.post("/create", createPost);


//module .exports=router;
import {createPost} from "../controllers/post.js";
import express from "express";
import multer from "../middleware/multer.js";
import {postValidator,validate} from "../middleware/postValidator.js"

const router = express.Router();
router.post("/create", multer.single("thumbnail"),
(req,res,next)=>{
    const {tags} =req.body;
    if(tags) req.body.tags =JSON.parse(tags);
    next();

},
postValidator,validate ,createPost);
/*router.get('/', function(req, res) {
    req.files

}*/

export default router;