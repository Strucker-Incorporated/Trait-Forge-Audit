Summary
 - [arbitrary-send-erc20](#arbitrary-send-erc20) (1 results) (High)
 - [arbitrary-send-eth](#arbitrary-send-eth) (3 results) (High)
 - [weak-prng](#weak-prng) (2 results) (High)
 - [reentrancy-eth](#reentrancy-eth) (3 results) (High)
 - [unchecked-transfer](#unchecked-transfer) (2 results) (High)
 - [divide-before-multiply](#divide-before-multiply) (2 results) (Medium)
 - [incorrect-equality](#incorrect-equality) (4 results) (Medium)
 - [reentrancy-no-eth](#reentrancy-no-eth) (6 results) (Medium)
 - [unused-return](#unused-return) (1 results) (Medium)
 - [events-maths](#events-maths) (14 results) (Low)
 - [missing-zero-check](#missing-zero-check) (10 results) (Low)
 - [calls-loop](#calls-loop) (8 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (7 results) (Low)
 - [reentrancy-events](#reentrancy-events) (4 results) (Low)
 - [timestamp](#timestamp) (4 results) (Low)
 - [boolean-equal](#boolean-equal) (1 results) (Informational)
 - [costly-loop](#costly-loop) (3 results) (Informational)
 - [low-level-calls](#low-level-calls) (10 results) (Informational)
 - [too-many-digits](#too-many-digits) (4 results) (Informational)
 - [unused-import](#unused-import) (1 results) (Informational)
 - [constable-states](#constable-states) (5 results) (Optimization)
 - [immutable-states](#immutable-states) (5 results) (Optimization)
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


## divide-before-multiply
Impact: Medium
Confidence: Medium
 - [ ] ID-11
[DevFund.receive()](contracts/DevFund/DevFund.sol#L14-L28) performs a multiplication on the result of a division:
	- [amountPerWeight = msg.value / totalDevWeight](contracts/DevFund/DevFund.sol#L16)
	- [remaining = msg.value - (amountPerWeight * totalDevWeight)](contracts/DevFund/DevFund.sol#L17)

contracts/DevFund/DevFund.sol#L14-L28


 - [ ] ID-12
[NukeFund.calculateAge(uint256)](contracts/NukeFund/NukeFund.sol#L118-L133) performs a multiplication on the result of a division:
	- [daysOld = (block.timestamp - nftContract.getTokenCreationTimestamp(tokenId)) / 60 / 60 / 24](contracts/NukeFund/NukeFund.sol#L121-L125)
	- [age = (daysOld * perfomanceFactor * MAX_DENOMINATOR * ageMultiplier) / 365](contracts/NukeFund/NukeFund.sol#L128-L131)

contracts/NukeFund/NukeFund.sol#L118-L133


## incorrect-equality
Impact: Medium
Confidence: High
 - [ ] ID-13
[EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185) uses a dangerous strict equality:
	- [slotIndex == slotIndexSelectionPoint && numberIndex == numberIndexSelectionPoint](contracts/EntropyGenerator/EntropyGenerator.sol#L171-L172)

contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185


 - [ ] ID-14
[EntityForging._resetForgingCountIfNeeded(uint256)](contracts/EntityForging/EntityForging.sol#L199-L207) uses a dangerous strict equality:
	- [lastForgeResetTimestamp[tokenId] == 0](contracts/EntityForging/EntityForging.sol#L201)

contracts/EntityForging/EntityForging.sol#L199-L207


 - [ ] ID-15
[EntropyGenerator.deriveTokenParameters(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161) uses a dangerous strict equality:
	- [isForger = role == 0](contracts/EntropyGenerator/EntropyGenerator.sol#L158)

contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161


 - [ ] ID-16
[DAOFund.receive()](contracts/DAOFund/DAOFund.sol#L16-L34) uses a dangerous strict equality:
	- [require(bool,string)(token.burn(token.balanceOf(address(this))) == true,Token burn failed)](contracts/DAOFund/DAOFund.sol#L30-L33)

contracts/DAOFund/DAOFund.sol#L16-L34


## reentrancy-no-eth
Impact: Medium
Confidence: Medium
 - [ ] ID-17
Reentrancy in [Airdrop.claim()](contracts/Airdrop/Airdrop.sol#L67-L74):
	External calls:
	- [traitToken.transfer(msg.sender,amount)](contracts/Airdrop/Airdrop.sol#L72)
	State variables written after the call(s):
	- [userInfo[msg.sender] = 0](contracts/Airdrop/Airdrop.sol#L73)
	[Airdrop.userInfo](contracts/Airdrop/Airdrop.sol#L18) can be used in cross function reentrancies:
	- [Airdrop.userInfo](contracts/Airdrop/Airdrop.sol#L18)

contracts/Airdrop/Airdrop.sol#L67-L74


 - [ ] ID-18
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


 - [ ] ID-19
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


 - [ ] ID-20
Reentrancy in [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32):
	External calls:
	- [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#L29)
	State variables written after the call(s):
	- [started = true](contracts/Airdrop/Airdrop.sol#L30)
	[Airdrop.started](contracts/Airdrop/Airdrop.sol#L11) can be used in cross function reentrancies:
	- [Airdrop.airdropStarted()](contracts/Airdrop/Airdrop.sol#L34-L36)
	- [Airdrop.allowDaoFund()](contracts/Airdrop/Airdrop.sol#L38-L42)

contracts/Airdrop/Airdrop.sol#L24-L32


 - [ ] ID-21
Reentrancy in [EntityTrading.cancelListing(uint256)](contracts/EntityTrading/EntityTrading.sol#L94-L109):
	External calls:
	- [nftContract.transferFrom(address(this),msg.sender,tokenId)](contracts/EntityTrading/EntityTrading.sol#L104)
	State variables written after the call(s):
	- [delete listings[listedTokenIds[tokenId]]](contracts/EntityTrading/EntityTrading.sol#L106)
	[EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#L20) can be used in cross function reentrancies:
	- [EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#L20)

contracts/EntityTrading/EntityTrading.sol#L94-L109


 - [ ] ID-22
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
 - [ ] ID-23
[DAOFund.receive()](contracts/DAOFund/DAOFund.sol#L16-L34) ignores return value by [uniswapV2Router.swapExactETHForTokens{value: msg.value}(0,path,address(this),block.timestamp)](contracts/DAOFund/DAOFund.sol#L23-L28)

contracts/DAOFund/DAOFund.sol#L16-L34


## events-maths
Impact: Low
Confidence: Medium
 - [ ] ID-24
[EntityTrading.setTaxCut(uint256)](contracts/EntityTrading/EntityTrading.sol#L33-L35) should emit an event for: 
	- [taxCut = _taxCut](contracts/EntityTrading/EntityTrading.sol#L34) 

contracts/EntityTrading/EntityTrading.sol#L33-L35


 - [ ] ID-25
[NukeFund.setMaxAllowedClaimDivisor(uint256)](contracts/NukeFund/NukeFund.sol#L75-L77) should emit an event for: 
	- [maxAllowedClaimDivisor = value](contracts/NukeFund/NukeFund.sol#L76) 

contracts/NukeFund/NukeFund.sol#L75-L77


 - [ ] ID-26
[NukeFund.setAgeMultplier(uint256)](contracts/NukeFund/NukeFund.sol#L109-L111) should emit an event for: 
	- [ageMultiplier = _ageMultiplier](contracts/NukeFund/NukeFund.sol#L110) 

contracts/NukeFund/NukeFund.sol#L109-L111


 - [ ] ID-27
[TraitForgeNft.setStartPrice(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L100-L102) should emit an event for: 
	- [startPrice = _startPrice](contracts/TraitForgeNft/TraitForgeNft.sol#L101) 

contracts/TraitForgeNft/TraitForgeNft.sol#L100-L102


 - [ ] ID-28
[Airdrop.addUserAmount(address,uint256)](contracts/Airdrop/Airdrop.sol#L48-L55) should emit an event for: 
	- [totalValue += amount](contracts/Airdrop/Airdrop.sol#L54) 

contracts/Airdrop/Airdrop.sol#L48-L55


 - [ ] ID-29
[TraitForgeNft.setPriceIncrement(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L104-L106) should emit an event for: 
	- [priceIncrement = _priceIncrement](contracts/TraitForgeNft/TraitForgeNft.sol#L105) 

contracts/TraitForgeNft/TraitForgeNft.sol#L104-L106


 - [ ] ID-30
[Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32) should emit an event for: 
	- [totalTokenAmount = amount](contracts/Airdrop/Airdrop.sol#L31) 

contracts/Airdrop/Airdrop.sol#L24-L32


 - [ ] ID-31
[NukeFund.setTaxCut(uint256)](contracts/NukeFund/NukeFund.sol#L63-L65) should emit an event for: 
	- [taxCut = _taxCut](contracts/NukeFund/NukeFund.sol#L64) 

contracts/NukeFund/NukeFund.sol#L63-L65


 - [ ] ID-32
[TraitForgeNft.setPriceIncrementByGen(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L108-L112) should emit an event for: 
	- [priceIncrementByGen = _priceIncrementByGen](contracts/TraitForgeNft/TraitForgeNft.sol#L111) 

contracts/TraitForgeNft/TraitForgeNft.sol#L108-L112


 - [ ] ID-33
[Airdrop.subUserAmount(address,uint256)](contracts/Airdrop/Airdrop.sol#L57-L65) should emit an event for: 
	- [totalValue -= amount](contracts/Airdrop/Airdrop.sol#L64) 

contracts/Airdrop/Airdrop.sol#L57-L65


 - [ ] ID-34
[NukeFund.setNukeFactorMaxParam(uint256)](contracts/NukeFund/NukeFund.sol#L79-L81) should emit an event for: 
	- [nukeFactorMaxParam = value](contracts/NukeFund/NukeFund.sol#L80) 

contracts/NukeFund/NukeFund.sol#L79-L81


 - [ ] ID-35
[NukeFund.setMinimumDaysHeld(uint256)](contracts/NukeFund/NukeFund.sol#L67-L69) should emit an event for: 
	- [minimumDaysHeld = value](contracts/NukeFund/NukeFund.sol#L68) 

contracts/NukeFund/NukeFund.sol#L67-L69


 - [ ] ID-36
[EntityForging.setOneYearInDays(uint256)](contracts/EntityForging/EntityForging.sol#L40-L42) should emit an event for: 
	- [oneYearInDays = value](contracts/EntityForging/EntityForging.sol#L41) 

contracts/EntityForging/EntityForging.sol#L40-L42


 - [ ] ID-37
[NukeFund.setDefaultNukeFactorIncrease(uint256)](contracts/NukeFund/NukeFund.sol#L71-L73) should emit an event for: 
	- [defaultNukeFactorIncrease = value](contracts/NukeFund/NukeFund.sol#L72) 

contracts/NukeFund/NukeFund.sol#L71-L73


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-38
[EntropyGenerator.setAllowedCaller(address)._allowedCaller](contracts/EntropyGenerator/EntropyGenerator.sol#L36) lacks a zero-check on :
		- [allowedCaller = _allowedCaller](contracts/EntropyGenerator/EntropyGenerator.sol#L37)

contracts/EntropyGenerator/EntropyGenerator.sol#L36


 - [ ] ID-39
[EntityForging.forgeWithListed(uint256,uint256).forgerOwner](contracts/EntityForging/EntityForging.sol#L148) lacks a zero-check on :
		- [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)

contracts/EntityForging/EntityForging.sol#L148


 - [ ] ID-40
[EntropyGenerator.constructor(address)._traitForgetNft](contracts/EntropyGenerator/EntropyGenerator.sol#L30) lacks a zero-check on :
		- [allowedCaller = _traitForgetNft](contracts/EntropyGenerator/EntropyGenerator.sol#L31)

contracts/EntropyGenerator/EntropyGenerator.sol#L30


 - [ ] ID-41
[EntityTrading.setNukeFundAddress(address)._nukeFundAddress](contracts/EntityTrading/EntityTrading.sol#L28) lacks a zero-check on :
		- [nukeFundAddress = _nukeFundAddress](contracts/EntityTrading/EntityTrading.sol#L30)

contracts/EntityTrading/EntityTrading.sol#L28


 - [ ] ID-42
[NukeFund.constructor(address,address,address,address)._daoAddress](contracts/NukeFund/NukeFund.sol#L31) lacks a zero-check on :
		- [daoAddress = _daoAddress](contracts/NukeFund/NukeFund.sol#L36)

contracts/NukeFund/NukeFund.sol#L31


 - [ ] ID-43
[NukeFund.setDaoAddress(address).account](contracts/NukeFund/NukeFund.sol#L99) lacks a zero-check on :
		- [daoAddress = account](contracts/NukeFund/NukeFund.sol#L100)

contracts/NukeFund/NukeFund.sol#L99


 - [ ] ID-44
[NukeFund.setDevAddress(address).account](contracts/NukeFund/NukeFund.sol#L94) lacks a zero-check on :
		- [devAddress = account](contracts/NukeFund/NukeFund.sol#L95)

contracts/NukeFund/NukeFund.sol#L94


 - [ ] ID-45
[TraitForgeNft.setNukeFundContract(address)._nukeFundAddress](contracts/TraitForgeNft/TraitForgeNft.sol#L67) lacks a zero-check on :
		- [nukeFundAddress = _nukeFundAddress](contracts/TraitForgeNft/TraitForgeNft.sol#L69)

contracts/TraitForgeNft/TraitForgeNft.sol#L67


 - [ ] ID-46
[EntityForging.setNukeFundAddress(address)._nukeFundAddress](contracts/EntityForging/EntityForging.sol#L31) lacks a zero-check on :
		- [nukeFundAddress = _nukeFundAddress](contracts/EntityForging/EntityForging.sol#L33)

contracts/EntityForging/EntityForging.sol#L31


 - [ ] ID-47
[NukeFund.constructor(address,address,address,address)._devAddress](contracts/NukeFund/NukeFund.sol#L30) lacks a zero-check on :
		- [devAddress = _devAddress](contracts/NukeFund/NukeFund.sol#L35)

contracts/NukeFund/NukeFund.sol#L30


## calls-loop
Impact: Low
Confidence: Medium
 - [ ] ID-48
[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395) has external calls inside a loop: [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)

contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395


 - [ ] ID-49
[TraitForgeNft._incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355) has external calls inside a loop: [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)

contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355


 - [ ] ID-50
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has external calls inside a loop: [entropyValue = entropyGenerator.getNextEntropy()](contracts/TraitForgeNft/TraitForgeNft.sol#L288)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-51
[TraitForgeNft._distributeFunds(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365) has external calls inside a loop: [(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#L361)

contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365


 - [ ] ID-52
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has external calls inside a loop: [airdropContract.addUserAmount(to,entropyValue)](contracts/TraitForgeNft/TraitForgeNft.sol#L297)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-53
[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395) has external calls inside a loop: [listing = entityForgingContract.getListings(listedId)](contracts/TraitForgeNft/TraitForgeNft.sol#L382-L384)

contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395


 - [ ] ID-54
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has external calls inside a loop: [! airdropContract.airdropStarted()](contracts/TraitForgeNft/TraitForgeNft.sol#L296)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-55
[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395) has external calls inside a loop: [listedId = entityForgingContract.getListedTokenIds(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L375)

contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-56
Reentrancy in [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32):
	External calls:
	- [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#L29)
	State variables written after the call(s):
	- [totalTokenAmount = amount](contracts/Airdrop/Airdrop.sol#L31)

contracts/Airdrop/Airdrop.sol#L24-L32


 - [ ] ID-57
Reentrancy in [TraitForgeNft._mintNewEntity(address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L311-L343):
	External calls:
	- [_mint(newOwner,newTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L323)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	State variables written after the call(s):
	- [initialOwners[newTokenId] = newOwner](contracts/TraitForgeNft/TraitForgeNft.sol#L329)
	- [tokenCreationTimestamps[newTokenId] = block.timestamp](contracts/TraitForgeNft/TraitForgeNft.sol#L325)
	- [tokenEntropy[newTokenId] = entropy](contracts/TraitForgeNft/TraitForgeNft.sol#L326)
	- [tokenGenerations[newTokenId] = gen](contracts/TraitForgeNft/TraitForgeNft.sol#L327)

contracts/TraitForgeNft/TraitForgeNft.sol#L311-L343


 - [ ] ID-58
Reentrancy in [TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309):
	External calls:
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L282)
		- [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)
	- [_mint(to,newItemId)](contracts/TraitForgeNft/TraitForgeNft.sol#L287)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	- [entropyValue = entropyGenerator.getNextEntropy()](contracts/TraitForgeNft/TraitForgeNft.sol#L288)
	State variables written after the call(s):
	- [initialOwners[newItemId] = to](contracts/TraitForgeNft/TraitForgeNft.sol#L294)
	- [tokenCreationTimestamps[newItemId] = block.timestamp](contracts/TraitForgeNft/TraitForgeNft.sol#L290)
	- [tokenEntropy[newItemId] = entropyValue](contracts/TraitForgeNft/TraitForgeNft.sol#L291)
	- [tokenGenerations[newItemId] = currentGeneration](contracts/TraitForgeNft/TraitForgeNft.sol#L292)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-59
Reentrancy in [TraitForgeNft.burn(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L141-L151):
	External calls:
	- [airdropContract.subUserAmount(initialOwners[tokenId],entropy)](contracts/TraitForgeNft/TraitForgeNft.sol#L148)
	- [_burn(tokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L150)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	State variables written after the call(s):
	- [_burn(tokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L150)
		- [lastTokenTransferredTimestamp[firstTokenId] = block.timestamp](contracts/TraitForgeNft/TraitForgeNft.sol#L378)

contracts/TraitForgeNft/TraitForgeNft.sol#L141-L151


 - [ ] ID-60
Reentrancy in [TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309):
	External calls:
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L282)
		- [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)
	State variables written after the call(s):
	- [_tokenIds ++](contracts/TraitForgeNft/TraitForgeNft.sol#L285)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-61
Reentrancy in [TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309):
	External calls:
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L282)
		- [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)
	- [_mint(to,newItemId)](contracts/TraitForgeNft/TraitForgeNft.sol#L287)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	State variables written after the call(s):
	- [_mint(to,newItemId)](contracts/TraitForgeNft/TraitForgeNft.sol#L287)
		- [lastTokenTransferredTimestamp[firstTokenId] = block.timestamp](contracts/TraitForgeNft/TraitForgeNft.sol#L378)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-62
Reentrancy in [EntityTrading.listNFTForSale(uint256,uint256)](contracts/EntityTrading/EntityTrading.sol#L38-L60):
	External calls:
	- [nftContract.transferFrom(msg.sender,address(this),tokenId)](contracts/EntityTrading/EntityTrading.sol#L53)
	State variables written after the call(s):
	- [listedTokenIds[tokenId] = listingCount](contracts/EntityTrading/EntityTrading.sol#L57)
	- [++ listingCount](contracts/EntityTrading/EntityTrading.sol#L55)
	- [listings[listingCount] = Listing(msg.sender,tokenId,price,true)](contracts/EntityTrading/EntityTrading.sol#L56)

contracts/EntityTrading/EntityTrading.sol#L38-L60


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-63
Reentrancy in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	External calls:
	- [(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)
	Event emitted after the call(s):
	- [DevShareDistributed(devShare)](contracts/NukeFund/NukeFund.sol#L49)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-64
Reentrancy in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	External calls:
	- [(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)
	- [(success_scope_0,None) = address(owner()).call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L51)
	- [(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)
	Event emitted after the call(s):
	- [FundBalanceUpdated(fund)](contracts/NukeFund/NukeFund.sol#L60)
	- [FundReceived(msg.sender,msg.value)](contracts/NukeFund/NukeFund.sol#L59)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-65
Reentrancy in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	External calls:
	- [(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)
	Event emitted after the call(s):
	- [DevShareDistributed(devShare)](contracts/NukeFund/NukeFund.sol#L56)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-66
Reentrancy in [DevFund.receive()](contracts/DevFund/DevFund.sol#L14-L28):
	External calls:
	- [(success,None) = address(owner()).call{value: remaining}()](contracts/DevFund/DevFund.sol#L20)
	- [(success_scope_0,None) = address(owner()).call{value: msg.value}()](contracts/DevFund/DevFund.sol#L24)
	Event emitted after the call(s):
	- [FundReceived(msg.sender,msg.value)](contracts/DevFund/DevFund.sol#L27)

contracts/DevFund/DevFund.sol#L14-L28


## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-67
[NukeFund.canTokenBeNuked(uint256)](contracts/NukeFund/NukeFund.sol#L184-L194) uses timestamp for comparisons
	Dangerous comparisons:
	- [tokenAgeInSeconds >= minimumDaysHeld](contracts/NukeFund/NukeFund.sol#L193)

contracts/NukeFund/NukeFund.sol#L184-L194


 - [ ] ID-68
[EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185) uses timestamp for comparisons
	Dangerous comparisons:
	- [slotIndex == slotIndexSelectionPoint && numberIndex == numberIndexSelectionPoint](contracts/EntropyGenerator/EntropyGenerator.sol#L171-L172)

contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185


 - [ ] ID-69
[EntityForging._resetForgingCountIfNeeded(uint256)](contracts/EntityForging/EntityForging.sol#L199-L207) uses timestamp for comparisons
	Dangerous comparisons:
	- [lastForgeResetTimestamp[tokenId] == 0](contracts/EntityForging/EntityForging.sol#L201)
	- [block.timestamp >= lastForgeResetTimestamp[tokenId] + oneYear](contracts/EntityForging/EntityForging.sol#L203)

contracts/EntityForging/EntityForging.sol#L199-L207


 - [ ] ID-70
[NukeFund.nuke(uint256)](contracts/NukeFund/NukeFund.sol#L153-L182) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(success,Failed to send Ether)](contracts/NukeFund/NukeFund.sol#L178)
	- [finalNukeFactor > nukeFactorMaxParam](contracts/NukeFund/NukeFund.sol#L170-L172)

contracts/NukeFund/NukeFund.sol#L153-L182


## boolean-equal
Impact: Informational
Confidence: High
 - [ ] ID-71
[DAOFund.receive()](contracts/DAOFund/DAOFund.sol#L16-L34) compares to a boolean constant:
	-[require(bool,string)(token.burn(token.balanceOf(address(this))) == true,Token burn failed)](contracts/DAOFund/DAOFund.sol#L30-L33)

contracts/DAOFund/DAOFund.sol#L16-L34


## costly-loop
Impact: Informational
Confidence: Medium
 - [ ] ID-72
[TraitForgeNft._incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355) has costly operations inside a loop:
	- [priceIncrement = priceIncrement + priceIncrementByGen](contracts/TraitForgeNft/TraitForgeNft.sol#L352)

contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355


 - [ ] ID-73
[TraitForgeNft._incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355) has costly operations inside a loop:
	- [currentGeneration ++](contracts/TraitForgeNft/TraitForgeNft.sol#L350)

contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355


 - [ ] ID-74
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has costly operations inside a loop:
	- [_tokenIds ++](contracts/TraitForgeNft/TraitForgeNft.sol#L285)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-75
Low level call in [EntityForging.forgeWithListed(uint256,uint256)](contracts/EntityForging/EntityForging.sol#L102-L175):
	- [(success,None) = nukeFundAddress.call{value: devFee}()](contracts/EntityForging/EntityForging.sol#L156)
	- [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)

contracts/EntityForging/EntityForging.sol#L102-L175


 - [ ] ID-76
Low level call in [TraitForgeNft.mintToken(bytes32[])](contracts/TraitForgeNft/TraitForgeNft.sol#L181-L200):
	- [(refundSuccess,None) = msg.sender.call{value: excessPayment}()](contracts/TraitForgeNft/TraitForgeNft.sol#L197)

contracts/TraitForgeNft/TraitForgeNft.sol#L181-L200


 - [ ] ID-77
Low level call in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	- [(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)
	- [(success_scope_0,None) = address(owner()).call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L51)
	- [(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-78
Low level call in [EntityTrading.buyNFT(uint256)](contracts/EntityTrading/EntityTrading.sol#L63-L92):
	- [(success,None) = address(listing.seller).call{value: sellerProceeds}()](contracts/EntityTrading/EntityTrading.sol#L77-L79)

contracts/EntityTrading/EntityTrading.sol#L63-L92


 - [ ] ID-79
Low level call in [EntityTrading.transferToNukeFund(uint256)](contracts/EntityTrading/EntityTrading.sol#L112-L117):
	- [(success,None) = nukeFundAddress.call{value: amount}()](contracts/EntityTrading/EntityTrading.sol#L114)

contracts/EntityTrading/EntityTrading.sol#L112-L117


 - [ ] ID-80
Low level call in [DevFund.safeRewardTransfer(address,uint256)](contracts/DevFund/DevFund.sol#L83-L92):
	- [(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#L89)

contracts/DevFund/DevFund.sol#L83-L92


 - [ ] ID-81
Low level call in [DevFund.receive()](contracts/DevFund/DevFund.sol#L14-L28):
	- [(success,None) = address(owner()).call{value: remaining}()](contracts/DevFund/DevFund.sol#L20)
	- [(success_scope_0,None) = address(owner()).call{value: msg.value}()](contracts/DevFund/DevFund.sol#L24)

contracts/DevFund/DevFund.sol#L14-L28


 - [ ] ID-82
Low level call in [TraitForgeNft.mintWithBudget(bytes32[])](contracts/TraitForgeNft/TraitForgeNft.sol#L202-L225):
	- [(refundSuccess,None) = msg.sender.call{value: budgetLeft}()](contracts/TraitForgeNft/TraitForgeNft.sol#L222)

contracts/TraitForgeNft/TraitForgeNft.sol#L202-L225


 - [ ] ID-83
Low level call in [NukeFund.nuke(uint256)](contracts/NukeFund/NukeFund.sol#L153-L182):
	- [(success,None) = address(msg.sender).call{value: claimAmount}()](contracts/NukeFund/NukeFund.sol#L177)

contracts/NukeFund/NukeFund.sol#L153-L182


 - [ ] ID-84
Low level call in [TraitForgeNft._distributeFunds(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365):
	- [(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#L361)

contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365


## too-many-digits
Impact: Informational
Confidence: Medium
 - [ ] ID-85
[EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185) uses literals with too many digits:
	- [entropy = (slotValue / (10 ** (72 - position))) % 1000000](contracts/EntropyGenerator/EntropyGenerator.sol#L181)

contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185


 - [ ] ID-86
[TraitForgeNft.slitherConstructorVariables()](contracts/TraitForgeNft/TraitForgeNft.sol#L14-L396) uses literals with too many digits:
	- [priceIncrementByGen = 5000000000000](contracts/TraitForgeNft/TraitForgeNft.sol#L25)

contracts/TraitForgeNft/TraitForgeNft.sol#L14-L396


 - [ ] ID-87
[NukeFund.slitherConstructorConstantVariables()](contracts/NukeFund/NukeFund.sol#L11-L195) uses literals with too many digits:
	- [MAX_DENOMINATOR = 100000](contracts/NukeFund/NukeFund.sol#L12)

contracts/NukeFund/NukeFund.sol#L11-L195


 - [ ] ID-88
[EntropyGenerator.deriveTokenParameters(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161) uses literals with too many digits:
	- [nukeFactor = entropy / 4000000](contracts/EntropyGenerator/EntropyGenerator.sol#L152)

contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161


## unused-import
Impact: Informational
Confidence: High
 - [ ] ID-89
The following unused import(s) in contracts/EntityTrading/EntityTrading.sol should be removed:
	-import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol'; (contracts/EntityTrading/EntityTrading.sol#4)

## constable-states
Impact: Optimization
Confidence: High
 - [ ] ID-90
[EntropyGenerator.batchSize1](contracts/EntropyGenerator/EntropyGenerator.sol#L14) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L14


 - [ ] ID-91
[EntropyGenerator.maxNumberIndex](contracts/EntropyGenerator/EntropyGenerator.sol#L18) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L18


 - [ ] ID-92
[EntropyGenerator.maxSlotIndex](contracts/EntropyGenerator/EntropyGenerator.sol#L17) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L17


 - [ ] ID-93
[EntropyGenerator.batchSize2](contracts/EntropyGenerator/EntropyGenerator.sol#L15) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L15


 - [ ] ID-94
[TraitForgeNft.maxTokensPerGen](contracts/TraitForgeNft/TraitForgeNft.sol#L22) should be constant 

contracts/TraitForgeNft/TraitForgeNft.sol#L22


## immutable-states
Impact: Optimization
Confidence: High
 - [ ] ID-95
[DAOFund.token](contracts/DAOFund/DAOFund.sol#L8) should be immutable 

contracts/DAOFund/DAOFund.sol#L8


 - [ ] ID-96
[DAOFund.uniswapV2Router](contracts/DAOFund/DAOFund.sol#L9) should be immutable 

contracts/DAOFund/DAOFund.sol#L9


 - [ ] ID-97
[EntityTrading.nftContract](contracts/EntityTrading/EntityTrading.sol#L12) should be immutable 

contracts/EntityTrading/EntityTrading.sol#L12


 - [ ] ID-98
[Trait._decimals](contracts/Trait/Trait.sol#L8) should be immutable 

contracts/Trait/Trait.sol#L8


 - [ ] ID-99
[EntityForging.nftContract](contracts/EntityForging/EntityForging.sol#L11) should be immutable 

contracts/EntityForging/EntityForging.sol#L11


