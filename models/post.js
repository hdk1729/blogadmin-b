import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,
        trim: true
    },
    meta:{
        type: String,
        required: true,
        trim: true

    },
    tags:[String],
    authors:{
        type: String,
        default: "Admin",
        ref: 'Auth',
    },
    slug:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    thumbnail:{
        type:Object,
        url:{
            type: URL,
            
        },
        public_id:{
            type: String,
        
        },
    },
},
    {
        timestamps: true,
    },
);
export default mongoose.model("Post", postSchema);
