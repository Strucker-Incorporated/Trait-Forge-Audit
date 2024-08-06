"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe('DevFund', function () {
    let owner;
    let user1;
    let user2;
    let user3;
    let devFund;
    before(async () => {
        [owner, user1, user2, user3] = await hardhat_1.ethers.getSigners();
        devFund = await hardhat_1.ethers.deployContract('DevFund');
    });
    it('should send the received fund to owner when there are no devs', async () => {
        const balanceBefore = await hardhat_1.ethers.provider.getBalance(owner.address);
        await user2.sendTransaction({
            to: await devFund.getAddress(),
            value: hardhat_1.ethers.parseEther('1'),
        });
        const balanceAfter = await hardhat_1.ethers.provider.getBalance(owner.address);
        (0, chai_1.expect)(balanceAfter - balanceBefore).to.eq(hardhat_1.ethers.parseEther('1'));
    });
    it('should not add a dev from non-owner', async () => {
        await (0, chai_1.expect)(devFund.connect(user2).addDev(user1.address, 5)).to.revertedWith('Ownable: caller is not the owner');
    });
    it('should add a dev successfully', async () => {
        await (0, chai_1.expect)(devFund.addDev(user1.address, 5))
            .to.emit(devFund, 'AddDev')
            .withArgs(user1.address, 5);
        await (0, chai_1.expect)(devFund.addDev(user2.address, 5))
            .to.emit(devFund, 'AddDev')
            .withArgs(user2.address, 5);
    });
    it('should revert when the dev is already registered', async () => {
        await (0, chai_1.expect)(devFund.addDev(user1.address, 5)).to.revertedWith('Already registered');
    });
    it('should split the fund between devs when receiving fund', async () => {
        await (0, chai_1.expect)(owner.sendTransaction({
            to: await devFund.getAddress(),
            value: hardhat_1.ethers.parseEther('1'),
        }))
            .to.emit(devFund, 'FundReceived')
            .withArgs(await owner.getAddress(), hardhat_1.ethers.parseEther('1'));
        (0, chai_1.expect)(await devFund.pendingRewards(user1.address)).to.eq(hardhat_1.ethers.parseEther('0.5'));
    });
    it('should claim successfully', async () => {
        const balanceBefore = await hardhat_1.ethers.provider.getBalance(user1.address);
        await (0, chai_1.expect)(devFund.connect(user1).claim())
            .to.emit(devFund, 'Claim')
            .withArgs(user1.address, hardhat_1.ethers.parseEther('0.5'));
        const balanceAfter = await hardhat_1.ethers.provider.getBalance(user1.address);
        (0, chai_1.expect)(balanceAfter - balanceBefore).to.approximately(hardhat_1.ethers.parseEther('0.5'), hardhat_1.ethers.parseEther('0.05'));
    });
    it('should remove dev successfully', async () => {
        await (0, chai_1.expect)(devFund.removeDev(user1.address))
            .to.emit(devFund, 'RemoveDev')
            .withArgs(user1.address);
        const devInfo = await devFund.devInfo(user1.address);
        (0, chai_1.expect)(devInfo.weight).to.be.eq(0);
    });
    it('add another dev with different weight', async () => {
        await devFund.addDev(user3.address, 1);
        const prevBalance = await hardhat_1.ethers.provider.getBalance(owner.address);
        await user1.sendTransaction({
            to: await devFund.getAddress(),
            value: '100',
        });
        const curBalance = await hardhat_1.ethers.provider.getBalance(owner.address);
        (0, chai_1.expect)(await devFund.pendingRewards(user3.address)).to.eq('16');
        (0, chai_1.expect)(curBalance - prevBalance).to.be.eq('4');
    });
});
