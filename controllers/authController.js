const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
// const decodeToken = require("../utils/decodeToken");
const secondInWeek = 604800;

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondInWeek * 4 * 1000,
    });

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
    });
  } else {
    res
      .status("401")
      .json({ status: "fail", message: "Email or password is not correct." });
  }
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);
  if (newUser) {
    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondInWeek * 4 * 1000,
    });

    res.status("201").json({
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      image: newUser.image,
      phone: newUser.phone,
      gender: newUser.gender,
    });
  } else {
    res.status("401").json({ status: "fail", message: "Something went wrong" });
  }
  next();
});
