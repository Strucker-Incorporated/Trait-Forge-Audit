Summary
 - [boolean-equal](#boolean-equal) (1 results) (Informational)
 - [costly-loop](#costly-loop) (3 results) (Informational)
 - [low-level-calls](#low-level-calls) (10 results) (Informational)
 - [too-many-digits](#too-many-digits) (4 results) (Informational)
 - [unused-import](#unused-import) (1 results) (Informational)
## boolean-equal
Impact: Informational
Confidence: High
 - [ ] ID-0
[DAOFund.receive()](contracts/DAOFund/DAOFund.sol#L16-L34) compares to a boolean constant:
	-[require(bool,string)(token.burn(token.balanceOf(address(this))) == true,Token burn failed)](contracts/DAOFund/DAOFund.sol#L30-L33)

contracts/DAOFund/DAOFund.sol#L16-L34


## costly-loop
Impact: Informational
Confidence: Medium
 - [ ] ID-1
[TraitForgeNft._incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355) has costly operations inside a loop:
	- [priceIncrement = priceIncrement + priceIncrementByGen](contracts/TraitForgeNft/TraitForgeNft.sol#L352)

contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355


 - [ ] ID-2
[TraitForgeNft._incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355) has costly operations inside a loop:
	- [currentGeneration ++](contracts/TraitForgeNft/TraitForgeNft.sol#L350)

contracts/TraitForgeNft/TraitForgeNft.sol#L345-L355


 - [ ] ID-3
[TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309) has costly operations inside a loop:
	- [_tokenIds ++](contracts/TraitForgeNft/TraitForgeNft.sol#L285)

contracts/TraitForgeNft/TraitForgeNft.sol#L280-L309


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-4
Low level call in [EntityForging.forgeWithListed(uint256,uint256)](contracts/EntityForging/EntityForging.sol#L102-L175):
	- [(success,None) = nukeFundAddress.call{value: devFee}()](contracts/EntityForging/EntityForging.sol#L156)
	- [(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)

contracts/EntityForging/EntityForging.sol#L102-L175


 - [ ] ID-5
Low level call in [TraitForgeNft.mintToken(bytes32[])](contracts/TraitForgeNft/TraitForgeNft.sol#L181-L200):
	- [(refundSuccess,None) = msg.sender.call{value: excessPayment}()](contracts/TraitForgeNft/TraitForgeNft.sol#L197)

contracts/TraitForgeNft/TraitForgeNft.sol#L181-L200


 - [ ] ID-6
Low level call in [NukeFund.receive()](contracts/NukeFund/NukeFund.sol#L40-L61):
	- [(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)
	- [(success_scope_0,None) = address(owner()).call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L51)
	- [(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)

contracts/NukeFund/NukeFund.sol#L40-L61


 - [ ] ID-7
Low level call in [EntityTrading.buyNFT(uint256)](contracts/EntityTrading/EntityTrading.sol#L63-L92):
	- [(success,None) = address(listing.seller).call{value: sellerProceeds}()](contracts/EntityTrading/EntityTrading.sol#L77-L79)

contracts/EntityTrading/EntityTrading.sol#L63-L92


 - [ ] ID-8
Low level call in [EntityTrading.transferToNukeFund(uint256)](contracts/EntityTrading/EntityTrading.sol#L112-L117):
	- [(success,None) = nukeFundAddress.call{value: amount}()](contracts/EntityTrading/EntityTrading.sol#L114)

contracts/EntityTrading/EntityTrading.sol#L112-L117


 - [ ] ID-9
Low level call in [DevFund.safeRewardTransfer(address,uint256)](contracts/DevFund/DevFund.sol#L83-L92):
	- [(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#L89)

contracts/DevFund/DevFund.sol#L83-L92


 - [ ] ID-10
Low level call in [DevFund.receive()](contracts/DevFund/DevFund.sol#L14-L28):
	- [(success,None) = address(owner()).call{value: remaining}()](contracts/DevFund/DevFund.sol#L20)
	- [(success_scope_0,None) = address(owner()).call{value: msg.value}()](contracts/DevFund/DevFund.sol#L24)

contracts/DevFund/DevFund.sol#L14-L28


 - [ ] ID-11
Low level call in [TraitForgeNft.mintWithBudget(bytes32[])](contracts/TraitForgeNft/TraitForgeNft.sol#L202-L225):
	- [(refundSuccess,None) = msg.sender.call{value: budgetLeft}()](contracts/TraitForgeNft/TraitForgeNft.sol#L222)

contracts/TraitForgeNft/TraitForgeNft.sol#L202-L225


 - [ ] ID-12
Low level call in [NukeFund.nuke(uint256)](contracts/NukeFund/NukeFund.sol#L153-L182):
	- [(success,None) = address(msg.sender).call{value: claimAmount}()](contracts/NukeFund/NukeFund.sol#L177)

contracts/NukeFund/NukeFund.sol#L153-L182


 - [ ] ID-13
Low level call in [TraitForgeNft._distributeFunds(uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365):
	- [(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#L361)

contracts/TraitForgeNft/TraitForgeNft.sol#L358-L365


## too-many-digits
Impact: Informational
Confidence: Medium
 - [ ] ID-14
[EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185) uses literals with too many digits:
	- [entropy = (slotValue / (10 ** (72 - position))) % 1000000](contracts/EntropyGenerator/EntropyGenerator.sol#L181)

contracts/EntropyGenerator/EntropyGenerator.sol#L164-L185


 - [ ] ID-15
[TraitForgeNft.slitherConstructorVariables()](contracts/TraitForgeNft/TraitForgeNft.sol#L14-L396) uses literals with too many digits:
	- [priceIncrementByGen = 5000000000000](contracts/TraitForgeNft/TraitForgeNft.sol#L25)

contracts/TraitForgeNft/TraitForgeNft.sol#L14-L396


 - [ ] ID-16
[NukeFund.slitherConstructorConstantVariables()](contracts/NukeFund/NukeFund.sol#L11-L195) uses literals with too many digits:
	- [MAX_DENOMINATOR = 100000](contracts/NukeFund/NukeFund.sol#L12)

contracts/NukeFund/NukeFund.sol#L11-L195


 - [ ] ID-17
[EntropyGenerator.deriveTokenParameters(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161) uses literals with too many digits:
	- [nukeFactor = entropy / 4000000](contracts/EntropyGenerator/EntropyGenerator.sol#L152)

contracts/EntropyGenerator/EntropyGenerator.sol#L136-L161


## unused-import
Impact: Informational
Confidence: High
 - [ ] ID-18
The following unused import(s) in contracts/EntityTrading/EntityTrading.sol should be removed:
	-import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol'; (contracts/EntityTrading/EntityTrading.sol#4)

