import * as dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import ErrorMiddleware from "./middleware/error.js";
import CookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

//routes
//import postRouter from "./routers/post.js";
import userRouter from "./routers/user.js";



const app = express();

// config
dotenv.config({ path: "./config/config.env" });


// CORS
app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(CookieParser());
app.use(fileUpload());


app.use("/api/user",userRouter);



// Custom Error Middleware
app.use(ErrorMiddleware);

export default app;
