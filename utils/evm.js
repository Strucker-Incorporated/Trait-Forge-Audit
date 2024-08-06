"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = send;
exports.mineBlock = mineBlock;
exports.fastForward = fastForward;
const hardhat_1 = require("hardhat");
function send(method, params) {
    return hardhat_1.ethers.provider.send(method, params === undefined ? [] : params);
}
function mineBlock() {
    return send('evm_mine', []);
}
async function fastForward(seconds) {
    const method = 'evm_increaseTime';
    const params = [seconds];
    await send(method, params);
    await mineBlock();
}
