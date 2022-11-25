const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error");
const User = require("../models/user.models");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // 가나슈와 연동(로컬)

const userInfo = async (req, res) => {};

const join = async (req, res, next) => {
  const { name, email, password, address, sendOrder, takeOrder } = req.body;

  // 이미 존재하는 name 검사
  let existingName;
  try {
    existingName = await User.findOne({ name });
  } catch (err) {
    const error = new HttpError("다시 시도해주세요", 500);
    return next(error);
  }

  if (existingName) {
    const error = new HttpError("동일한 회원이 존재합니다", 422);
    return next(error);
  }

  // 이미 존재하는 email 검사
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("다시 시도해주세요", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("동일한 회원이 존재합니다", 422);
    return next(error);
  }

  // 비밀번호 해싱
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 8); // 해싱할 값, 솔트 값
  } catch (err) {
    const error = new HttpError("다시 시도해주세요", 500);
    return next(error);
  }

  const userData = {
    name,
    email,
    password: hashedPassword, // 해싱값
    account: "",
    address,
    sendOrder,
    takeOrder,
  };

  const new_account = await web3.eth.accounts.create();
  const new_address = new_account.address;
  const privateKey = new_account.privateKey;
  userData.account = new_address;

  const newUser = new User(userData);

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("다시 시도해주세요", 500);
    return next(error);
  }

  // newUser가 성공적으로 save 되었을 경우, JWT 발급
  if (newUser != null) {
    delete userData.password; // 패스워드 제외
    let accessToken;
    let refreshToken;
    try {
      accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, {
        expiresIn: "1h",
      });
      refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("refreshToken", refreshToken);
    } catch (err) {
      const error = new HttpError("다시 시도해주세요", 500);
      return next(error);
    }
  }

  userData["privateKey"] = privateKey;
  console.log(userData);

  res.status(201).json({
    "환영합니다!": newUser.name,
    "거래 계정": newUser.account,
    주소: newUser.address,
    "발주처 계정": newUser.sendOrder,
    "수주처 계정": newUser.takeOrder,
  });
};

const login = async (req, res) => {};

const sendOrder = async (req, res) => {};

module.exports = {
  userInfo,
  join,
  login,
  sendOrder,
};
