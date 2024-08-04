# **Informationals**

### Boolean Equal
- **DAOFund**:
  - `receive()` compares to a boolean constant: 
    - `[require(bool,string)(token.burn(token.balanceOf(address(this))) == true,Token burn failed)](contracts/DAOFund/DAOFund.sol#L30-L33)`

### Costly Loop
- **TraitForgeNft**:
  - `_incrementGeneration()` has costly operations inside a loop:
    - `[priceIncrement = priceIncrement + priceIncrementByGen](contracts/TraitForgeNft/TraitForgeNft.sol#L352)`
    - `[currentGeneration ++](contracts/TraitForgeNft/TraitForgeNft.sol#L350)`
  - `_mintInternal(address,uint256)` has costly operations inside a loop:
    - `[_tokenIds ++](contracts/TraitForgeNft/TraitForgeNft.sol#L285)`

### Low-Level Calls
- **EntityForging**:
  - `forgeWithListed(uint256,uint256)` has low-level calls:
    - `[(success,None) = nukeFundAddress.call{value: devFee}()](contracts/EntityForging/EntityForging.sol#L156)`
    - `[(success_forge,None) = forgerOwner.call{value: forgerShare}()](contracts/EntityForging/EntityForging.sol#L158)`
- **TraitForgeNft**:
  - `mintToken(bytes32[])` has a low-level call:
    - `[(refundSuccess,None) = msg.sender.call{value: excessPayment}()](contracts/TraitForgeNft/TraitForgeNft.sol#L197)`
  - `mintWithBudget(bytes32[])` has a low-level call:
    - `[(refundSuccess,None) = msg.sender.call{value: budgetLeft}()](contracts/TraitForgeNft/TraitForgeNft.sol#L222)`
  - `_distributeFunds(uint256)` has a low-level call:
    - `[(success,None) = nukeFundAddress.call{value: totalAmount}()](contracts/TraitForgeNft/TraitForgeNft.sol#L361)`

- **NukeFund**:
  - `receive()` has low-level calls:
    - `[(success,None) = devAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L47)`
    - `[(success_scope_0,None) = address(owner()).call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L51)`
    - `[(success_scope_1,None) = daoAddress.call{value: devShare}()](contracts/NukeFund/NukeFund.sol#L54)`
  - `nuke(uint256)` has a low-level call:
    - `[(success,None) = address(msg.sender).call{value: claimAmount}()](contracts/NukeFund/NukeFund.sol#L177)`

- **EntityTrading**:
  - `buyNFT(uint256)` has a low-level call:
    - `[(success,None) = address(listing.seller).call{value: sellerProceeds}()](contracts/EntityTrading/EntityTrading.sol#L77-L79)`
  - `transferToNukeFund(uint256)` has a low-level call:
    - `[(success,None) = nukeFundAddress.call{value: amount}()](contracts/EntityTrading/EntityTrading.sol#L114)`

- **DevFund**:
  - `safeRewardTransfer(address,uint256)` has a low-level call:
    - `[(success,None) = address(to).call{value: amount}()](contracts/DevFund/DevFund.sol#L89)`
  - `receive()` has low-level calls:
    - `[(success,None) = address(owner()).call{value: remaining}()](contracts/DevFund/DevFund.sol#L20)`
    - `[(success_scope_0,None) = address(owner()).call{value: msg.value}()](contracts/DevFund/DevFund.sol#L24)`

### Too Many Digits
- **EntropyGenerator**:
  - `getEntropy(uint256,uint256)` uses literals with too many digits:
    - `[entropy = (slotValue / (10 ** (72 - position))) % 1000000](contracts/EntropyGenerator/EntropyGenerator.sol#L181)`
  - `deriveTokenParameters(uint256,uint256)` uses literals with too many digits:
    - `[nukeFactor = entropy / 4000000](contracts/EntropyGenerator/EntropyGenerator.sol#L152)`

- **TraitForgeNft**:
  - `slitherConstructorVariables()` uses literals with too many digits:
    - `[priceIncrementByGen = 5000000000000](contracts/TraitForgeNft/TraitForgeNft.sol#L25)`

- **NukeFund**:
  - `slitherConstructorConstantVariables()` uses literals with too many digits:
    - `[MAX_DENOMINATOR = 100000](contracts/NukeFund/NukeFund.sol#L12)`

### Unused Import
- **EntityTrading**:
  - Remove unused import:
    - `import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';` ([L4](contracts/EntityTrading/EntityTrading.sol#4))

