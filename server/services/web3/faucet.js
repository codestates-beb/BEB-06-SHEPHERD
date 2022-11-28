
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // 가나슈와 연동(로컬)
require("dotenv").config();

const faucet = async (new_address) => {

    const faucetAddress = process.env.FAUCET_ADDRESS;
    const faucetPK = process.env.FAUCET_PK;
  
    const tx = {
      from: faucetAddress,
      to: new_address,
      gas: 2000000,
      value: web3.utils.toWei("0.1", "ether"),
    };
    const signedTx = web3.eth.accounts.signTransaction(tx, faucetPK)
      .then((signedTx) => {
        const sendPromise = web3.eth.sendSignedTransaction(signedTx.rawTransaction, 
            async (err, res) => {
            if (err) {
              console.log("transaction fail:", err);
            } else {
              const balance = await web3.eth.getBalance(new_address);
              console.log(`transfer to user: ${new_address} || 0.1 ETH`);
              console.log(`balance: ${balance}`)
            };
          })
      });
      res.send(`0.1 eth sent: ${new_address}`);
  };
  
  module.exports = faucet;