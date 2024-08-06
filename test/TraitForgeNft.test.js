"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genMerkleTreeLib_1 = __importDefault(require("../scripts/genMerkleTreeLib"));
const evm_1 = require("../utils/evm");
const { expect } = require('chai');
const { ethers } = require('hardhat');
describe('TraitForgeNFT', () => {
    let entityForging;
    let nft;
    let owner;
    let user1;
    let user2;
    let entityTrading;
    let nukeFund;
    let devFund;
    let merkleInfo;
    before(async () => {
        [owner, user1, user2] = await ethers.getSigners();
        // Deploy TraitForgeNft contract
        const TraitForgeNft = await ethers.getContractFactory('TraitForgeNft');
        nft = (await TraitForgeNft.deploy());
        // Deploy Airdrop contract
        const airdropFactory = await ethers.getContractFactory('Airdrop');
        const airdrop = (await airdropFactory.deploy());
        await nft.setAirdropContract(await airdrop.getAddress());
        await airdrop.transferOwnership(await nft.getAddress());
        // Deploy EntityForging contract
        const EntropyGenerator = await ethers.getContractFactory('EntropyGenerator');
        const entropyGenerator = (await EntropyGenerator.deploy(await nft.getAddress()));
        await entropyGenerator.writeEntropyBatch1();
        await nft.setEntropyGenerator(await entropyGenerator.getAddress());
        // Deploy EntityForging contract
        const EntityForging = await ethers.getContractFactory('EntityForging');
        entityForging = (await EntityForging.deploy(await nft.getAddress()));
        await nft.setEntityForgingContract(await entityForging.getAddress());
        devFund = await ethers.deployContract('DevFund');
        await devFund.waitForDeployment();
        const NukeFund = await ethers.getContractFactory('NukeFund');
        nukeFund = (await NukeFund.deploy(await nft.getAddress(), await airdrop.getAddress(), await devFund.getAddress(), owner.address));
        await nukeFund.waitForDeployment();
        await nft.setNukeFundContract(await nukeFund.getAddress());
        entityTrading = await ethers.deployContract('EntityTrading', [
            await nft.getAddress(),
        ]);
        // Set NukeFund address
        await entityTrading.setNukeFundAddress(await nukeFund.getAddress());
        merkleInfo = (0, genMerkleTreeLib_1.default)([
            owner.address,
            user1.address,
            user2.address,
        ]);
        await nft.setRootHash(merkleInfo.rootHash);
    });
    describe('listForForging', () => {
        it('should allow only whitelisted addresses for minting', async () => {
            await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
                value: ethers.parseEther('1'),
            });
            await nft.connect(user1).mintToken(merkleInfo.whitelist[1].proof, {
                value: ethers.parseEther('1'),
            });
            await nft.connect(user1).mintToken(merkleInfo.whitelist[1].proof, {
                value: ethers.parseEther('1'),
            });
            expect(await nft.balanceOf(owner.address)).to.be.eq(1);
            expect(await nft.balanceOf(user1.address)).to.be.eq(2);
        });
        it('should not allow non-whitelisted addresses for minting', async () => {
            await expect(nft.connect(user2).mintToken(merkleInfo.whitelist[1].proof, {
                value: ethers.parseEther('1'),
            })).to.be.revertedWith('Not whitelisted user');
        });
        it('should allow non-whitelisted addresses after 24 hours', async () => {
            (0, evm_1.fastForward)(24 * 60 * 60 + 1);
            await nft.connect(user2).mintToken(merkleInfo.whitelist[1].proof, {
                value: ethers.parseEther('1'),
            });
            expect(await nft.balanceOf(user2.address)).to.be.eq(1);
        });
    });
});
