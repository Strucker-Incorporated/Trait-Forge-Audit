# **Lows**

### **Events-Maths**
**Impact: Low | Confidence: Medium**

1. **[EntityTrading.setTaxCut(uint256)]**: Missing event emission for tax cut change.
2. **[NukeFund.setMaxAllowedClaimDivisor(uint256)]**: Missing event emission for claim divisor change.
3. **[NukeFund.setAgeMultiplier(uint256)]**: Missing event emission for age multiplier change.
4. **[TraitForgeNft.setStartPrice(uint256)]**: Missing event emission for start price change.
5. **[Airdrop.addUserAmount(address,uint256)]**: Missing event emission for user amount addition.
6. **[TraitForgeNft.setPriceIncrement(uint256)]**: Missing event emission for price increment change.
7. **[Airdrop.startAirdrop(uint256)]**: Missing event emission for starting airdrop.
8. **[NukeFund.setTaxCut(uint256)]**: Missing event emission for tax cut change.
9. **[TraitForgeNft.setPriceIncrementByGen(uint256)]**: Missing event emission for price increment by generation.
10. **[Airdrop.subUserAmount(address,uint256)]**: Missing event emission for user amount subtraction.
11. **[NukeFund.setNukeFactorMaxParam(uint256)]**: Missing event emission for nuke factor max parameter change.
12. **[NukeFund.setMinimumDaysHeld(uint256)]**: Missing event emission for minimum days held change.
13. **[EntityForging.setOneYearInDays(uint256)]**: Missing event emission for one year in days change.
14. **[NukeFund.setDefaultNukeFactorIncrease(uint256)]**: Missing event emission for default nuke factor increase.

### **Missing-Zero-Check**
**Impact: Low | Confidence: Medium**

1. **[EntropyGenerator.setAllowedCaller(address)._allowedCaller]**: Lacks zero-check on `_allowedCaller`.
2. **[EntityForging.forgeWithListed(uint256,uint256).forgerOwner]**: Lacks zero-check on `forgerOwner.call{value: forgerShare}()`.
3. **[EntropyGenerator.constructor(address)._traitForgetNft]**: Lacks zero-check on `_traitForgetNft`.
4. **[EntityTrading.setNukeFundAddress(address)._nukeFundAddress]**: Lacks zero-check on `_nukeFundAddress`.
5. **[NukeFund.constructor(address,address,address,address)._daoAddress]**: Lacks zero-check on `_daoAddress`.
6. **[NukeFund.setDaoAddress(address).account]**: Lacks zero-check on `account`.
7. **[NukeFund.setDevAddress(address).account]**: Lacks zero-check on `account`.
8. **[TraitForgeNft.setNukeFundContract(address)._nukeFundAddress]**: Lacks zero-check on `_nukeFundAddress`.
9. **[EntityForging.setNukeFundAddress(address)._nukeFundAddress]**: Lacks zero-check on `_nukeFundAddress`.
10. **[NukeFund.constructor(address,address,address,address)._devAddress]**: Lacks zero-check on `_devAddress`.

### **Calls-Loop**
**Impact: Low | Confidence: Medium**

1. **[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)]**: External calls within a loop: `entityForgingContract.cancelListingForForging(firstTokenId)`.
2. **[TraitForgeNft._incrementGeneration()]**: External calls within a loop: `entropyGenerator.initializeAlphaIndices()`.
3. **[TraitForgeNft._mintInternal(address,uint256)]**: External calls within a loop: `entropyValue = entropyGenerator.getNextEntropy()`.
4. **[TraitForgeNft._distributeFunds(uint256)]**: External calls within a loop: `(success,None) = nukeFundAddress.call{value: totalAmount}()`.
5. **[TraitForgeNft._mintInternal(address,uint256)]**: External calls within a loop: `airdropContract.addUserAmount(to,entropyValue)`.
6. **[TraitForgeNft._beforeTokenTransfer(address,address,uint256,uint256)]**: External calls within a loop: `listing = entityForgingContract.getListings(listedId)`.
7. **[TraitForgeNft._mintInternal(address,uint256)]**: External calls within a loop: `! airdropContract.airdropStarted()`.

### **Reentrancy-Benign**
**Impact: Low | Confidence: Medium**

1. **[Airdrop.startAirdrop(uint256)]**: Reentrancy due to external call: `traitToken.transferFrom(tx.origin,address(this),amount)`.
2. **[TraitForgeNft._mintNewEntity(address,uint256,uint256)]**: Reentrancy due to external calls and state variable updates.
3. **[TraitForgeNft._mintInternal(address,uint256)]**: Reentrancy due to external calls and state variable updates.
4. **[TraitForgeNft.burn(uint256)]**: Reentrancy due to external calls and state variable updates.
5. **[TraitForgeNft._mintInternal(address,uint256)]**: Reentrancy due to external calls and state variable updates.
6. **[TraitForgeNft._mintInternal(address,uint256)]**: Reentrancy due to external calls and state variable updates.
7. **[EntityTrading.listNFTForSale(uint256,uint256)]**: Reentrancy due to external call and state variable updates.

### **Reentrancy-Events**
**Impact: Low | Confidence: Medium**

1. **[NukeFund.receive()]**: Reentrancy due to external calls and event emissions.
2. **[NukeFund.receive()]**: Reentrancy due to multiple external calls and event emissions.
3. **[NukeFund.receive()]**: Reentrancy due to external calls and event emissions.
4. **[DevFund.receive()]**: Reentrancy due to external calls and event emission.

### **Timestamp**
**Impact: Low | Confidence: Medium**

1. **[NukeFund.canTokenBeNuked(uint256)]**: Dangerous comparison using timestamp.
2. **[EntropyGenerator.getEntropy(uint256,uint256)]**: Dangerous comparison using timestamp.
3. **[EntityForging._resetForgingCountIfNeeded(uint256)]**: Dangerous comparison using timestamp.
4. **[NukeFund.nuke(uint256)]**: Dangerous comparison using timestamp.

These findings are categorized as low-impact, meaning they are less likely to lead to severe issues, but addressing them can improve the contract's robustness and reliability. Let me know if you need further details or recommendations on any specific issue!