const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//@desc Register User
//@route POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Create User
  const user = await User.create({
    email,
    password,
  });

  const token = user.getSignedJwtToken();

  user.password = undefined;

  res.status(200).json({
    success: true,
    data: user,
    token,
  });
});

//@desc Login user
//@route POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatched = await user.matchPassword(password);

  if (!isMatched) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
