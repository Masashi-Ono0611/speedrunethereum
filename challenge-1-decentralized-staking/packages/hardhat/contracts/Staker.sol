// SPDX-License-Identifier: MIT
pragma solidity 0.8.20; //Do not change the solidity version as it negatively impacts submission grading

import "hardhat/console.sol";
import "./ExampleExternalContract.sol";

contract Staker {
    ExampleExternalContract public exampleExternalContract;

    // Track individual balances
    mapping(address => uint256) public balances;
    
    // Threshold amount needed to trigger success
    uint256 public constant threshold = 1 ether;
    
    // Event to track stakes
    event Stake(address indexed staker, uint256 amount);

    constructor(address exampleExternalContractAddress) {
        exampleExternalContract = ExampleExternalContract(
            exampleExternalContractAddress
        );
    }

    // Payable function to collect funds and track individual balances
    function stake() public payable {
        // Update the sender's balance
        balances[msg.sender] += msg.value;
        
        // Emit the Stake event
        emit Stake(msg.sender, msg.value);
        
        // Log for debugging
        console.log("Stake received from:", msg.sender);
        console.log("Amount staked:", msg.value);
        console.log("Total balance:", address(this).balance);
    }

    // After some `deadline` allow anyone to call an `execute()` function
    // If the deadline has passed and the threshold is met, it should call `exampleExternalContract.complete{value: address(this).balance}()`

    // If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance

    // Add a `timeLeft()` view function that returns the time left before the deadline for the frontend

    // Add the `receive()` special function that receives eth and calls stake()
}
