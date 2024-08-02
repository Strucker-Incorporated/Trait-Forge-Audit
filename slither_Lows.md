Summary
 - [events-maths](#events-maths) (14 results) (Low)
 - [missing-zero-check](#missing-zero-check) (10 results) (Low)
 - [calls-loop](#calls-loop) (8 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (7 results) (Low)
 - [reentrancy-events](#reentrancy-events) (4 results) (Low)
 - [timestamp](#timestamp) (4 results) (Low)
## events-maths
Impact: Low
Confidence: Medium
 - [ ] ID-0
[EntityTrading.setTaxCut(uint256)](contracts/EntityTrading/EntityTrading.sol#L33-L35) should emit an event for: 
	- [taxCut = _taxCut](contracts/EntityTrading/EntityTrading.sol#L34) 

contracts/EntityTrading/EntityTrading.sol#L33-L35


 - [ ] ID-1
[NukeFund.setMaxAllowedClaimDivisor(uint256)](contracts/NukeFund/NukeFund.sol#L75-L77) should emit an event for: 
	- [maxAllowedClaimDivisor = value](contracts/NukeFund/NukeFund.sol#L76) 

contracts/NukeFund/NukeFund.sol#L75-L77


 - [ ] ID-2
[NukeFund.setAgeMultplier(uint256)](contracts/NukeFund/NukeFund.sol#L109-L111) should emit an event for: 
	- [ageMultiplier = _ageMultiplier](contracts/NukeFund/NukeFund.sol#L110) 

contracts/NukeFund/NukeFund.sol#L109-L111


 - [ ] ID-3
[TraitForgeNft.setStartPrice(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L100-L102) should emit an event for: 
	- [startPrice = _startPrice](contracts/TraitForgeNft/TraitForgeNft.sol#L101) 

contracts/TraitForgeNft/TraitForgeNft.sol#L100-L102


 - [ ] ID-4
[Airdrop.addUserAmount(address,uint256)](contracts/Airdrop/Airdrop.sol#L48-L55) should emit an event for: 
	- [totalValue += amount](contracts/Airdrop/Airdrop.sol#L54) 

contracts/Airdrop/Airdrop.sol#L48-L55


 - [ ] ID-5
[TraitForgeNft.setPriceIncrement(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L104-L106) should emit an event for: 
	- [priceIncrement = _priceIncrement](contracts/TraitForgeNft/TraitForgeNft.sol#L105) 

contracts/TraitForgeNft/TraitForgeNft.sol#L104-L106


 - [ ] ID-6
[Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32) should emit an event for: 
	- [totalTokenAmount = amount](contracts/Airdrop/Airdrop.sol#L31) 

contracts/Airdrop/Airdrop.sol#L24-L32


 - [ ] ID-7
[NukeFund.setTaxCut(uint256)](contracts/NukeFund/NukeFund.sol#L63-L65) should emit an event for: 
	- [taxCut = _taxCut](contracts/NukeFund/NukeFund.sol#L64) 

contracts/NukeFund/NukeFund.sol#L63-L65


 - [ ] ID-8
[TraitForgeNft.setPriceIncrementByGen(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L108-L112) should emit an event for: 
	- [priceIncrementByGen = _priceIncrementByGen](contracts/TraitForgeNft/TraitForgeNft.sol#L111) 

contracts/TraitForgeNft/TraitForgeNft.sol#L108-L112


 - [ ] ID-9
[Airdrop.subUserAmount(address,uint256)](contracts/Airdrop/Airdrop.sol#L57-L65) should emit an event for: 
	- [totalValue -= amount](contracts/Airdrop/Airdrop.sol#L64) 

contracts/Airdrop/Airdrop.sol#L57-L65


 - [ ] ID-10
[NukeFund.setNukeFactorMaxParam(uint256)](contracts/NukeFund/NukeFund.sol#L79-L81) should emit an event for: 
	- [nukeFactorMaxParam = value](contracts/NukeFund/NukeFund.sol#L80) 

contracts/NukeFund/NukeFund.sol#L79-L81


 - [ ] ID-11
[NukeFund.setMinimumDaysHeld(uint256)](contracts/NukeFund/NukeFund.sol#L67-L69) should emit an event for: 
	- [minimumDaysHeld = value](contracts/NukeFund/NukeFund.sol#L68) 

contracts/NukeFund/NukeFund.sol#L67-L69


 - [ ] ID-12
[EntityForging.setOneYearInDays(uint256)](contracts/EntityForging/EntityForging.sol#L40-L42) should emit an event for: 
	- [oneYearInDays = value](contracts/EntityForging/EntityForging.sol#L41) 

contracts/EntityForging/EntityForging.sol#L40-L42


 - [ ] ID-13
[NukeFund.setDefaultNukeFactorIncrease(uint256)](contracts/NukeFund/NukeFund.sol#L71-L73) should emit an event for: 
	- [defaultNukeFactorIncrease = value](contracts/NukeFund/NukeFund.sol#L72) 

contracts/NukeFund/NukeFund.sol#L71-L73


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-14
[EntropyGenerator.setAllowedCaller(address)._allowedCaller](contracts/EntropyGenerator/EntropyGenerator.sol#L36) lacks a zero-check on :
		- [allowedCaller = _allowedCaller](contracts/EntropyGenerator/EntropyGenerator.sol#L37)

contracts/EntropyGenerator/EntropyGenerator.sol#L36


 - [ ] ID-15
[EntityForging.forgeWithListed(uint256,uint256).forgerOwner](contracts/EntityForging/EntityForging.sol#L148) lacks a zero-check on :
		- [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)

contracts/EntityForging/EntityForging.sol#L148


 - [ ] ID-16
[EntropyGenerator.constructor(address)._traitForgetNft](contracts/EntropyGenerator/EntropyGenerator.sol#L30) lacks a zero-check on :
		- [allowedCaller = _traitForgetNft](contracts/EntropyGenerator/EntropyGenerator.sol#L31)

contracts/EntropyGenerator/EntropyGenerator.sol#L30


 - [ ] ID-17
[EntityTrading.setNukeFundAddress(address)._nukeFundAddress](contracts/EntityTrading/EntityTrading.sol#L28) lacks a zero-check on :
		- [nukeFundAddress = _nukeFundAddress](contracts/EntityTrading/EntityTrading.sol#L30)

contracts/EntityTrading/EntityTrading.sol#L28


 - [ ] ID-18
[NukeFund.constructor(address,address,address,address)._daoAddress](contracts/NukeFund/NukeFund.sol#L31) lacks a zero-check on :
		- [daoAddress = _daoAddress](contracts/NukeFund/NukeFund.sol#L36)

contracts/NukeFund/NukeFund.sol#L31


 - [ ] ID-19
[NukeFund.setDaoAddress(address).account](contracts/NukeFund/NukeFund.sol#L99) lacks a zero-check on :
		- [daoAddress = account](contracts/NukeFund/NukeFund.sol#L100)

contracts/NukeFund/NukeFund.sol#L99


 - [ ] ID-20
[NukeFund.setDevAddress(address).account](contracts/NukeFund/NukeFund.sol#L94) lacks a zero-check on :
		- [devAddress = account](contracts/NukeFund/NukeFund.sol#L95)

contracts/NukeFund/NukeFund.sol#L94


 - [ ] ID-21
[TraitForgeNft.setNukeFundContract(address)._nukeFundAddress](contracts/TraitForgeNft/TraitForgeNft.sol#L67) lacks a zero-check on :
		- [nukeFundAddress = _nukeFundAddress](contracts/TraitForgeNft/TraitForgeNft.sol#L69)

contracts/TraitForgeNft/TraitForgeNft.sol#L67


 - [ ] ID-22
[EntityForging.setNukeFundAddress(address)._nukeFundAddress](contracts/EntityForging/EntityForging.sol#L31) lacks a zero-check on :
		- [nukeFundAddress = _nukeFundAddress](contracts/EntityForging/EntityForging.sol#L33)

contracts/EntityForging/EntityForging.sol#L31


 - [ ] ID-23
[NukeFund.constructor(address,address,address,address)._devAddress](contracts/NukeFund/NukeFund.sol#L30) lacks a zero-check on :
		- [devAddress = _devAddress](contracts/NukeFund/NukeFund.sol#L35)

contracts/NukeFund/NukeFund.sol#L30


## calls-loop
Impact: Low
Confidence: Medium
 - [ ] ID-24
[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395) has external calls inside a loop: [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)

contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395


 - [ ] ID-25
[TraitForgeNft._incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355) has external calls inside a loop: [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)

contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355


 - [ ] ID-26
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has external calls inside a loop: [entropyValue = entropyGenerator.getNextEntropy()](contracts/TraitForgeNft/TraitForgeNft.sol#L288)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-27
[TraitForgeNft._distributeFunds(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365) has external calls inside a loop: [(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#L361)

contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365


 - [ ] ID-28
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has external calls inside a loop: [airdropContract.addUserAmount(to,entropyValue)](contracts/TraitForgeNft/TraitForgeNft.sol#L297)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-29
[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395) has external calls inside a loop: [listing = entityForgingContract.getListings(listedId)](contracts/TraitForgeNft/TraitForgeNft.sol#L382-L384)

contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395


 - [ ] ID-30
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has external calls inside a loop: [! airdropContract.airdropStarted()](contracts/TraitForgeNft/TraitForgeNft.sol#L296)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-31
[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395) has external calls inside a loop: [listedId = entityForgingContract.getListedTokenIds(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L375)

contracts/TraitForgeNft/TraitForgeNft.sol#L367-L395


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-32
Reentrancy in [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#L24-L32):
	External calls:
	- [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#L29)
	State variables written after the call(s):
	- [totalTokenAmount = amount](contracts/Airdrop/Airdrop.sol#L31)

contracts/Airdrop/Airdrop.sol#L24-L32


 - [ ] ID-33
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


 - [ ] ID-34
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


 - [ ] ID-35
Reentrancy in [TraitForgeNft.burn(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L141-L151):
	External calls:
	- [airdropContract.subUserAmount(initialOwners[tokenId],entropy)](contracts/TraitForgeNft/TraitForgeNft.sol#L148)
	- [_burn(tokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L150)
		- [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L390)
	State variables written after the call(s):
	- [_burn(tokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#L150)
		- [lastTokenTransferredTimestamp[firstTokenId] = block.timestamp](contracts/TraitForgeNft/TraitForgeNft.sol#L378)

contracts/TraitForgeNft/TraitForgeNft.sol#L141-L151


 - [ ] ID-36
Reentrancy in [TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309):
	External calls:
	- [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L282)
		- [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#L353)
	State variables written after the call(s):
	- [_tokenIds ++](contracts/TraitForgeNft/TraitForgeNft.sol#L285)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


 - [ ] ID-37
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


 - [ ] ID-38
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
 - [ ] ID-39
Reentrancy in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	External calls:
	- [(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)
	Event emitted after the call(s):
	- [DevShareDistributed(devShare)](contracts/NukeFund/NukeFund.sol#L49)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-40
Reentrancy in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	External calls:
	- [(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)
	- [(success_scope_0,None) = address(owner()).call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L51)
	- [(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)
	Event emitted after the call(s):
	- [FundBalanceUpdated(fund)](contracts/NukeFund/NukeFund.sol#L60)
	- [FundReceived(msg.sender,msg.value)](contracts/NukeFund/NukeFund.sol#L59)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-41
Reentrancy in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	External calls:
	- [(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)
	Event emitted after the call(s):
	- [DevShareDistributed(devShare)](contracts/NukeFund/NukeFund.sol#L56)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-42
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
 - [ ] ID-43
[NukeFund.canTokenBeNuked(uint256)](contracts/NukeFund/NukeFund.sol#L184-L194) uses timestamp for comparisons
	Dangerous comparisons:
	- [tokenAgeInSeconds >= minimumDaysHeld](contracts/NukeFund/NukeFund.sol#L193)

contracts/NukeFund/NukeFund.sol#L184-L194


 - [ ] ID-44
[EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185) uses timestamp for comparisons
	Dangerous comparisons:
	- [slotIndex == slotIndexSelectionPoint && numberIndex == numberIndexSelectionPoint](contracts/EntropyGenerator/EntropyGenerator.sol#L171-L172)

contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185


 - [ ] ID-45
[EntityForging._resetForgingCountIfNeeded(uint256)](contracts/EntityForging/EntityForging.sol#L199-L207) uses timestamp for comparisons
	Dangerous comparisons:
	- [lastForgeResetTimestamp[tokenId] == 0](contracts/EntityForging/EntityForging.sol#L201)
	- [block.timestamp >= lastForgeResetTimestamp[tokenId] + oneYear](contracts/EntityForging/EntityForging.sol#L203)

contracts/EntityForging/EntityForging.sol#L199-L207


 - [ ] ID-46
[NukeFund.nuke(uint256)](contracts/NukeFund/NukeFund.sol#L153-L182) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(success,Failed to send Ether)](contracts/NukeFund/NukeFund.sol#L178)
	- [finalNukeFactor > nukeFactorMaxParam](contracts/NukeFund/NukeFund.sol#L170-L172)

contracts/NukeFund/NukeFund.sol#L153-L182


