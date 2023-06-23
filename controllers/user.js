import User from "../models/user.js";
import Post from "../models/post.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import sendToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";



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


