//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

// This is the main building block for smart contracts.
        contract LendBorrow {
         address public tokenOwner;
         mapping(address => uint256) public tokenownerBalance;
         
         event Deposit(address indexed owner, uint256 amount, uint256 timestamp);
         event Withdraw(address indexed owner, uint256 amount, uint256 timestamp);
         event Transfer(address indexed from, address indexed to, uint256 amount, uint256 timestamp);

         constructor() {
          tokenOwner = msg.sender;
         }
 
         function deposittoken() public payable {             
          require(msg.value != 0, "You need to deposit some token!");          
          tokenownerBalance[msg.sender] += msg.value;
          emit Deposit(msg.sender, msg.value, block.timestamp);
          emit Transfer(msg.sender, address(this), msg.value, block.timestamp);
         }
 
         function withdrawtoken(address payable _to, uint256 _total) public {
        	//require(msg.sender == tokenOwner, "You must be the owner to make withdrawals");
            require(_total <= tokenownerBalance[msg.sender],"You have insuffient tokens to withdraw");  
            tokenownerBalance[msg.sender] -= _total;
            _to.transfer(_total);
            emit Withdraw(msg.sender, _total, block.timestamp);
            emit Transfer(address(this), msg.sender, _total, block.timestamp);
         }

         function getCustomerBal() external view returns (uint256) {
             console.log(tokenownerBalance[msg.sender]);
             return tokenownerBalance[msg.sender];
         }

         
}
