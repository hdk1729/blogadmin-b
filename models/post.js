import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true
    },
    thumbnail: {
        public_id: String,
        url: String,
    },    
    // meta:{
    //     type: String,
    //     required: true,
    //     trim: true

    // },
    tags:[String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subheading:{
        type: String,
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
            required: true,
          },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}
);
export default mongoose.model("Post", postSchema);
