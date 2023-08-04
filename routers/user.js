import express from "express";
import {
  register,
  login,
  myProfile,
  getMyPost,
  getUserPosts,
  getUserProfile,
  getAllUsers,
  rsvp,
  
} from "../controllers/user.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/rsvp", rsvp);

router.post("/login", login);

router.get("/me", isAuthenticatedUser, myProfile);

router.get("/my/posts", isAuthenticatedUser , getMyPost);

router.get("/userposts/:id", isAuthenticatedUser, getUserPosts);

router.get("/users/:id", isAuthenticatedUser , getUserProfile);

router.get("/users", isAuthenticatedUser , getAllUsers);


export default router;