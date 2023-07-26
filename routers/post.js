import {createPost, likeUnlikePost, deleteComment, deletePost, updatePostDesc, commentOnPost, getallPost, getPost} from "../controllers/post.js";
import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
//import multer from "../middleware/multer.js";
//import {postValidator,validate} from "../middleware/postValidator.js"

const router = express.Router();
// router.post("/create", multer.single("thumbnail"),
// (req,res,next)=>{
//     const {tags} =req.body;
//     if(tags) req.body.tags =JSON.parse(tags);
//     next();

// },
// postValidator,validate ,createPost);
/*router.get('/', function(req, res) {
    req.files

}*/


router.post("/upload", createPost);

router.get("/like/:id", likeUnlikePost);

router.put("/:id", updatePostDesc);

router.delete("/:id", deletePost);

router.put("/comment/:id", commentOnPost);

router.delete("/comment/:id/:commentId", deleteComment);

router.get("/posts", getallPost);

router.get("/:id", getPost);



export default router;