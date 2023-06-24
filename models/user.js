import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Required: Please enter your password"],
        minLength: [6, "minimum length is 6"],
        validate: [validator.isStrongPassword, "Password Must be strong"],
    },
    avatar: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
    ],
    role: {
        type: String,
        default: "User",
    },
    joinedOn: {
        type: Date,
        default: Date.now,
      },
      jwt_login_token: String,
      resetPasswordToken: String,
      resetPasswordExpire: Date,
});


// Hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN method
userSchema.methods.getJWTToken = function () {
    const login_token = JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  
    //console.log(login_token);
  
    this.jwt_login_token = login_token;
  
    return login_token;
};


// Compare password for login
userSchema.methods.comparePassword = async function (enteredPasssword) {
    return bcrypt.compare(enteredPasssword, this.password);
};


//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};


export default mongoose.model("User", userSchema, "Users");