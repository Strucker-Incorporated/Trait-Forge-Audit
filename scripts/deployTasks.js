"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
const ethers_1 = require("ethers");
const consts_1 = require("../consts");
const genMerkleTreeLib_1 = __importDefault(require("./genMerkleTreeLib"));
const whitelist_1 = require("../consts/whitelist");
(0, config_1.task)('deploy-all', 'Deploy all the contracts').setAction(async (_, hre) => {
    const token = await hre.run('deploy-token');
    const nft = await hre.run('deploy-nft');
    const entropyGenerator = await hre.run('deploy-entropy-generator', { nft: await nft.getAddress() });
    const entityTrading = await hre.run('deploy-entity-trading', {
        nft: await nft.getAddress(),
    });
    const entityForging = await hre.run('deploy-entity-forging', {
        nft: await nft.getAddress(),
    });
    const devFund = await hre.run('deploy-dev-fund');
    const airdrop = await hre.run('deploy-airdrop');
    const daoFund = await hre.run('deploy-dao-fund', {
        token: await token.getAddress(),
    });
    const nukeFund = await hre.run('deploy-nuke-fund', {
        nft: await nft.getAddress(),
        devFund: await devFund.getAddress(),
        airdrop: await airdrop.getAddress(),
        daoFund: await daoFund.getAddress(),
    });
    await nft.setEntropyGenerator(await entropyGenerator.getAddress());
    await nft.setEntityForgingContract(await entityForging.getAddress());
    await nft.setNukeFundContract(await nukeFund.getAddress());
    await nft.setAirdropContract(await airdrop.getAddress());
    await entityTrading.setNukeFundAddress(await nukeFund.getAddress());
    await entityForging.setNukeFundAddress(await nukeFund.getAddress());
    await airdrop.setTraitToken(await token.getAddress());
    await airdrop.transferOwnership(await nft.getAddress());
    console.log('Generating Merkle Tree...');
    const { rootHash } = (0, genMerkleTreeLib_1.default)(whitelist_1.WHITELIST);
    await nft.setRootHash(rootHash);
    console.log('Generated & Set the root hash successfully.');
    console.log('Setting DevFund users...');
    await devFund.addDev(whitelist_1.WHITELIST[0], 100);
    await devFund.addDev(whitelist_1.WHITELIST[1], 100);
    await devFund.addDev(whitelist_1.WHITELIST[2], 100);
    console.log('Setting DevFund users done.');
    console.log('Writing EntropyBatch...');
    const tx1 = await entropyGenerator.writeEntropyBatch1();
    tx1.wait();
    const tx2 = await entropyGenerator.writeEntropyBatch2();
    tx2.wait();
    const tx3 = await entropyGenerator.writeEntropyBatch3();
    tx3.wait();
    console.log('Writing EntropyBatch done.');
});
(0, config_1.task)('deploy-token', 'Deploy Trait Token').setAction(async (_, hre) => {
    const name = 'TRAIT';
    const symbol = 'TRAIT';
    const decimals = 18;
    const totalSupply = ethers_1.ethers.parseEther('1000000');
    try {
        console.log('Deploying Trait...');
        const token = await hre.ethers.deployContract('Trait', [
            name,
            symbol,
            decimals,
            totalSupply,
        ]);
        await token.waitForDeployment();
        console.log('Contract deployed to:', await token.getAddress());
        return token;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-nft', 'Deploy TraitForgeNft').setAction(async (_, hre) => {
    try {
        console.log('Deploying TraitForgeNft...');
        const nft = await hre.ethers.deployContract('TraitForgeNft', []);
        await nft.waitForDeployment();
        console.log('Contract deployed to:', await nft.getAddress());
        return nft;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-entropy-generator', 'Deploy EntropyGenerator')
    .addParam('nft', 'The address of TraitForgeNft')
    .setAction(async (taskArguments, hre) => {
    try {
        console.log('Deploying EntropyGenerator...');
        const entropyGenerator = await hre.ethers.deployContract('EntropyGenerator', [taskArguments.nft]);
        await entropyGenerator.waitForDeployment();
        console.log('Contract deployed to:', await entropyGenerator.getAddress());
        return entropyGenerator;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-entity-trading', 'Deploy EntityTrading')
    .addParam('nft', 'The address of TraitForgeNft')
    .setAction(async (taskArguments, hre) => {
    try {
        console.log('Deploying EntityTrading...');
        const entityTrading = await hre.ethers.deployContract('EntityTrading', [
            taskArguments.nft,
        ]);
        await entityTrading.waitForDeployment();
        console.log('Contract deployed to:', await entityTrading.getAddress());
        return entityTrading;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-entity-forging', 'Deploy EntityForging')
    .addParam('nft', 'The address of TraitForgeNft')
    .setAction(async (taskArguments, hre) => {
    try {
        console.log('Deploying EntityForging...');
        const entityForging = await hre.ethers.deployContract('EntityForging', [
            taskArguments.nft,
        ]);
        await entityForging.waitForDeployment();
        console.log('Contract deployed to:', await entityForging.getAddress());
        return entityForging;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-dev-fund', 'Deploy DevFund').setAction(async (_, hre) => {
    try {
        console.log('Deploying DevFund...');
        const devFund = await hre.ethers.deployContract('DevFund', []);
        await devFund.waitForDeployment();
        console.log('Contract deployed to:', await devFund.getAddress());
        return devFund;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-airdrop', 'Deploy Airdrop').setAction(async (_, hre) => {
    try {
        console.log('Deploying Airdrop...');
        const airdrop = await hre.ethers.deployContract('Airdrop', []);
        await airdrop.waitForDeployment();
        console.log('Contract deployed to:', await airdrop.getAddress());
        return airdrop;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-dao-fund', 'Deploy DAOFund')
    .addParam('token', 'The address of Trait token')
    .setAction(async (taskArguments, hre) => {
    try {
        console.log('Deploying DAOFund...');
        const daoFund = await hre.ethers.deployContract('DAOFund', [
            taskArguments.token,
            consts_1.UNISWAP_ROUTER.sepolia,
        ]);
        await daoFund.waitForDeployment();
        console.log('Contract deployed to:', await daoFund.getAddress());
        return daoFund;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
(0, config_1.task)('deploy-nuke-fund', 'Deploy NukeFund')
    .addParam('nft', 'The address of TraitForgeNft')
    .addParam('devFund', 'The address of DevFund')
    .addParam('airdrop', 'The address of Airdrop')
    .addParam('daoFund', 'The address of DaoFund')
    .setAction(async (taskArguments, hre) => {
    try {
        console.log('Deploying NukeFund...');
        const nukeFund = await hre.ethers.deployContract('NukeFund', [
            taskArguments.nft,
            taskArguments.airdrop,
            taskArguments.devFund,
            taskArguments.daoFund,
        ]);
        await nukeFund.waitForDeployment();
        console.log('Contract deployed to:', await nukeFund.getAddress());
        return nukeFund;
    }
    catch (error) {
        console.error(error);
    }
    return null;
});
