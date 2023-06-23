import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb error
  if (err.name === "CastError") {
    const message = `Mongo DB Error: Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const existKey = Object.keys(err.keyValue)[0].split(".")[0];
    const message = `Already Exists ${existKey}`;
    err = new ErrorHandler(message, 400);
  }

  console.log(err);
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
