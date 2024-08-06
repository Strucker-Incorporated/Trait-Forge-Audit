### **High-Severity Findings**

#### arbitrary-send-erc20
- **ID-0**: [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#24-32) uses arbitrary from in transferFrom: [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#29)

#### arbitrary-send-eth
- **ID-1**: [NukeFund.nuke(uint256)](contracts/NukeFund/NukeFund.sol#153-182) sends ETH to an arbitrary user:
  - Dangerous call: [(success,None) = address(msg.sender).call{value: claimAmount}()](contracts/NukeFund/NukeFund.sol#177)

- **ID-2**: [DevFund.safeRewardTransfer(address,uint256)](contracts/DevFund/DevFund.sol#83-92) sends ETH to an arbitrary user:
  - Dangerous call: [(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#89)

- **ID-3**: [TraitForgeNft._distributeFunds(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#358-365) sends ETH to an arbitrary user:
  - Dangerous call: [(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#361)

#### weak-prng
- **ID-4**: [EntropyGenerator.initializeAlphaIndices()](contracts/EntropyGenerator/EntropyGenerator.sol#206-216) uses a weak PRNG:
  - Code: "[slotIndexSelection = (hashValue % 258) + 512](contracts/EntropyGenerator/EntropyGenerator.sol#211)"

- **ID-5**: [EntropyGenerator.initializeAlphaIndices()](contracts/EntropyGenerator/EntropyGenerator.sol#206-216) uses a weak PRNG:
  - Code: "[numberIndexSelection = hashValue % 13](contracts/EntropyGenerator/EntropyGenerator.sol#212)"

#### reentrancy-eth
- **ID-6**: Reentrancy in [EntityForging.forgeWithListed(uint256,uint256)](contracts/EntityForging/EntityForging.sol#102-175):
  - External calls sending ETH:
    - [(success,None) = nukeFundAddress.call{value: devFee}()](contracts/EntityForging/EntityForging.sol#156)
    - [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#158)
  - State variables written after the call(s):
    - [_cancelListingForForging(forgerTokenId)](contracts/EntityForging/EntityForging.sol#162)
    - [delete listings[listedTokenIds[tokenId]]](contracts/EntityForging/EntityForging.sol#194)

- **ID-7**: Reentrancy in [EntityTrading.buyNFT(uint256)](contracts/EntityTrading/EntityTrading.sol#63-92):
  - External calls sending ETH:
    - [(success,None) = nukeFundAddress.call{value: amount}()](contracts/EntityTrading/EntityTrading.sol#114)
    - [(success,None) = address(listing.seller).call{value: sellerProceeds}()](contracts/EntityTrading/EntityTrading.sol#77-79)
  - State variables written after the call(s):
    - [delete listings[listedTokenIds[tokenId]]](contracts/EntityTrading/EntityTrading.sol#83)

- **ID-8**: Reentrancy in [DevFund.claim()](contracts/DevFund/DevFund.sol#61-75):
  - External calls sending ETH:
    - [(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#89)
  - State variables written after the call(s):
    - [info.pendingRewards = pending - claimedAmount](contracts/DevFund/DevFund.sol#70)

#### unchecked-transfer
- **ID-9**: [Airdrop.claim()](contracts/Airdrop/Airdrop.sol#67-74) ignores return value of [traitToken.transfer(msg.sender,amount)](contracts/Airdrop/Airdrop.sol#72)

- **ID-10**: [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#24-32) ignores return value of [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#29)

