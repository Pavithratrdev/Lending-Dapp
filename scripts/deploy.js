const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const LendBorrow = await hre.ethers.getContractFactory("LendBorrow");
    const lendborrow = await LendBorrow.deploy();

    await lendborrow.deployed();
    console.log("LendBorrow address:", lendborrow.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    saveFrontendFiles(lendborrow);

}

function saveFrontendFiles(contract) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../src/abis";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/lendborrow.json",
        JSON.stringify({ LendBorrow: contract.address }, undefined, 2)
    );

    const LendBorrowArtifact = artifacts.readArtifactSync("LendBorrow");

    fs.writeFileSync(
        contractsDir + "/LendBorrow.json",
        JSON.stringify(LendBorrowArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });