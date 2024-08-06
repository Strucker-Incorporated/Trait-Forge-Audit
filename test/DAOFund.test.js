"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe('DAOFund', function () {
    let owner;
    let daoFund;
    let token;
    let user1;
    before(async () => {
        [owner] = await hardhat_1.ethers.getSigners();
        user1 = await hardhat_1.ethers.getImpersonatedSigner('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5');
        const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
        token = await hardhat_1.ethers.deployContract('Trait', [
            'Trait',
            'TRAIT',
            18,
            hardhat_1.ethers.parseEther('1000000'),
        ]);
        const router = await hardhat_1.ethers.getContractAt('IUniswapV2Router02', ROUTER_ADDRESS);
        await token.increaseAllowance(await router.getAddress(), hardhat_1.ethers.parseEther('1000'));
        await router.addLiquidityETH(await token.getAddress(), hardhat_1.ethers.parseEther('1000'), 0, 0, owner.address, Math.floor(Date.now() / 1000) + 30, { value: hardhat_1.ethers.parseEther('100') });
        daoFund = await hardhat_1.ethers.deployContract('DAOFund', [
            await token.getAddress(),
            ROUTER_ADDRESS,
        ]);
    });
    it('should swap tokens and burn with received ETH', async () => {
        const totalSupplyBefore = await token.totalSupply();
        await owner.sendTransaction({
            to: await daoFund.getAddress(),
            value: hardhat_1.ethers.parseEther('1'),
        });
        const totalSupplyAfter = await token.totalSupply();
        (0, chai_1.expect)(totalSupplyBefore - totalSupplyAfter).to.gt(0);
    });
});
