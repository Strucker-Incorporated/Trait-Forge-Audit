### **Medium-Severity Findings**

#### divide-before-multiply
- **ID-0**: [DevFund.receive()](contracts/DevFund/DevFund.sol#14-28) performs a multiplication on the result of a division:
  - [amountPerWeight = msg.value / totalDevWeight](contracts/DevFund/DevFund.sol#16)
  - [remaining = msg.value - (amountPerWeight * totalDevWeight)](contracts/DevFund/DevFund.sol#17)

- **ID-1**: [NukeFund.calculateAge(uint256)](contracts/NukeFund/NukeFund.sol#118-133) performs a multiplication on the result of a division:
  - [daysOld = (block.timestamp - nftContract.getTokenCreationTimestamp(tokenId)) / 60 / 60 / 24](contracts/NukeFund/NukeFund.sol#121-125)
  - [age = (daysOld * perfomanceFactor * MAX_DENOMINATOR * ageMultiplier) / 365](contracts/NukeFund/NukeFund.sol#128-131)

#### incorrect-equality
- **ID-2**: [EntropyGenerator.getEntropy(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#164-185) uses a dangerous strict equality:
  - [slotIndex == slotIndexSelectionPoint && numberIndex == numberIndexSelectionPoint](contracts/EntropyGenerator/EntropyGenerator.sol#171-172)

- **ID-3**: [EntityForging._resetForgingCountIfNeeded(uint256)](contracts/EntityForging/EntityForging.sol#199-207) uses a dangerous strict equality:
  - [lastForgeResetTimestamp[tokenId] == 0](contracts/EntityForging/EntityForging.sol#201)

- **ID-4**: [EntropyGenerator.deriveTokenParameters(uint256,uint256)](contracts/EntropyGenerator/EntropyGenerator.sol#136-161) uses a dangerous strict equality:
  - [isForger = role == 0](contracts/EntropyGenerator/EntropyGenerator.sol#158)

- **ID-5**: [DAOFund.receive()](contracts/DAOFund/DAOFund.sol#16-34) uses a dangerous strict equality:
  - [require(bool,string)(token.burn(token.balanceOf(address(this))) == true,Token burn failed)](contracts/DAOFund/DAOFund.sol#30-33)

#### reentrancy-no-eth
- **ID-6**: Reentrancy in [Airdrop.claim()](contracts/Airdrop/Airdrop.sol#67-74):
  - External call: [traitToken.transfer(msg.sender,amount)](contracts/Airdrop/Airdrop.sol#72)
  - State variable written after the call: [userInfo[msg.sender] = 0](contracts/Airdrop/Airdrop.sol#73)
  - [Airdrop.userInfo](contracts/Airdrop/Airdrop.sol#18) can be used in cross-function reentrancies:
    - [Airdrop.userInfo](contracts/Airdrop/Airdrop.sol#18)

- **ID-7**: Reentrancy in [TraitForgeNft._mintNewEntity(address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#311-343):
  - External calls:
    - [_mint(newOwner,newTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#323)
      - [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#390)
    - [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#334)
      - [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#353)
  - State variable written after the call: [generationMintCounts[currentGeneration] = 0](contracts/TraitForgeNft/TraitForgeNft.sol#351)
  - [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#45) can be used in cross-function reentrancies:
    - [TraitForgeNft.calculateMintPrice()](contracts/TraitForgeNft/TraitForgeNft.sol#227-232)
    - [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#45)

- **ID-8**: Reentrancy in [TraitForgeNft._mintInternal(address,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#280-309):
  - External calls:
    - [_incrementGeneration()](contracts/TraitForgeNft/TraitForgeNft.sol#282)
      - [entropyGenerator.initializeAlphaIndices()](contracts/TraitForgeNft/TraitForgeNft.sol#353)
    - [_mint(to,newItemId)](contracts/TraitForgeNft/TraitForgeNft.sol#287)
      - [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#390)
    - [entropyValue = entropyGenerator.getNextEntropy()](contracts/TraitForgeNft/TraitForgeNft.sol#288)
  - State variable written after the call: [generationMintCounts[currentGeneration] ++](contracts/TraitForgeNft/TraitForgeNft.sol#293)
  - [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#45) can be used in cross-function reentrancies:
    - [TraitForgeNft.calculateMintPrice()](contracts/TraitForgeNft/TraitForgeNft.sol#227-232)
    - [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#45)

- **ID-9**: Reentrancy in [Airdrop.startAirdrop(uint256)](contracts/Airdrop/Airdrop.sol#24-32):
  - External call: [traitToken.transferFrom(tx.origin,address(this),amount)](contracts/Airdrop/Airdrop.sol#29)
  - State variable written after the call: [started = true](contracts/Airdrop/Airdrop.sol#30)
  - [Airdrop.started](contracts/Airdrop/Airdrop.sol#11) can be used in cross-function reentrancies:
    - [Airdrop.airdropStarted()](contracts/Airdrop/Airdrop.sol#34-36)
    - [Airdrop.allowDaoFund()](contracts/Airdrop/Airdrop.sol#38-42)

- **ID-10**: Reentrancy in [EntityTrading.cancelListing(uint256)](contracts/EntityTrading/EntityTrading.sol#94-109):
  - External call: [nftContract.transferFrom(address(this),msg.sender,tokenId)](contracts/EntityTrading/EntityTrading.sol#104)
  - State variable written after the call: [delete listings[listedTokenIds[tokenId]]](contracts/EntityTrading/EntityTrading.sol#106)
  - [EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#20) can be used in cross-function reentrancies:
    - [EntityTrading.listings](contracts/EntityTrading/EntityTrading.sol#20)

- **ID-11**: Reentrancy in [TraitForgeNft._mintNewEntity(address,uint256,uint256)](contracts/TraitForgeNft/TraitForgeNft.sol#311-343):
  - External call: [_mint(newOwner,newTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#323)
    - [entityForgingContract.cancelListingForForging(firstTokenId)](contracts/TraitForgeNft/TraitForgeNft.sol#390)
  - State variable written after the call: [generationMintCounts[gen] ++](contracts/TraitForgeNft/TraitForgeNft.sol#328)
  - [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#45) can be used in cross-function reentrancies:
    - [TraitForgeNft.calculateMintPrice()](contracts/TraitForgeNft/TraitForgeNft.sol#227-232)
    - [TraitForgeNft.generationMintCounts](contracts/TraitForgeNft/TraitForgeNft.sol#45)

#### unused-return
- **ID-12**: [DAOFund.receive()](contracts/DAOFund/DAOFund.sol#16-34) ignores return value of [uniswapV2Router.swapExactETHForTokens{value: msg.value}(0,path,address(this),block.timestamp)](contracts/DAOFund/DAOFund.sol#23-28)

