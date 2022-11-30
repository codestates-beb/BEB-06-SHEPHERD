const HttpError = require('../models/http-error');
const User = require('../models/user.models');
// web3
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // 가나슈와 연동(로컬)

// contract
const shepherdAbi = require('../../contract/abi/shepherdabi');
const contractHx = process.env.SHEPHERD_CONTRACT_HX; // 고정
const contract = new web3.eth.Contract(shepherdAbi, contractHx);
const serverAddr = process.env.SERVER_ADDRESS; // abi : 복사해서 그대로 // 고정
// const userPK = "0x6b699d95d86d84cc26b41888635e6fc180fc114b221db47de36f403b7db37286";
const userPK = 'abb8d7468eefa707bcf1f3e1d6783c1b51e26a44f61590c28e0dbfcd7ee020cb';

const sendZ = async (req, res, next) => {
  const { orderAmount, userAccount, sendSupplier } = req.body;
  if (req.body.userAccount === req.userData.userAccount) {
    const transactionDataSU = contract.methods.safeTransferFrom(
      serverAddr,
      userAccount,
      0,
      orderAmount,
      0x00).encodeABI(); // Create the data for token transaction.

    console.log(transactionDataSU);

    const rawTransactionSU = {
      to: contractHx,
      gas: 100000,
      data: transactionDataSU
    };

    const signedTxSU = await web3.eth.accounts
      .signTransaction(rawTransactionSU, '0x' + process.env.SERVER_PK);

    await web3.eth
      .sendSignedTransaction(signedTxSU.rawTransaction)
      .then(function (receipt) {
        console.log('Transaction receipt: ', receipt);
      })
      .catch((error) => {
        console.log(error);
      });

    const zBalanceSU = await contract.methods.balanceOf(userAccount, 0).call();
    console.log(`Z coin sent from server: ${serverAddr} to user: ${userAccount}, amount: ${zBalanceSU}`);

    // 요청한 코인 수량 만큼 서버에서 사용자 sendOrder 로 Z토큰 전송
    // DB query sendOrderAddress
    const sendOrderAddress = await User.findOne({ sendOrder: sendSupplier, account: userAccount });
    if (sendSupplier === sendOrderAddress.sendOrder) {
    // 발주 넣을 수량 Z 코인으로 전송
    // DB query
      const transactionDataUS = contract.methods.safeTransferFrom(
        userAccount,
        sendSupplier,
        0,
        orderAmount,
        0x00).encodeABI(); // Create the data for token transaction.

      const signedTxUS = await web3.eth.accounts
        .signTransaction({
          to: contractHx,
          gas: 100000,
          data: transactionDataUS
        }, '0x' + userPK);

      await web3.eth.sendSignedTransaction(signedTxUS.rawTransaction)
        .then(function (receipt) {
          console.log('Transaction receipt: ', receipt);
        })
        .catch((error) => {
          console.log(error);
        });

      const zBalanceU = await contract.methods.balanceOf(userAccount, 0).call();
      const zBalanceS = await contract.methods.balanceOf(sendSupplier, 0).call();
      console.log(`Z coin sent from user: ${userAccount} to supplier: ${sendSupplier}`);
      console.log(`user balance: ${zBalanceU}, supplier balance: ${zBalanceS}`);

      res.status(200).json({ message: 'success' });
    } else {
      const error = new HttpError('올바른 접근이 아닙니다.', 403);
      return next(error);
    }
  } else {
    const error = new HttpError('주소가 일치하지 않습니다.', 403);
    return next(error);
  }
};

const sendX = async (req, res, next) => {
  const { takeAmount, userAccount, takeDistributor } = req.body;

  const takeDistributorAddress = await User.findOne({ takeOrder: takeDistributor, account: userAccount });

  if (userAccount === req.userData.userAccount && takeDistributor === takeDistributorAddress.takeOrder) {
    const transactionDataUD = contract.methods.safeTransferFrom(
      userAccount,
      takeDistributor,
      1,
      takeAmount,
      0x00).encodeABI(); // Create the data for token transaction.

    const signedTxUD = await web3.eth.accounts
      .signTransaction({
        to: contractHx,
        gas: 100000,
        data: transactionDataUD
      }, userPK);

    await web3.eth.sendSignedTransaction(signedTxUD.rawTransaction)
      .then(function (receipt) {
        console.log('Transaction receipt: ', receipt);
      });
    const xBalance = await contract.methods.balanceOf(userAccount, 1).call();
    const xBalanceD = await contract.methods.balanceOf(takeDistributor, 1).call();
    console.log(`X coin sent from user:${userAccount} to distributor:${takeDistributor}`);
    console.log(`user balance: ${xBalance}, distributor balance: ${xBalanceD}`);

    res.status(200).json({ message: 'success' });
  } else {
    const error = new HttpError('올바른 접근이 아닙니다', 403);
    return next(error);
  }
};

module.exports = {
  sendZ,
  sendX
};
