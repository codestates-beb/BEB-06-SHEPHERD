// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC165.sol"


event TransferSingle
(address indexed _from, address indexed _to, uint256 _id, uint256 _value);
event TransferBatch
(address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);

function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external;
function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external;
function balanceOf(address _owner, uint256 _id) external view returns (uint256);


contract Shepherd is ERC1155 {
    uint256 public constant sendSteel = 0;
    uint256 public constant takeSteel = 1;

    constructor() public ERC1155("") {
        _mint(msg.sender, sendSteel, 10**30, "");
        _mint(msg.sender, takeSteel, 10**30, "");
    }
    
    function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external {

        require(_to != address(0x0), "_to must be non-zero.");

        emit TransferSingle( _from, _to, _id, _value);

    }

    function safeBatchTransferFrom(
        address _from, 
        address _to, 
        uint256[] calldata _ids, 
        uint256[] calldata _values, 
        bytes calldata _data
        ) external {
        require(_to != address(0x0), "destination address must be non-zero.");
        require(_ids.length == _values.length, "_ids and _values array length must match.");

        emit TransferBatch(_from, _to, _ids, _values);
    }
    function balanceOf(address _owner, uint256 _id) external view returns (uint256) {
       
        return balances[_id][_owner];
    }
}
