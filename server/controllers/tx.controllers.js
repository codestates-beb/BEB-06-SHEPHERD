// const HttpError = require("../models/http-error");
// const Order = require("../models/order.models");
// const shepherdAbi = require("../../contract/abi/shepherdabi");
// const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // 가나슈와 연동(로컬)

// const contractHx = process.env.SHEPHERD_CONTRACT_HX; // 고정
// const contract = new web3.eth.Contract(shepherdAbi, contractHx);
// const serverAddr = process.env.SERVER_ADDRESS; // abi : 복사해서 그대로 // 고정
// const accounts = await web3.eth.getAccounts();

// // https://ethereum.stackexchange.com/questions/95218/how-can-i-transfer-tokens-of-my-erc20-automatically-from-the-server

// const sendTransaction = async (to, amount) => {
//   var transactionData = contract.methods
//     .safeTransferFrom(from, to, id, amount, data)
//     .encodeABI(); //Create the data for token transaction.
//   var rawTransaction = {
//     from: serverAddr,
//     to: contractHx,
//     gas: 100000,
//     data: transactionData,
//   };

//   web3.eth.accounts
//     .signTransaction(rawTransaction, process.env.SERVER_PK)
//     .then((signedTx) =>
//       web3.eth.sendSignedTransaction(signedTx.rawTransaction)
//     );
//   //.then(function(receipt){ console.log("Transaction receipt: ", receipt); getETHBalanceOf();  })
// };

// const sendZ = async (req, res) => {
//   const txSendZ = {};
//   const transactionData = contract.methods
//     .safeTransferFrom(from, to, id, amount, data)
//     .encodeABI(); //Create the data for token transaction.
//   const rawTransaction = {
//     from: serverAddr,
//     to: contractHx,
//     gas: 100000,
//     data: transactionData,
//   };

//   web3.eth.accounts
//     .signTransaction(rawTransaction, process.env.SERVER_PK)
//     .then((signedTx) =>
//       web3.eth.sendSignedTransaction(signedTx.rawTransaction)
//     );
//   //.then(function(receipt){ console.log("Transaction receipt: ", receipt); getETHBalanceOf();  })
// };

// const sendX = async (req, res) => {};

// const takeZ = async (req, res) => {};

// const takeX = async (req, res) => {};

// module.exports = {
//   sendZ,
//   sendX,
//   takeZ,
//   takeX,
// };
