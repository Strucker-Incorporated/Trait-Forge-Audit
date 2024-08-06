"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe('Airdrop', function () {
    let owner;
    let user1;
    let user2;
    let airdrop;
    let token;
    before(async () => {
        [owner, user1, user2] = await hardhat_1.ethers.getSigners();
        token = await hardhat_1.ethers.deployContract('Trait', [
            'Trait',
            'TRAIT',
            18,
            hardhat_1.ethers.parseEther('1000000'),
        ]);
        airdrop = await hardhat_1.ethers.deployContract('Airdrop');
    });
    it('should set trait token successfully', async () => {
        await airdrop.setTraitToken(await token.getAddress());
        (0, chai_1.expect)(await airdrop.traitToken()).to.eq(await token.getAddress());
    });
    it('should set user amount successfully', async () => {
        await (0, chai_1.expect)(airdrop
            .connect(user2)
            .addUserAmount(user1.address, hardhat_1.ethers.parseEther('1'))).to.revertedWith('Ownable: caller is not the owner');
        await airdrop.addUserAmount(user1.address, hardhat_1.ethers.parseEther('1'));
        (0, chai_1.expect)(await airdrop.userInfo(user1.address)).to.eq(hardhat_1.ethers.parseEther('1'));
        await airdrop.addUserAmount(user2.address, hardhat_1.ethers.parseEther('3'));
        (0, chai_1.expect)(await airdrop.userInfo(user2.address)).to.eq(hardhat_1.ethers.parseEther('3'));
    });
    it('should not claim when airdrop is not started', async () => {
        await (0, chai_1.expect)(airdrop.connect(user1).claim()).to.revertedWith('Not started');
    });
    it('should start airdrop successfully', async () => {
        await token.increaseAllowance(await airdrop.getAddress(), hardhat_1.ethers.parseEther('1000'));
        await airdrop.startAirdrop(hardhat_1.ethers.parseEther('1000'));
        (0, chai_1.expect)(await airdrop.airdropStarted()).to.eq(true);
        await (0, chai_1.expect)(airdrop.startAirdrop(hardhat_1.ethers.parseEther('2000'))).to.revertedWith('Already started');
    });
    it('should claim successfully', async () => {
        const balanceBefore = await token.balanceOf(user1.address);
        await airdrop.connect(user1).claim();
        const balanceAfter = await token.balanceOf(user1.address);
        (0, chai_1.expect)(balanceAfter - balanceBefore).to.eq(hardhat_1.ethers.parseEther('250'));
        await (0, chai_1.expect)(airdrop.connect(user1).claim()).to.revertedWith('Not eligible');
    });
    it('should allow dao fund successfully', async () => {
        await airdrop.allowDaoFund();
        (0, chai_1.expect)(await airdrop.daoFundAllowed()).to.eq(true);
        await (0, chai_1.expect)(airdrop.allowDaoFund()).to.revertedWith('Already allowed');
    });
});
