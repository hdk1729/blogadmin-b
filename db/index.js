import mongoose from 'mongoose';
mongoose
    .connect(" mongodb://127.0.0.1:27017/")
    .then(()=> console.log("db connected"))
    .catch((err)=> console.log("db connected failed:",err.message||err));