const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user.models');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const Web3 = require('web3');
const { use } = require('../routes/user.route');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

const userInfo = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ _id: req.params.uid });
  } catch (err) {
    const error = new HttpError('존재하지 않는 사용자입니다', 500);
    return next(error);
  }

  delete Object.entries(user)[2][1].password;
  delete Object.entries(user)[2][1]._id;

  res.status(200).json(user);
};

const accountInfo = async (req, res, next) => {
  let account;
  try {
    account = await User.findOne({ account: req.query.a });
  } catch (err) {
    const error = new HttpError('존재하지 않는 계정입니다', 500);
    return next(error);
  }

  delete Object.entries(account)[2][1].password;
  delete Object.entries(account)[2][1]._id;

  res.status(200).json(account);
};

const join = async (req, res, next) => {
  const { name, email, password, address, sendOrder, takeOrder } = req.body;

  // 이미 존재하는 name 검사
  let existingName;
  try {
    existingName = await User.findOne({ name });
  } catch (err) {
    const error = new HttpError('다시 시도해주세요', 500);
    return next(error);
  }

  if (existingName) {
    const error = new HttpError('동일한 회원이 존재합니다', 422);
    return next(error);
  }

  // 이미 존재하는 email 검사
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('다시 시도해주세요', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('동일한 회원이 존재합니다', 422);
    return next(error);
  }

  // 비밀번호 해싱
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 8); // 해싱할 값, 솔트 값
  } catch (err) {
    const error = new HttpError('다시 시도해주세요', 500);
    return next(error);
  }

  const userData = {
    name,
    email,
    password: hashedPassword, // 해싱값
    account: '',
    gas_amount: '0',
    address,
    sendOrder, // 주문을 할 수 있는 계정 (상위 계정)
    takeOrder // 물건을 보낼 수 있는 계정 (하위 계정)
  };

  const new_account = await web3.eth.accounts.create();
  const new_address = new_account.address;
  const privateKey = new_account.privateKey;
  userData.account = new_address;
  console.log(privateKey);

  const newUser = new User(userData);
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError('다시 시도해주세요', 500);
    return next(error);
  }

  // newUser가 성공적으로 save 되었을 경우, JWT 발급
  if (newUser != null) {
    delete userData.password; // 패스워드 제외
    let accessToken;
    let refreshToken;
    try {
      accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, {
        expiresIn: '1h'
      });
      refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, {
        expiresIn: '1h'
      });
      res.cookie('refreshToken', refreshToken);
    } catch (err) {
      const error = new HttpError('다시 시도해주세요', 500);
      return next(error);
    }
  }
  userData.privateKey = privateKey;

  res.status(201).json({
    name: newUser.name,
    account: newUser.account,
    address: newUser.address,
    sendOrder: newUser.sendOrder,
    takeOrder: newUser.takeOrder
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    console.log(existingUser);
  } catch (err) {
    const error = new HttpError('다시 시도해주세요', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('정보를 다시 확인해주세요', 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password); // 해싱값 비교
  } catch (err) {
    const error = new HttpError('비밀번호를 확인해주세요', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('정보를 다시 확인해주세요', 403);
    return next(error);
  }

  if (existingUser != null) {
    delete Object.entries(existingUser)[2][1].password;

    let accessToken;
    let refreshToken;
    try {
      accessToken = jwt.sign({ existingUser }, process.env.ACCESS_SECRET, {
        expiresIn: '1h'
      });
      refreshToken = jwt.sign({ existingUser }, process.env.REFRESH_SECRET, {
        expiresIn: '1h'
      });
      console.log(refreshToken);
      res.cookie('refreshToken', refreshToken);
    } catch (err) {
      console.log(err);
      const error = new HttpError('접근에 실패했습니다', 500);
      return next(error);
    }
  }

  // 사용자 정보 반환
  let user;
  try {
    // 몽구스를 통해 사용자 정보를 반환하되, email과 name, account, uid, sendOrder, takeOrder만 보이게 합니다.
    user = await User.findOne(
      { email },
      'email name account uid address sendOrder takeOrder'
    );
  } catch (err) {
    const error = new HttpError('접근에 실패했습니다', 500);
    return next(error);
  }

  res.status(201).json({
    message: '환영합니다',
    user
  });
};

const addAccount = async (req, res, next) => {
  const { sendOrder, takeOrder } = req.body;
  let getUser;
  try {
    getUser = await User.updateOne(
      { _id: req.params.uid },
      { $push: { sendOrder, takeOrder } }
    );
  } catch (err) {
    const error = new HttpError('다시 시도해주세요', 500);
    return next(error);
  }
  res.status(200).json(getUser);
};

module.exports = {
  userInfo,
  join,
  login,
  addAccount,
  accountInfo
};
