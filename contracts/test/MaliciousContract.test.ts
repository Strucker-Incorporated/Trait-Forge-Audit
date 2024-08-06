import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers"; // Correct import

describe("MaliciousContract", function () {
    let deployer: any;
    let airdropContract: any;
    let traitToken: any;
    let maliciousContract: any;

    // Replace with your deployed addresses
    const airdropAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; 
    const traitTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

    before(async function () {
        [deployer] = await ethers.getSigners();

        // Deploy or get the existing contracts
        const Airdrop = await ethers.getContractFactory("Airdrop");
        airdropContract = Airdrop.attach(airdropAddress);

        const TraitToken = await ethers.getContractFactory("ERC20Token"); // Replace with actual token contract
        traitToken = TraitToken.attach(traitTokenAddress);

        const MaliciousContractFactory = await ethers.getContractFactory("MaliciousContract");
        maliciousContract = await MaliciousContractFactory.deploy(airdropAddress, traitTokenAddress);
        await maliciousContract.deployed();
    });

    it("should deploy the malicious contract successfully", async function () {
        expect(maliciousContract.address).to.properAddress;
    });

    it("should perform the attack", async function () {
        // Fund the malicious contract with tokens to perform the attack
        const amount = utils.parseUnits("1000", 18); // Example amount

        await traitToken.approve(maliciousContract.address, amount);

        // Call the attack function
        const tx = await maliciousContract.attack(amount);
        await tx.wait();

        // Verify the results of the attack
        const airdropStarted = await airdropContract.airdropStarted();
        expect(airdropStarted).to.be.true;

        // Additional checks can be added here
    });
});
