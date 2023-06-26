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


router.post("/upload", isAuthenticatedUser, createPost);

router.get("/like/:id", isAuthenticatedUser, likeUnlikePost);

router.put("/:id", isAuthenticatedUser, updatePostDesc);

router.delete("/:id", isAuthenticatedUser, deletePost);

router.put("/comment/:id", isAuthenticatedUser, commentOnPost);

router.delete("/comment/:id/:commentId", isAuthenticatedUser, deleteComment);

router.get("/posts", isAuthenticatedUser, getallPost);

router.get("/:id", isAuthenticatedUser, getPost);



export default router;