import React from 'react';
import { ReactComponent as SouthKorea } from '../assets/svg/south-korea2.svg';
import ReactToolTip from 'react-tooltip';
import Box from '@mui/material/Box';

// web3
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // 가나슈와 연동(로컬)

// contract
const shepherdAbi = require('../assets/shepherdabi');
const contractHx = process.env.REACT_APP_SHEPHERD_CONTRACT_HX; // 고정
const contract = new web3.eth.Contract(shepherdAbi, contractHx);

const onMouseHover = async (e) => {
  // 영문으로 된 시도명을 한글로 변경
  const areaName = e.target.id;

  const pathId = document.getElementById(e.target.id);

  const entries = Object.entries(pathId);
  const findWallet = '0x' + entries[1][1].wallet;
  console.log(findWallet);

  const findBalanceZ = await contract.methods.balanceOf(findWallet, 0).call();
  const findBalanceX = await contract.methods.balanceOf(findWallet, 1).call();
  console.log(findBalanceZ);
  console.log(findBalanceX);
  // console.log(pathId[1].wallet);
  // data-html을 true로 설정해야 data-tip에서 html 태그를 적용할 수 있음
  pathId?.setAttribute('data-html', 'true');
  // 툴팁에 표시될 내용
  pathId?.setAttribute('data-tip',
    `<h3>${areaName}</h3>
    발주 Token ${findBalanceZ}<br/>
    수주 Token ${findBalanceX}<br/>
    <h5>"${findWallet}"</h5>
    `);
  // 해당 속성을 부여해야 새로고침 시에도 툴팁이 정상적으로 작동됨
  pathId?.setAttribute('onLoad', ReactToolTip.rebuild());
};

const Map = () => {
  return (
    <Box
      sx={(theme) => {
        return {
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
          paddingTop: '3em',
          paddingBottom: '6em',
          maxWidth: theme.breakpoints.values.md
        };
      }}
    >
      <SouthKorea
        className='map'
        onMouseOver={onMouseHover}
      />

    </Box>
  );
};

export default Map;
