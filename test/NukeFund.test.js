"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const genMerkleTreeLib_1 = __importDefault(require("../scripts/genMerkleTreeLib"));
const evm_1 = require("../utils/evm");
describe('NukeFund', function () {
    let owner, user1, nukeFund, nft, devFund, airdrop, entityForging, merkleInfo, entityTrading;
    beforeEach(async function () {
        [owner, user1] = await hardhat_1.ethers.getSigners();
        const TraitForgeNft = await hardhat_1.ethers.getContractFactory('TraitForgeNft');
        nft = (await TraitForgeNft.deploy());
        await nft.waitForDeployment();
        devFund = await hardhat_1.ethers.deployContract('DevFund');
        await devFund.waitForDeployment();
        await devFund.addDev(owner.address, 1);
        airdrop = await hardhat_1.ethers.deployContract('Airdrop');
        await airdrop.waitForDeployment();
        await nft.setAirdropContract(await airdrop.getAddress());
        await airdrop.transferOwnership(await nft.getAddress());
        const NukeFund = await hardhat_1.ethers.getContractFactory('NukeFund');
        nukeFund = (await NukeFund.deploy(await nft.getAddress(), await airdrop.getAddress(), await devFund.getAddress(), owner.address));
        await nukeFund.waitForDeployment();
        await nft.setNukeFundContract(await nukeFund.getAddress());
        // Deploy EntityForging contract
        const EntropyGenerator = await hardhat_1.ethers.getContractFactory('EntropyGenerator');
        const entropyGenerator = (await EntropyGenerator.deploy(await nft.getAddress()));
        await entropyGenerator.writeEntropyBatch1();
        await nft.setEntropyGenerator(await entropyGenerator.getAddress());
        // Deploy EntityForging contract
        const EntityForging = await hardhat_1.ethers.getContractFactory('EntityForging');
        entityForging = (await EntityForging.deploy(await nft.getAddress()));
        await nft.setEntityForgingContract(await entityForging.getAddress());
        merkleInfo = (0, genMerkleTreeLib_1.default)([owner.address, user1.address]);
        await nft.setRootHash(merkleInfo.rootHash);
        entityTrading = await hardhat_1.ethers.deployContract('EntityTrading', [
            await nft.getAddress(),
        ]);
        await entityTrading.setNukeFundAddress(await nukeFund.getAddress());
        await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
            value: hardhat_1.ethers.parseEther('1'),
        });
        // Set minimumDaysHeld to 0 for testing purpose
        await nukeFund.setMinimumDaysHeld(0);
    });
    it('should allow the owner to update the ERC721 contract address', async function () {
        await (0, chai_1.expect)(nukeFund.connect(owner).setTraitForgeNftContract(await nft.getAddress()))
            .to.emit(nukeFund, 'TraitForgeNftAddressUpdated')
            .withArgs(await nft.getAddress());
        (0, chai_1.expect)(await nukeFund.nftContract()).to.equal(await nft.getAddress());
    });
    it('should receive funds and distribute dev share', async function () {
        const initialFundBalance = await nukeFund.getFundBalance();
        const devShare = hardhat_1.ethers.parseEther('0.1'); // 10% of the sent amount
        const initalDevBalance = await hardhat_1.ethers.provider.getBalance(await nukeFund.devAddress());
        await (0, chai_1.expect)(async () => await user1.sendTransaction({
            to: await nukeFund.getAddress(),
            value: hardhat_1.ethers.parseEther('1'),
        })).to.changeEtherBalance(nukeFund, hardhat_1.ethers.parseEther('0.9'));
        const newFundBalance = await nukeFund.getFundBalance();
        (0, chai_1.expect)(newFundBalance).to.equal(initialFundBalance + hardhat_1.ethers.parseEther('0.9'));
        const devBalance = await hardhat_1.ethers.provider.getBalance(await nukeFund.devAddress());
        (0, chai_1.expect)(devBalance).to.equal(initalDevBalance + devShare);
    });
    it('should calculate the age of a token', async function () {
        const tokenId = 1;
        const age = await nukeFund.calculateAge(tokenId);
        (0, chai_1.expect)(age).to.be.eq(0);
    });
    it('should nuke a token', async function () {
        const tokenId = 1;
        // Mint a token
        await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
            value: hardhat_1.ethers.parseEther('1'),
        });
        // Send some funds to the contract
        await user1.sendTransaction({
            to: await nukeFund.getAddress(),
            value: hardhat_1.ethers.parseEther('1'),
        });
        const prevNukeFundBal = await nukeFund.getFundBalance();
        // Ensure the token can be nuked
        (0, chai_1.expect)(await nukeFund.canTokenBeNuked(tokenId)).to.be.true;
        const prevUserEthBalance = await hardhat_1.ethers.provider.getBalance(await owner.getAddress());
        await nft.connect(owner).approve(await nukeFund.getAddress(), tokenId);
        const finalNukeFactor = await nukeFund.calculateNukeFactor(tokenId);
        const fund = await nukeFund.getFundBalance();
        await (0, chai_1.expect)(nukeFund.connect(owner).nuke(tokenId))
            .to.emit(nukeFund, 'Nuked')
            .withArgs(owner, tokenId, (fund * finalNukeFactor) / 100000n)
            .to.emit(nukeFund, 'FundBalanceUpdated')
            .withArgs(fund - (fund * finalNukeFactor) / 100000n);
        const curUserEthBalance = await hardhat_1.ethers.provider.getBalance(await owner.getAddress());
        const curNukeFundBal = await nukeFund.getFundBalance();
        (0, chai_1.expect)(curUserEthBalance).to.be.gt(prevUserEthBalance);
        // Check if the token is burned
        // expect(await nft.ownerOf(tokenId)).to.equal(ethers.ZeroAddress);
        (0, chai_1.expect)(await nft.balanceOf(owner)).to.eq(1);
        (0, chai_1.expect)(curNukeFundBal).to.be.lt(prevNukeFundBal);
    });
    it('lastTransferredTimestamp should be updated after token transfer', async () => {
        await nukeFund.setMinimumDaysHeld(10);
        await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
            value: hardhat_1.ethers.parseEther('1'),
        });
        await (0, evm_1.fastForward)(5);
        (0, chai_1.expect)(await nukeFund.canTokenBeNuked(2)).to.be.false;
        await (0, evm_1.fastForward)(10);
        (0, chai_1.expect)(await nukeFund.canTokenBeNuked(2)).to.be.true;
        await nft
            .connect(owner)
            .transferFrom(await owner.getAddress(), await user1.getAddress(), 2);
        (0, chai_1.expect)(await nukeFund.canTokenBeNuked(2)).to.be.false;
        await (0, evm_1.fastForward)(10);
        (0, chai_1.expect)(await nukeFund.canTokenBeNuked(2)).to.be.true;
    });
});
