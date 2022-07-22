const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendBorrow Contract", () => {
    let LendBorrow, lendborrow;
    let issuer, recipient1, recipient2, addresses;

    beforeEach(async () => {
        LendBorrow = await ethers.getContractFactory("LendBorrow");
        [issuer, recipient1, recipient2, ...addresses] = await ethers.getSigners();
        lendborrow = await LendBorrow.deploy();
    });
    
    it("Deposit token", async () => {
        expect(
          await lendborrow
            .connect(recipient1)
            .deposittoken({value:400})
        )
      });  
      
    });
