const HttpError = require('../models/http-error');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
// web3
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // 가나슈와 연동(로컬)

// contract
const shepherdAbi = require('../../contract/abi/shepherdabi');
const contractHx = process.env.SHEPHERD_CONTRACT_HX; // 고정
const contract = new web3.eth.Contract(shepherdAbi, contractHx);
const serverAddr = process.env.SERVER_ADDRESS; // abi : 복사해서 그대로 // 고정
const pohangAddr = process.env.POHANG_ADDRESS;
const pohangPk = process.env.POHANG_PK;

const sendZ = async (req, res, next) => {
  const { orderAmount, sendSupplier, userKey } = req.body;
  const userAccount = req.userData.userAccount;
  // 요청한 코인 수량 만큼 서버에서 사용자 sendOrder 로 Z토큰 전송
  // DB query sendOrderAddress
  const sendOrderAddress = await User.findOne({ sendOrder: sendSupplier, account: userAccount });
  console.log(sendOrderAddress);

  if (sendSupplier == sendOrderAddress.sendOrder) {
    const transactionDataSU = contract.methods.safeTransferFrom(
      pohangAddr,
      userAccount,
      0,
      orderAmount,
      0x00).encodeABI(); // Create the data for token transaction.

    const rawTransactionSU = {
      to: contractHx,
      gas: 100000,
      data: transactionDataSU
    };

    const signedTxSU = await web3.eth.accounts
      .signTransaction(rawTransactionSU, '0x' + pohangPk);

    await web3.eth
      .sendSignedTransaction(signedTxSU.rawTransaction)
      .then(function (receipt) {
        console.log('Transaction receipt: ', receipt);
      })
      .catch((error) => {
        console.log(error);
      });

    const zBalanceSU = await contract.methods.balanceOf(userAccount, 0).call();
    console.log(`Z coin sent from: ${pohangAddr} to: ${userAccount}, amount: ${zBalanceSU}`);

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
      }, '0x' + userKey);

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
    console.log(`sender balance: ${zBalanceU}, supplier balance: ${zBalanceS}`);

    res.status(200).json({ message: 'success' });
  } else {
    const error = new HttpError('올바른 접근이 아닙니다', 403);
    return next(error);
  }
};

const sendX = async (req, res, next) => {
  const { takeAmount, takeDistributor, userKey } = req.body;
  const userAccount = req.userData.userAccount;

  const takeDistributorAddress = await User.findOne({ takeOrder: takeDistributor, account: userAccount });
  console.log(takeDistributorAddress);

  if (takeDistributor == takeDistributorAddress.takeOrder) {
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
      }, userKey);

    await web3.eth.sendSignedTransaction(signedTxUD.rawTransaction)
      .then(function (receipt) {
        console.log('Transaction receipt: ', receipt);
      });
    const xBalance = await contract.methods.balanceOf(userAccount, 1).call();
    const xBalanceD = await contract.methods.balanceOf(takeDistributor, 1).call();
    console.log(`X coin sent from user:${userAccount} to distributor:${takeDistributor}`);
    console.log(`sender balance: ${xBalance}, distributor balance: ${xBalanceD}`);

    res.status(200).json({ message: 'success' });
  } else {
    const error = new HttpError('올바른 접근이 아닙니다', 403);
    return next(error);
  }
};

const sendAll = async (req, res, next) => {
  const { userAccount } = req.body;

  if (req.body.userAccount === pohandAddr) {
    const serverBalanceZ = await contract.methods.balanceOf(serverAddr, 0).call();
    const serverBalanceX = await contract.methods.balanceOf(serverAddr, 1).call();
    console.log(`Transfer Z token to Pohang :${serverAddr} amount: ${serverBalanceZ}`);
    console.log(`Transfer X token to Pohang : ${serverAddr} amount: ${serverBalanceX}`);
    if (serverBalanceX <= 0 || serverBalanceZ <= 0) {
      console.log('Server has insufficient funds');
    } else {
      const transactionDataAll = contract.methods.safeBatchTransferFrom(
        serverAddr,
        userAccount,
        [0, 1],
        [1000000000000000, 1000000000000000],
        0x00
      ).encodeABI();

      const signedTxAll = await web3.eth.accounts
        .signTransaction({
          to: contractHx,
          gas: 100000,
          data: transactionDataAll
        }, '0x' + process.env.SERVER_PK);

      await web3.eth.sendSignedTransaction(signedTxAll.rawTransaction)
        .then(function (receipt) {
          console.log('Transaction Receipt:', receipt);
        })
        .catch((error) => {
          console.log(error);
        });

      const pohangBalanceZ = await contract.methods.balanceOf(userAccount, 0).call();
      const pohangBalanceX = await contract.methods.balanceOf(userAccount, 1).call();
      console.log(`Transfer Z token to Pohang :${userAccount} amount: ${pohangBalanceZ}`);
      console.log(`Transfer X token to Pohang : ${userAccount} amount: ${pohangBalanceX}`);
    }
    res.status(200).json({ message: 'success' });
  } else {
    const error = new HttpError('올바른 접근이 아닙니다', 403);
    return next(error);
  }
};

const getTxInfo = async (req, res, next) => {
  try {
    const options = {
      filter: {
        address: ['req.userData.userAccount'] // Only get events where transfer value was 1000 or 1337
      },
      fromBlock: 3, // Number || "earliest" || "pending" || "latest"
      toBlock: 'latest'
    };

    const queryTxInfo = await contract.getPastEvents('TransferSingle', options)
      .then((results) => results
      );

    res.status(200).json({ queryTxInfo });
  } catch {
    const error = new HttpError('올바른 접근이 아닙니다', 403);
    return next(error);
  }
};

module.exports = {
  sendZ,
  sendX,
  sendAll,
  getTxInfo
};
