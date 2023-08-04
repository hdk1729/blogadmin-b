import mongoose from "mongoose";
import validator from "validator";

const rsvpSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    isjoining:{
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Rsvp", rsvpSchema, "Rsvps");