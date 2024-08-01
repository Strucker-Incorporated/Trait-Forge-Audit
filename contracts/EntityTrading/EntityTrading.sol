// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol'; // Import ERC721
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '../TraitForgeNft/ITraitForgeNft.sol';
import './IEntityTrading.sol';

contract EntityTrading is IEntityTrading, ERC721, ReentrancyGuard, Ownable, Pausable {
    ITraitForgeNft public nftContract;
    address payable public nukeFundAddress;
    uint256 public taxCut = 10; // Represents a 10% tax cut

    uint256 public listingCount = 0;

    /// @dev tokenid -> listings index
    mapping(uint256 => uint256) public listedTokenIds;
    /// @dev index -> listing info
    mapping(uint256 => Listing) public listings;

    // Constructor properly initializes the Ownable and ERC721 contracts
    constructor(address initialOwner) ERC721('TraitForgeNft', 'TFGNFT') Ownable(initialOwner) {
        whitelistEndTime = block.timestamp + 24 hours;
    }

    // Allows the owner to set the NukeFund address
    function setNukeFundAddress(address payable _nukeFundAddress) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;
    }

    function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;
    }

    // Function to list an NFT for sale
    function listNFTForSale(uint256 tokenId, uint256 price) public whenNotPaused nonReentrant {
        require(price > 0, 'Price must be greater than zero');
        require(nftContract.ownerOf(tokenId) == msg.sender, 'Sender must be the NFT owner');
        require(nftContract.getApproved(tokenId) == address(this) || nftContract.isApprovedForAll(msg.sender, address(this)), 'Contract must be approved to transfer the NFT');

        nftContract.transferFrom(msg.sender, address(this), tokenId); // Transfer NFT to contract

        ++listingCount;
        listings[listingCount] = Listing(msg.sender, tokenId, price, true);
        listedTokenIds[tokenId] = listingCount;

        emit NFTListed(tokenId, msg.sender, price);
    }

    // Function to buy an NFT listed for sale
    function buyNFT(uint256 tokenId) external payable whenNotPaused nonReentrant {
        Listing memory listing = listings[listedTokenIds[tokenId]];
        require(listing.isActive, 'NFT is not listed for sale');
        require(msg.value == listing.price, 'ETH sent does not match the listing price');

        uint256 nukeFundContribution = msg.value * taxCut / 100;
        uint256 sellerProceeds = msg.value - nukeFundContribution;

        // Transfer ETH to NukeFund and seller
        transferToNukeFund(nukeFundContribution);

        (bool success, ) = payable(listing.seller).call{ value: sellerProceeds }('');
        require(success, 'Failed to send ETH to seller');

        nftContract.transferFrom(address(this), msg.sender, tokenId); // Transfer NFT to the buyer

        delete listings[listedTokenIds[tokenId]]; // Remove listing

        emit NFTSold(tokenId, listing.seller, msg.sender, msg.value, nukeFundContribution);
    }

    // Function to cancel a listing
    function cancelListing(uint256 tokenId) public whenNotPaused nonReentrant {
        Listing storage listing = listings[listedTokenIds[tokenId]];

        require(listing.seller == msg.sender, 'Only the seller can cancel the listing');
        require(listing.isActive, 'Listing is not active');

        nftContract.transferFrom(address(this), msg.sender, tokenId); // Transfer the NFT back to the seller

        delete listings[listedTokenIds[tokenId]]; // Remove listing

        emit ListingCanceled(tokenId, msg.sender);
    }

    // Private function to transfer ETH to NukeFund
    function transferToNukeFund(uint256 amount) private {
        require(nukeFundAddress != address(0), 'NukeFund address not set');
        (bool success, ) = nukeFundAddress.call{ value: amount }('');
        require(success, 'Failed to send ETH to NukeFund');
        emit NukeFundContribution(nukeFundAddress, amount);
    }
}
