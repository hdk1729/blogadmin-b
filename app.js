import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import  morgan from 'morgan';
import postRouter from "./routers/post.js";
import cors from 'cors';

import bodyParser from "body-parser";
const app = express();


dotenv.config();


mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


//var postRouter =require("./routers/post");


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000"}));

app.use("/api/post",postRouter);
app.use((err,req,res,next) => {
     res.status(500).json({ error: err.message });
});
//listen on port 8000
var PORT =process.env.PORT ;
app.listen(PORT,  ()  =>{
    connect()
    console.log("port is listening on " +PORT);
});
