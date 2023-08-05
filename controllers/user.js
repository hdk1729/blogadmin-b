import User from "../models/user.js";
import Post from "../models/post.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import ApiFeatures from "../utils/apifeatures.js";
import cookie from "cookie";
import sendToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import RSVP from "../models/rsvp.js";

//RSVP
import geoip from 'geoip-lite';

export const rsvp = async (req, res) => {
  try {
    const { isjoining } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown';

    const rsvp = new RSVP({
      isjoining,
      location,
      ip,
    });

    await rsvp.save();
    res.status(201).json({ message: 'RSVP successfully submitted.' });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ message: 'Error submitting RSVP.' });
  }
};


//Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });
    
    if (user) return next(new ErrorHandler("User Already Exist", 400));

    user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
        return next(new ErrorHandler("Something went wrong!", 400));
    }
    sendToken(user, 201, "User Registered Successfully", res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!req.body) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts");

    if (!user) {
      return next(new ErrorHandler(`User is not registered`, 401));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    sendToken(user, 201, "Login Successfully", res);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//My Profile
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//Get All Users
export const getAllUsers = async (req, res) => {
  const apiFeatures = new ApiFeatures(User.find(), req.query).search().filter();
  try {
    const users = await apiFeatures.query;

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//Get My Posts
export const getMyPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Get User Posts
export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      if (user.setPublic && post.publicPost) {
        posts.push(post);
      }
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

