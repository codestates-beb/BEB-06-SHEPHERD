import React from "react";
import { ReactComponent as SouthKorea } from "../assets/svg/south-korea2.svg";
import ReactToolTip from "react-tooltip";
import axios from "axios";

// web3
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // 가나슈와 연동(로컬)

// contract
const shepherdAbi = require("../assets/shepherdabi");
const contractHx = "0x79BdE0696800Ee731dE85d19cCB373514CC23325"; // 고정
const contract = new web3.eth.Contract(shepherdAbi, contractHx);

// useEffect
//
// const balanceAxios = axios.post('http://127.0.0.1:3001/tx/getTokenBalance', findWallet )

const onMouseHover = async (e) => {
  // 영문으로 된 시도명을 한글로 변경
  const areaName = e.target.id;

  const pathId = document.getElementById(e.target.id);

  const entries = Object.entries(pathId);
  const findWallet = "0x" + entries[1][1].wallet;
  console.log(findWallet);

  const findBalanceZ = await contract.methods.balanceOf(findWallet, 0).call();
  const findBalanceX = await contract.methods.balanceOf(findWallet, 1).call();
  console.log(findBalanceZ);
  console.log(findBalanceX);
  //console.log(pathId[1].wallet);
  // data-html을 true로 설정해야 data-tip에서 html 태그를 적용할 수 있음
  pathId?.setAttribute("data-html", "true");
  // 툴팁에 표시될 내용
  pathId?.setAttribute(
    "data-tip",
    `<h3>${areaName}</h3>
    Z Token ${findBalanceZ}<br/>
    X Token ${findBalanceX}<br/>
    <h5>"${findWallet}"</h5>
    `
  );
  // 해당 속성을 부여해야 새로고침 시에도 툴팁이 정상적으로 작동됨
  pathId?.setAttribute("onLoad", ReactToolTip.rebuild());
};

const Map = () => {
  return (
    <div className="job-status" marginBottom="20px" title="SouthKorea">
      <SouthKorea className="map" onMouseOver={onMouseHover}></SouthKorea>
    </div>
  );
};

export default Map;
