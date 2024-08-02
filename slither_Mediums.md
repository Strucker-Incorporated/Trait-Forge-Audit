Summary
 - [divide-before-multiply](#divide-before-multiply) (2 results) (Medium)
 - [incorrect-equality](#incorrect-equality) (4 results) (Medium)
 - [reentrancy-no-eth](#reentrancy-no-eth) (6 results) (Medium)
 - [unused-return](#unused-return) (1 results) (Medium)
## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-0
[DevFund.receive()](contracts/DevFund/DevFund.sol#L14-L28) performs a multiplication on the result of a division:
	- [amountPerWeight = msg.value / totalDevWeight](contracts/DevFund/DevFund.sol#L16)
	- [remaining = msg.value - (amountPerWeight * totalDevWeight)](contracts/DevFund/DevFund.sol#L17)

contracts/DevFund/DevFund.sol#L14-L28


 - [ ] ID-1
[NukeFund.calculateAge(uint256)](contracts/NukeFund/NukeFund.sol#L118-L133) performs a multiplication on the result of a division:
	- [daysOld = (block.timestamp - nftContract.getTokenCreationTimestamp(tokenId)) / 60 / 60 / 24](contracts/NukeFund/NukeFund.sol#L121-L125)
	- [age = (daysOld * perfomanceFactor * MAX_DENOMINATOR * ageMultiplier) / 365](contracts/NukeFund/NukeFund.sol#L128-L131)

contracts/NukeFund/NukeFund.sol#L118-L133


## incorrect-equality
Impact: Medium
Confidence: High
 - [ ] ID-2
[EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185) uses a dangerous strict equality:
	- [slotIndex == slotIndexSelectionPoint && numberIndex == numberIndexSelectionPoint](contracts/EntropyGenerator/EntropyGenerator.sol#L171-L172)

contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185


 - [ ] ID-3
[EntityForging._resetForgingCountIfNeeded(uint256)](contracts/EntityForging/EntityForging.sol#L199-L207) uses a dangerous strict equality:
	- [lastForgeResetTimestamp[tokenId] == 0](contracts/EntityForging/EntityForging.sol#L201)

contracts/EntityForging/EntityForging.sol#L199-L207


 - [ ] ID-4
[EntropyGenerator.deriveTokenParameters(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161) uses a dangerous strict equality:
	- [isForger = role == 0](contracts/EntropyGenerator/EntropyGenerator.sol#L158)

contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161


 - [ ] ID-5
[DAOFund.receive()](contracts/DAOFund/DAOFund.sol#L16-L34) uses a dangerous strict equality:
	- [require(bool,string)(token.burn(token.balanceOf(address(this))) == true,Token burn failed)](contracts/DAOFund/DAOFund.sol#L30-L33)

contracts/DAOFund/DAOFund.sol#L16-L34


## reentrancy-no-eth
Impact: Medium
Confidence: Medium
 - [ ] ID-6
Reentrancy in [Airdrop.claim()](contracts/Airdrop/Airdrop.sol#L67-L74):
	External calls:
	- [traitToken.transfer(msg.sender,amount)](contracts/Airdrop/Airdrop.sol#L72)
	State variables written after the call(s):
	- [userInfo[msg.sender] = 0](contracts/Airdrop/Airdrop.sol#L73)
	[Airdrop.userInfo](contracts/Airdrop/Airdrop.sol#L18) can be used in cross function reentrancies:
	- [Airdrop.userInfo](contracts/Airdrop/Airdrop.sol#L18)

contracts/Airdrop/Airdrop.sol#L67-L74


 - [ ] ID-7
Reentrancy in [TraitForgeNft._mintNewEntity(address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L311-L343):
	External calls:
	- [_mint(newOwner,newTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L323)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L334)
		- [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)
	State variables written after the call(s):
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L334)
		- [generationMintCounts[currentGeneration] = 0](contracts/TraitForgeNft/TraitForgeNft.sol#L351)
	[TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#L45) can be used in cross function reentrancies:
	- [TraitForgeNft.calculateMintPrice()](contracts/TraitForgeNft/TraitForgeNft.sol#L227-L232)
	- [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#L45)

contracts/TraitForgeNft/TraitForgeNft.sol#L311-L343


 - [ ] ID-8
Reentrancy in [TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309):
	External calls:
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L282)
		- [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)
	- [_mint(to,newItemId)](contracts/TraitForgeNft/TraitForgeNft.sol#L287)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	- [entropyValue = entropyGenerator.getNextEntropy()](contracts/TraitForgeNft/TraitForgeNft.sol#L288)
	State variables written after the call(s):
	- [generationMintCounts[currentGeneration] ++](contracts/TraitForgeNft/TraitForgeNft.sol#L293)
	[TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#L45) can be used in cross function reentrancies:
	- [TraitForgeNft.calculateMintPrice()](contracts/TraitForgeNft/TraitForgeNft.sol#L227-L232)
	- [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#L45)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-9
Reentrancy in [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32):
	External calls:
	- [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#L29)
	State variables written after the call(s):
	- [started = true](contracts/Airdrop/Airdrop.sol#L30)
	[Airdrop.started](contracts/Airdrop/Airdrop.sol#L11) can be used in cross function reentrancies:
	- [Airdrop.airdropStarted()](contracts/Airdrop/Airdrop.sol#L34-L36)
	- [Airdrop.allowDaoFund()](contracts/Airdrop/Airdrop.sol#L38-L42)

contracts/Airdrop/Airdrop.sol#L24-L32


 - [ ] ID-10
Reentrancy in [EntityTrading.cancelListing(uint256)](contracts/EntityTrading/EntityTrading.sol#L94-L109):
	External calls:
	- [nftContract.transferFrom(address(this),msg.sender,tokenId)](contracts/EntityTrading/EntityTrading.sol#L104)
	State variables written after the call(s):
	- [delete listings[listedTokenIds[tokenId]]](contracts/EntityTrading/EntityTrading.sol#L106)
	[EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#L20) can be used in cross function reentrancies:
	- [EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#L20)

contracts/EntityTrading/EntityTrading.sol#L94-L109


 - [ ] ID-11
Reentrancy in [TraitForgeNft._mintNewEntity(address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L311-L343):
	External calls:
	- [_mint(newOwner,newTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L323)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	State variables written after the call(s):
	- [generationMintCounts[gen] ++](contracts/TraitForgeNft/TraitForgeNft.sol#L328)
	[TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#L45) can be used in cross function reentrancies:
	- [TraitForgeNft.calculateMintPrice()](contracts/TraitForgeNft/TraitForgeNft.sol#L227-L232)
	- [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#L45)

contracts/TraitForgeNft/TraitForgeNft.sol#L311-L343


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-12
[DAOFund.receive()](contracts/DAOFund/DAOFund.sol#L16-L34) ignores return value by [uniswapV2Router.swapExactETHForTokens{value: msg.value}(0,path,address(this),block.timestamp)](contracts/DAOFund/DAOFund.sol#L23-L28)

contracts/DAOFund/DAOFund.sol#L16-L34


