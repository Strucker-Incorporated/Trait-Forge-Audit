Summary
 - [arbitrary-send-erc20](#arbitrary-send-erc20) (1 results) (High)
 - [arbitrary-send-eth](#arbitrary-send-eth) (3 results) (High)
 - [weak-prng](#weak-prng) (2 results) (High)
 - [reentrancy-eth](#reentrancy-eth) (3 results) (High)
 - [unchecked-transfer](#unchecked-transfer) (2 results) (High)
## arbitrary-send-erc20
Impact: High
Confidence: High
 - [ ] ID-0
[Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32) uses arbitrary from in transferFrom: [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#L29)

contracts/Airdrop/Airdrop.sol#L24-L32


## arbitrary-send-eth
Impact: High
Confidence: Medium
 - [ ] ID-1
[NukeFund.nuke(uint256)](contracts/NukeFund/NukeFund.sol#L153-L182) sends eth to arbitrary user
	Dangerous calls:
	- [(success,None) = address(msg.sender).call{value: claimAmount}()](contracts/NukeFund/NukeFund.sol#L177)

contracts/NukeFund/NukeFund.sol#L153-L182


 - [ ] ID-2
[DevFund.safeRewardTransfer(address,uint256)](contracts/DevFund/DevFund.sol#L83-L92) sends eth to arbitrary user
	Dangerous calls:
	- [(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#L89)

contracts/DevFund/DevFund.sol#L83-L92


 - [ ] ID-3
[TraitForgeNft._distributeFunds(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365) sends eth to arbitrary user
	Dangerous calls:
	- [(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#L361)

contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365


## weak-prng
Impact: High
Confidence: Medium
 - [ ] ID-4
[EntropyGenerator.initializeAlphaIndices()](contracts/EntropyGenerator/EntropyGenerator.sol#L206-L216) uses a weak PRNG: "[slotIndexSelection = (hashValue % 258) + 512](contracts/EntropyGenerator/EntropyGenerator.sol#L211)" 

contracts/EntropyGenerator/EntropyGenerator.sol#L206-L216


 - [ ] ID-5
[EntropyGenerator.initializeAlphaIndices()](contracts/EntropyGenerator/EntropyGenerator.sol#L206-L216) uses a weak PRNG: "[numberIndexSelection = hashValue % 13](contracts/EntropyGenerator/EntropyGenerator.sol#L212)" 

contracts/EntropyGenerator/EntropyGenerator.sol#L206-L216


## reentrancy-eth
Impact: High
Confidence: Medium
 - [ ] ID-6
Reentrancy in [EntityForging.forgeWithListed(uint256,uint256)](contracts/EntityForging/EntityForging.sol#L102-L175):
	External calls:
	- [newTokenId = nftContract.forge(msg.sender,forgerTokenId,mergerTokenId,)](contracts/EntityForging/EntityForging.sol#L150-L155)
	- [(success,None) = nukeFundAddress.call{value: devFee}()](contracts/EntityForging/EntityForging.sol#L156)
	- [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)
	External calls sending eth:
	- [(success,None) = nukeFundAddress.call{value: devFee}()](contracts/EntityForging/EntityForging.sol#L156)
	- [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)
	State variables written after the call(s):
	- [_cancelListingForForging(forgerTokenId)](contracts/EntityForging/EntityForging.sol#L162)
		- [delete listings[listedTokenIds[tokenId]]](contracts/EntityForging/EntityForging.sol#L194)
	[EntityForging.listings](contracts/EntityForging/EntityForging.sol#L21) can be used in cross function reentrancies:
	- [EntityForging.fetchListings()](contracts/EntityForging/EntityForging.sol#L48-L53)
	- [EntityForging.getListings(uint256)](contracts/EntityForging/EntityForging.sol#L61-L65)
	- [EntityForging.listings](contracts/EntityForging/EntityForging.sol#L21)

contracts/EntityForging/EntityForging.sol#L102-L175


 - [ ] ID-7
Reentrancy in [EntityTrading.buyNFT(uint256)](contracts/EntityTrading/EntityTrading.sol#L63-L92):
	External calls:
	- [transferToNukeFund(nukeFundContribution)](contracts/EntityTrading/EntityTrading.sol#L74)
		- [(success,None) = nukeFundAddress.call{value: amount}()](contracts/EntityTrading/EntityTrading.sol#L114)
	- [(success,None) = address(listing.seller).call{value: sellerProceeds}()](contracts/EntityTrading/EntityTrading.sol#L77-L79)
	- [nftContract.transferFrom(address(this),msg.sender,tokenId)](contracts/EntityTrading/EntityTrading.sol#L81)
	External calls sending eth:
	- [transferToNukeFund(nukeFundContribution)](contracts/EntityTrading/EntityTrading.sol#L74)
		- [(success,None) = nukeFundAddress.call{value: amount}()](contracts/EntityTrading/EntityTrading.sol#L114)
	- [(success,None) = address(listing.seller).call{value: sellerProceeds}()](contracts/EntityTrading/EntityTrading.sol#L77-L79)
	State variables written after the call(s):
	- [delete listings[listedTokenIds[tokenId]]](contracts/EntityTrading/EntityTrading.sol#L83)
	[EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#L20) can be used in cross function reentrancies:
	- [EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#L20)

contracts/EntityTrading/EntityTrading.sol#L63-L92


 - [ ] ID-8
Reentrancy in [DevFund.claim()](contracts/DevFund/DevFund.sol#L61-L75):
	External calls:
	- [claimedAmount = safeRewardTransfer(msg.sender,pending)](contracts/DevFund/DevFund.sol#L69)
		- [(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#L89)
	State variables written after the call(s):
	- [info.pendingRewards = pending - claimedAmount](contracts/DevFund/DevFund.sol#L70)
	[DevFund.devInfo](contracts/DevFund/DevFund.sol#L12) can be used in cross function reentrancies:
	- [DevFund.addDev(address,uint256)](contracts/DevFund/DevFund.sol#L30-L38)
	- [DevFund.devInfo](contracts/DevFund/DevFund.sol#L12)
	- [DevFund.pendingRewards(address)](contracts/DevFund/DevFund.sol#L77-L81)
	- [DevFund.removeDev(address)](contracts/DevFund/DevFund.sol#L51-L59)
	- [DevFund.updateDev(address,uint256)](contracts/DevFund/DevFund.sol#L40-L49)
	- [info.rewardDebt = totalRewardDebt](contracts/DevFund/DevFund.sol#L74)
	[DevFund.devInfo](contracts/DevFund/DevFund.sol#L12) can be used in cross function reentrancies:
	- [DevFund.addDev(address,uint256)](contracts/DevFund/DevFund.sol#L30-L38)
	- [DevFund.devInfo](contracts/DevFund/DevFund.sol#L12)
	- [DevFund.pendingRewards(address)](contracts/DevFund/DevFund.sol#L77-L81)
	- [DevFund.removeDev(address)](contracts/DevFund/DevFund.sol#L51-L59)
	- [DevFund.updateDev(address,uint256)](contracts/DevFund/DevFund.sol#L40-L49)

contracts/DevFund/DevFund.sol#L61-L75


## unchecked-transfer
Impact: High
Confidence: Medium
 - [ ] ID-9
[Airdrop.claim()](contracts/Airdrop/Airdrop.sol#L67-L74) ignores return value by [traitToken.transfer(msg.sender,amount)](contracts/Airdrop/Airdrop.sol#L72)

contracts/Airdrop/Airdrop.sol#L67-L74


 - [ ] ID-10
[Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32) ignores return value by [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#L29)

contracts/Airdrop/Airdrop.sol#L24-L32


