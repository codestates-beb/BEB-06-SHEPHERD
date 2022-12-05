const HttpError = require("../models/http-error");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const shepherdAbi = require('../../contract/abi/shepherdabi');
const contractHx = "0x83BeE91BcfE9a8CE765EA47Be9F33f80B38de487"; // 고정
const contract = new web3.eth.Contract(shepherdAbi, contractHx);

const walletId = [
  {id: 'Busan', wallet: '0x3400b8B75d6190436470dbD28384930AF57306c6'},
  {id: 'DaeJeon', wallet: '0xeeE73652cFBd8Fb93Dcb5837c9651aBE3023c3Af'},
  {id: 'ICheon', wallet: '0xE825E43CB0eF2992eb9ec46a99DA676e1B916a9c'},
  {id: 'Gangneung', wallet: '0xc18e01A3414E8A73AB6fFF23B7d2125f90dcCe44'},
  {id: 'Daegu', wallet: '0xE572C6770F5754230D6687867BA04Ce9015eA010'},
  {id: 'GwangJu', wallet: '0xA6f80Ac2Bc36eF0629b2807bbc31E8e8c0a8B08F'},
  {id: 'CheonAn', wallet: '0x47a008BC326E277C1fABB3bd0c95bE5Ca9718Dc9'},
  {id: 'PyeongTaek', wallet: '0xCa278bb1900Cb4B28F7fe4D02b7B2fDE6313Baf6'},
  {id: 'Seoul', wallet: '0x2310Dd5289B213daD085C9D63fa4cda7993b5475'},
  {id: 'Incheon', wallet: '0x09A9bD56A993be517840f543936B6780E691Aeaf'},
  {id: 'ChungJu', wallet: '0xE5d998e62B2C9091BCF73dDdEC5757F13208E7A9'},
  {id: 'Inje', wallet: '0x33EA2dC389850F4F84aa060dD5413Bd61Fa1eEB8'},
  {id: 'Ulsan', wallet: '0x12d6ca24fD1dCceBF0cCA2cdb442666c16Bf30eC'},
  {id: 'Jeju', wallet: '0x9654A5729d26A5ED6EcE4c9B50BB982AbC7745cE'},
  {id: 'Posco', wallet: '0x71dF357E40f65E5910E8F648E295F30F309c0Ed6'},
  {id: 'AnDong', wallet: '0x214f556250dBf5b0f381Cb5fd855fD43cFAeFF83'},
  {id: 'Jinju', wallet: '0x11fced3B9261593055E3d7c1A3561592b5b4fF02'},
  {id: 'HaeNam', wallet: '0xbe6bC9cDF8E318058d8893BCB33AbF153B2F2f29'}
];

const wallet = {
  "Busan" : "0x3400b8B75d6190436470dbD28384930AF57306c6",
  "DaeJeon" : "0xeeE73652cFBd8Fb93Dcb5837c9651aBE3023c3Af",
  "ICheon" : "0xE825E43CB0eF2992eb9ec46a99DA676e1B916a9c",
  "Gangneung" : "0xc18e01A3414E8A73AB6fFF23B7d2125f90dcCe44",
  "Daegu" : "0xE572C6770F5754230D6687867BA04Ce9015eA010",
  "GwangJu" : "0xA6f80Ac2Bc36eF0629b2807bbc31E8e8c0a8B08F",
  "CheonAn" : "0x47a008BC326E277C1fABB3bd0c95bE5Ca9718Dc9",
  "PyeongTaek" : "0xCa278bb1900Cb4B28F7fe4D02b7B2fDE6313Baf6",
  "Seoul" : "0x2310Dd5289B213daD085C9D63fa4cda7993b5475",
  "Incheon" : "0x09A9bD56A993be517840f543936B6780E691Aeaf",
  "ChungJu" : "0xE5d998e62B2C9091BCF73dDdEC5757F13208E7A9",
  "Inje" : "0x33EA2dC389850F4F84aa060dD5413Bd61Fa1eEB8",
  "Ulsan" : "0x12d6ca24fD1dCceBF0cCA2cdb442666c16Bf30eC",
  "Jeju" : "0x9654A5729d26A5ED6EcE4c9B50BB982AbC7745cE",
  "Posco" : "0x71dF357E40f65E5910E8F648E295F30F309c0Ed6",
  "AnDong" : "0x214f556250dBf5b0f381Cb5fd855fD43cFAeFF83",
  "Jinju" : "0x11fced3B9261593055E3d7c1A3561592b5b4fF02",
  "HaeNam" : "0xbe6bC9cDF8E318058d8893BCB33AbF153B2F2f29"
};

const mapBalance = async (req, res, next) => {
  
};

module.exports = mapBalance;