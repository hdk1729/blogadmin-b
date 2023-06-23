import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    //Note:  getting JWT Token from user's cookies
    const token = req.headers["blog_token"];

    //console.log(token);

    //Note:  throw error if no cookies found in user's cookies storage
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource.", 401));
    }

    const checkToken = await User.findOne({ jwt_login_token: token });
    //console.log(checkToken);

    if (checkToken === null) {
      return next(new ErrorHandler("Invalid Token", 404));
    }

    //Note:  Verifying the JWT Token Stored in user's cookies and getting the payload object
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //Note:  setting req.user Object to the authenticated user
    req.user = await User.findById(payload.userId);

    //Note:  next middleware
    next();
  } catch (error) {
      res.status(500).json({
        message: error.message,
      });
  }
};