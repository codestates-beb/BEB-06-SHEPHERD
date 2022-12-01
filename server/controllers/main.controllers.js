const HttpError = require("../models/http-error");
const User = require("../models/user.models");

// 렌더링 페이지
require("dotenv").config();

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const main = async (req, res) => {};

const faucet = async (req, res, next) => {
  console.log(req.userData);
  if (req.params.account === req.userData.userAccount) {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: req.userData.userAccount,
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
    const faucetBalance = await web3.eth.getBalance(req.userData.userAccount);
    const faucetBalance_gas = await web3.utils.fromWei(faucetBalance, "ether");

    // DB에 잔액 업데이트
    await User.updateOne(
      {
        account: req.userData.userAccount,
      },
      {
        gas_amount: Number(faucetBalance_gas).toFixed(4),
      }
    );
    res.status(200).json({ message: "지급완료" });
  } else {
    const error = new HttpError("올바른 접근이 아닙니다", 403);
    return next(error);
  }
};

module.exports = { main, faucet };
