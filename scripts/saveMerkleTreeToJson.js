"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const whitelist_1 = require("../consts/whitelist");
const genMerkleTreeLib_1 = __importDefault(require("./genMerkleTreeLib"));
async function main() {
    const data = (0, genMerkleTreeLib_1.default)(whitelist_1.WHITELIST);
    const metadata = JSON.stringify(data, null, 2);
    fs.writeFile(`consts/merkle.json`, metadata, (err) => {
        if (err) {
            throw err;
        }
    });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
