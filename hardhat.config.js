"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./scripts/deployTasks");
const env = {
    ETHEREUM_RPC_URL: process.env.ETHEREUM_RPC_URL ?? '',
    SEPOLIA_RPC_URL: process.env.SEPOLIA_RPC_URL ?? '',
    PRIVATE_KEY: process.env.PRIVATE_KEY ?? '',
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY ?? '',
};
const config = {
    solidity: {
        compilers: [
            {
                version: '0.8.20',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
            // forking: {
            //   url: env.ETHEREUM_RPC_URL,
            //   blockNumber: 20127471,
            // },
        },
        ethereum: {
            chainId: 1,
            url: env.ETHEREUM_RPC_URL,
            accounts: env.PRIVATE_KEY.length > 0 ? [env.PRIVATE_KEY] : [],
        },
        sepolia: {
            chainId: 11155111,
            url: env.SEPOLIA_RPC_URL,
            accounts: env.PRIVATE_KEY.length > 0 ? [env.PRIVATE_KEY] : [],
        },
    },
    sourcify: {
        enabled: false,
    },
    etherscan: {
        apiKey: env.ETHERSCAN_API_KEY,
    },
    mocha: {
        timeout: 10000000,
    },
};
exports.default = config;
