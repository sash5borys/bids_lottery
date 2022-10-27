// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;

    constructor(uint256 initialSupply) public ERC20("Token", "TKN") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function approve(address owner, address spender, uint256 amount) public virtual returns (bool) {
        _approve(owner, spender, amount);
        return true;
    }
}