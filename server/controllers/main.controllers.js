const HttpError = require("../models/http-error");
const User = require("../models/user.models");

// 렌더링 페이지
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const main = async (req, res) => {};

const faucet = async (req, res, next) => {
  // accessToken 검증
  if (req.headers.cookie) {
    // header에 token정보가 있다면
    const token = req.headers.cookie.split("=");
    jwt.verify(token[1], process.env.ACCESS_SECRET, async (err, decoded) => {
      if (err) {
        const error = new HttpError("잘못된 인증 입니다", 404);
        return next(error);
      } else {
        const signedTx = await web3.eth.accounts.signTransaction(
          {
            to: decoded.existingUser.account,
            value: web3.utils.toWei("0.1", "ether"),
            gas: "21000",
          },
          // 로컬이라 각 가나슈 두번째 계정 PK 를 env에 넣어주시면 됩니다
          "0x" + process.env.FAUCET_PRIVATE_KEY
        );
        // 서명한 트랜잭션 전송
        await web3.eth
          .sendSignedTransaction(signedTx.rawTransaction)
          .then((receipt) => {
            console.log(receipt);
          })
          .catch((error) => {
            console.log(error);
          });
        // 잔액 확인
        const faucetBalance = await web3.eth.getBalance(
          decoded.existingUser.account
        );
        const faucetBalance_gas = await web3.utils.fromWei(
          faucetBalance,
          "ether"
        );

        // DB에 잔액 업데이트
        await User.updateOne(
          {
            account: decoded.existingUser.account,
          },
          {
            gas_amount: Number(faucetBalance_gas).toFixed(4),
          }
        );
      }
    });
  }
};

module.exports = { main, faucet };
