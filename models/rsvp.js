import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
    isjoining:{
        type: Boolean,
        required: true
    },
    location: {
        type: String,
        default: 'Unknown',
    },
    ip: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Rsvp", rsvpSchema, "Rsvps");