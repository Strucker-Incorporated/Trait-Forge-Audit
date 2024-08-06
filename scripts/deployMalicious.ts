import { ethers } from "hardhat";
import { MaliciousContract } from "../typechain-types"; // Adjust the import path based on your project structure

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Replace these addresses with the deployed addresses of your contracts
    const airdropAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // Example address
    const traitTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Example address

    const MaliciousContractFactory = await ethers.getContractFactory("MaliciousContract");
    const maliciousContract = await MaliciousContractFactory.deploy(airdropAddress, traitTokenAddress) as MaliciousContract;
    await maliciousContract.deployed();
    console.log("MaliciousContract deployed to:", maliciousContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
