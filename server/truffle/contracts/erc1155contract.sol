// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


contract SteelTracker is ERC1155 {
    uint256 public constant sendSteel = 0;
    uint256 public constant takeSteel = 1;


    constructor() public ERC1155() {
        _mint(msg.sender, sendSteel, 10**30, "");
        _mint(msg.sender, takeSteel, 10**30, "");
    }
};