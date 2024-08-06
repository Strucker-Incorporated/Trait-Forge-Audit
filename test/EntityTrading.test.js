"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
// Define some constants for testing
const TOKEN_ID = 0;
const LISTING_PRICE = hardhat_1.ethers.parseEther('1.0');
describe('EntityTrading', function () {
    let owner;
    let buyer;
    let nukeFund;
    let nft;
    let entityTrading;
    before(async function () {
        // Get the owner and buyer accounts
        [owner, buyer, nukeFund] = await hardhat_1.ethers.getSigners();
        nft = await hardhat_1.ethers.deployContract('TestERC721');
        entityTrading = await hardhat_1.ethers.deployContract('EntityTrading', [
            await nft.getAddress(),
        ]);
        // Set NukeFund address
        await entityTrading.setNukeFundAddress(nukeFund.address);
        // Mint and approve the NFT for trading
        await nft.mintToken(owner.address);
        await nft
            .connect(owner)
            .approve(await entityTrading.getAddress(), TOKEN_ID);
        console.log(await nft.getApproved(TOKEN_ID), await entityTrading.getAddress());
    });
    it('should list an NFT for sale', async function () {
        await entityTrading.listNFTForSale(TOKEN_ID, LISTING_PRICE);
        const listingId = await entityTrading.listedTokenIds(TOKEN_ID);
        const listing = await entityTrading.listings(listingId);
        (0, chai_1.expect)(listing.seller).to.equal(owner.address);
        (0, chai_1.expect)(listing.price).to.equal(LISTING_PRICE);
        (0, chai_1.expect)(listing.isActive).to.be.true;
    });
    it('should allow the seller to cancel the listing', async function () {
        await entityTrading.cancelListing(TOKEN_ID);
        const listingId = await entityTrading.listedTokenIds(TOKEN_ID);
        const listing = await entityTrading.listings(listingId);
        (0, chai_1.expect)(listing.isActive).to.be.false;
        // Check if the NFT is transferred back to the owner
        const ownerBalance = await nft.balanceOf(owner.address);
        (0, chai_1.expect)(ownerBalance).to.equal(1);
    });
    it('should list an NFT for sale', async function () {
        await nft.approve(await entityTrading.getAddress(), TOKEN_ID);
        await entityTrading.listNFTForSale(TOKEN_ID, LISTING_PRICE);
        const listingId = await entityTrading.listedTokenIds(TOKEN_ID);
        const listing = await entityTrading.listings(listingId);
        (0, chai_1.expect)(listing.seller).to.equal(owner.address);
        (0, chai_1.expect)(listing.price).to.equal(LISTING_PRICE);
        (0, chai_1.expect)(listing.isActive).to.be.true;
    });
    it('should allow a buyer to purchase the listed NFT', async function () {
        const initialBalance = await hardhat_1.ethers.provider.getBalance(buyer);
        await (0, chai_1.expect)(entityTrading.connect(buyer).buyNFT(TOKEN_ID, { value: LISTING_PRICE }))
            .to.emit(entityTrading, 'NFTSold')
            .withArgs(TOKEN_ID, owner.address, buyer.address, LISTING_PRICE, LISTING_PRICE / 10n);
        const listingId = await entityTrading.listedTokenIds(TOKEN_ID);
        const listing = await entityTrading.listings(listingId);
        (0, chai_1.expect)(listing.isActive).to.be.false;
        // Check the balances after the purchase
        const finalBalance = await hardhat_1.ethers.provider.getBalance(buyer);
        (0, chai_1.expect)(finalBalance).to.approximately(initialBalance - LISTING_PRICE, hardhat_1.ethers.parseEther('0.01'));
    });
    it('should handle NukeFund contributions correctly', async function () {
        await nft
            .connect(buyer)
            .approve(await entityTrading.getAddress(), TOKEN_ID);
        await entityTrading.connect(buyer).listNFTForSale(TOKEN_ID, LISTING_PRICE);
        const initialNukeFundBalance = await hardhat_1.ethers.provider.getBalance(nukeFund.address);
        await (0, chai_1.expect)(entityTrading.buyNFT(TOKEN_ID, { value: LISTING_PRICE }))
            .to.emit(entityTrading, 'NukeFundContribution')
            .withArgs(await entityTrading.getAddress(), LISTING_PRICE / 10n);
        // Check the NukeFund balance after the purchase
        const finalNukeFundBalance = await hardhat_1.ethers.provider.getBalance(nukeFund.address);
        (0, chai_1.expect)(finalNukeFundBalance - initialNukeFundBalance).to.equal(LISTING_PRICE / 10n);
    });
});
