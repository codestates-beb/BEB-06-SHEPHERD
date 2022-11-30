const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    if (!token) {
      throw new Error("인증에 실패했습니다");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
    req.userData = {
      userId: decodedToken.existingUser._id,
      userAccount: decodedToken.existingUser.account,
    };
    next();
  } catch (err) {
    const error = new HttpError("인증에 실패했습니다", 403);
    return next(error);
  }
};
