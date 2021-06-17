const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  //Log for the developer
  console.log(err);

  let error = { ...err };

  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message =
      "Email is already registered, try logging in or reset password";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => {
      if (val.message.includes("password")) {
        let msg = `Password ${val.message.split(")")[1]})`;
        return msg;
      }
      return val.message;
    });
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
