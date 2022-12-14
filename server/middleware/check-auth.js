const jwt = require('jsonwebtoken');
require('dotenv').config();

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // cookie가 있는지 확인해서 없으면 패스
    if (req.cookies) {
      const cookies = req.cookies;
      const token = cookies.token;

      if (token) {
        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
        req.userData = {
          userId: decodedToken.existingUser._id,
          userAccount: decodedToken.existingUser.account
        };
      }
    }
    next();
  } catch (err) {
    let error;
    // Token Expired Error에 한해서 다음으로 그냥 넘어갑니다.
    switch (err.name) {
      case 'TokenExpiredError' :
        next();
        break;
      default:
        error = new HttpError('인증에 실패했습니다', 403);
        return next(error);
    }
  }
};
