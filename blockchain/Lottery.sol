// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Token.sol";

contract Lottery {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    mapping (uint => address payable) public lotteryHistory;
    Token public lotteryToken;

    constructor() {
        owner = msg.sender;
        lotteryId = 1;
        lotteryToken = Token(0x72e7E0297c32ea726766a78B1a0Fc0C238C04492);
    }

    function getRandomNumber() internal view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function payEnter(uint amount) public payable {
        lotteryToken.approve(msg.sender, address(this), amount);
        lotteryToken.transferFrom(msg.sender, address(this), amount);
    }

    function enter() public payable minimalBallance {
        payEnter(1);
        players.push(payable(msg.sender));
    }

    function payForWinner(address winner) public payable onlyOwner {
        lotteryToken.transfer(winner, getBalance());
    }

    function pickWinner() public payable onlyOwner {
        uint index = getRandomNumber() % players.length;
        // transfer into winner account balance of current smart contract
        payForWinner(players[index]);

        // add the winner into history
        lotteryHistory[lotteryId] = players[index];

        // reset players
        players = new address payable[](0);
        lotteryId++;
    }

    function getBalance() public view returns (uint) {
        return lotteryToken.balanceOf(address(this));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getWinnerInLotteryHistory(uint lotteryNum) public view returns (address payable){
        return lotteryHistory[lotteryNum];
    }

    modifier minimalBallance() {
      uint lotteryTokenBallance = lotteryToken.balanceOf(msg.sender);
      require(lotteryTokenBallance > 0, "You dont have enough coins to participate in the lottery");
      _;
    }

    modifier onlyOwner() {
      require(msg.sender == owner, "Only the owner can perform this operation");
      _;
    }
}