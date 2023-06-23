import app from "./app.js";
import dotenv from "dotenv";
import Database from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";


// configure environment variable path --devlopement mode
dotenv.config({ path: "./config/config.env" });

// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`closing server due to uncaught exception!`);
  
    process.exit(1);
});
  
// Database Connection
Database();
  
// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
// listening to PORT
app.listen(process.env.PORT, () => {
    console.log(`Listenting on port ${process.env.PORT}`);
});
  

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`closing server due to unhandled error!`);
    server.close(() => {
      process.exit(1);
  });
});
