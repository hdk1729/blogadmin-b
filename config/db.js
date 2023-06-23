import mongoose from "mongoose";

const Database = ()=>{
    // connecting to mongodb
    mongoose.connect(process.env.MONGO).then((data)=>{
        console.log(`MongoDB Connected Successfully`);
    }).catch((error)=>{
        console.log(error);
    });
}

export default Database;