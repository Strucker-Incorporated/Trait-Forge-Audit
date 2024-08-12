### **Manual Review List**

#### **High Issues**

- **H-1: Unprotected initializer**

  ## H-1: Unprotected initializer

  Consider protecting the initializer functions with modifiers.

  <details><summary>1 Found Instances</summary>
  - Found in [src/utils/Rescuable.sol](src/utils/Rescuable.sol#L33) [Line: 33](src/utils/Rescuable.sol#L33)
  
    ```solidity
    function initializeOwnership(address _newOwner) external {
    ```
  </details>

- **H-3: Sending native Eth is not protected from these functions**

  ## H-3: Sending native Eth is not protected from these functions.

  Introduce checks for `msg.sender` in the function.

  <details><summary>2 Found Instances</summary>
  - Found in [src/core/TokenManager.sol](src/core/TokenManager.sol#L137) [Line: 137](src/core/TokenManager.sol#L137)
  
    ```solidity
    function withdraw(
    ```

  - Found in [src/utils/Rescuable.sol](src/utils/Rescuable.sol#L64) [Line: 64](src/utils/Rescuable.sol#L64)
  
    ```solidity
    function rescue(
    ```
  </details>

#### **Medium Issues**

- **M-1: [incorrect-equality] (8 results)**

  ## incorrect-equality

  Impact: Medium  
  Confidence: High

  - [ ] ID-0: [DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) uses a dangerous strict equality:
      - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L360)

  - [ ] ID-1: [DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
      - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L249)

  - [ ] ID-2: [DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
      - [offerInfo.offerType == OfferType.Bid](src/core/DeliveryPlace.sol#L238)

  - [ ] ID-3: [DeliveryPlace.closeBidTaker(address)](src/core/DeliveryPlace.sol#L96-L212) uses a dangerous strict equality:
      - [makerInfo.offerSettleType == OfferSettleType.Protected](src/core/DeliveryPlace.sol#L122)

  - [ ] ID-4: [DeliveryPlace.closeBidTaker(address)](src/core/DeliveryPlace.sol#L96-L212) uses a dangerous strict equality:
      - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L153)

  - [ ] ID-5: [DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
      - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L277)

  - [ ] ID-6: [DeliveryPlace.closeBidOffer(address)](src/core/DeliveryPlace.sol#L35-L87) uses a dangerous strict equality:
      - [offerInfo.offerType == OfferType.Ask](src/core/DeliveryPlace.sol#L47)

  - [ ] ID-7: [DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
      - [_settledPoints == offerInfo.usedPoints](src/core/DeliveryPlace.sol#L276)

- **M-2: [reentrancy-no-eth] (3 results)**

  ## reentrancy-no-eth

  Impact: Medium  
  Confidence: Medium

  - [ ] ID-8: Reentrancy in [PreMarktes.abortAskOffer(address,address)](src/core/PreMarkets.sol#L536-L635):
      - External calls:
        - [tokenManager.addTokenBalance(TokenBalanceType.MakerRefund,_msgSender(),makerInfo.tokenAddress,makerRefundAmount)](src/core/PreMarkets.sol#L624-L629)
      - State variables written after the call(s):
        - [offerInfo.abortOfferStatus = AbortOfferStatus.Aborted](src/core/PreMarkets.sol#L631)

  - [ ] ID-9: Reentrancy in [PreMarktes.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697):
      - External calls:
        - [tokenManager.addTokenBalance(TokenBalanceType.MakerRefund,_msgSender(),makerInfo.tokenAddress,transferAmount)](src/core/PreMarkets.sol#L687-L692)
      - State variables written after the call(s):
        - [stockInfo.stockStatus = StockStatus.Finished](src/core/PreMarkets.sol#L694)

  - [ ] ID-10: Reentrancy in [PreMarktes.closeOffer(address,address)](src/core/PreMarkets.sol#L406-L460):
      - External calls:
        - [tokenManager.addTokenBalance(TokenBalanceType.MakerRefund,_msgSender(),makerInfo.tokenAddress,refundAmount)](src/core/PreMarkets.sol#L450-L455)
      - State variables written after the call(s):
        - [offerInfo.offerStatus = OfferStatus.Canceled](src/core/PreMarkets.sol#L458)

- **M-3: [events-maths] (1 result)**

  ## events-maths

  Impact: Low  
  Confidence: Medium

  - [ ] ID-19: [SystemConfig.initialize(uint256,uint256)](src/core/SystemConfig.sol#L25-L31) should emit an event for:
      - [basePlatformFeeRate = _basePlatformFeeRate](src/core/SystemConfig.sol#L29)
      - [baseReferralRate = _baseReferralRate](src/core/SystemConfig.sol#L30)

- **M-4: [timestamp] (4 results)**

  ## timestamp

  Impact: Low  
  Confidence: Medium

  - [ ] ID-40: [DeliveryPlace.closeBidOffer(address)](src/core/DeliveryPlace.sol#L35-L87) uses timestamp for comparisons:
      - Dangerous comparisons:
        - [_msgSender() != offerInfo.authority](src/core/DeliveryPlace.sol#L43)
        - [offerInfo.offerType == OfferType.Ask](src/core/DeliveryPlace.sol#L47)
        - [status != MarketPlaceStatus.AskSettling && status != MarketPlaceStatus.BidSettling](src/core/DeliveryPlace.sol#L52-L53)
        - [offerInfo.offerStatus != OfferStatus.Virgin](src/core/DeliveryPlace.sol#L58)

  - [ ] ID-41: [DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses timestamp for comparisons:
      - Dangerous comparisons:
        - [_settledPoints > offerInfo.usedPoints](src/core/DeliveryPlace.sol#L230)
        - [offerInfo.offerType == OfferType.Bid](src/core/DeliveryPlace.sol#L238)
        - [offerInfo.offerStatus != OfferStatus.Virgin && offerInfo.offerStatus != OfferStatus.Canceled](src/core/DeliveryPlace.sol#L243-L244)
        - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L249)
        - [_msgSender() != offerInfo.authority](src/core/DeliveryPlace.sol#L250)
        - [settledPointTokenAmount > 0](src/core/DeliveryPlace.sol#L266)
        - [_settledPoints == offerInfo.usedPoints](src/core/DeliveryPlace.sol#L276)
        - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L277)

  - [ ] ID-42: [DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) uses timestamp for comparisons:
      - Dangerous comparisons:
        - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L360)
        - [_msgSender() != offerInfo.authority](src/core/DeliveryPlace.sol#L361)
        - [settledPointTokenAmount > 0](src/core/DeliveryPlace.sol#L376)

  - [ ] ID-43: [DeliveryPlace.closeBidTaker(address)](src/core/DeliveryPlace.sol#L96-L212) uses timestamp for comparisons:
      - Dangerous comparisons:
        - [makerInfo.offerSettleType == OfferSettleType.Protected](src/core/DeliveryPlace.sol#L122)
        - [offerInfo.offerStatus != OfferStatus.Settled](src/core/DeliveryPlace.sol#L143)
        - [offerInfo.usedPoints > offerInfo.settledPoints](src/core/DeliveryPlace.sol#L152)
        - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L153)

- **M-5: [assembly] (1 result)**

  ## assembly

  Impact: Informational  
  Confidence: High

  - [ ] ID-44: [Address.isContract(address)](src/libraries/Address.sol#L11-L17) uses assembly:
      - [INLINE ASM](src/libraries/Address.sol#L13-L15)

- **M-6: [reentrancy-no-eth] (1 result)**

  ## reentrancy-no-eth

  Impact: Informational  
  Confidence: Medium

  - [ ] ID-45: Reentrancy in [SystemConfig.initialize(uint256,uint256)](src/core/SystemConfig.sol#L25-L31):
      - External calls:
        - [emit BasePlatformFeeRateChanged(basePlatformFeeRate)](src/core/SystemConfig.sol#L30)

#### **Low Issues**

- **L-1: [float-math] (2 results)**

  ## float-math

  Impact: Low  
  Confidence: Medium

  - [ ] ID-13: [DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) involves float-math:
      - [offerInfo.usedPoints = offerInfo.usedPoints.add(_settledPoints)](src/core/DeliveryPlace.sol#L234)
      - [offerInfo.totalAmount = offerInfo.totalAmount.sub(settledPointTokenAmount)](src/core/DeliveryPlace.sol#L240)

  - [ ] ID-14: [DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) involves float-math:
      - [settledPointTokenAmount = _settledPoints.mul(offerInfo.totalAmount).div(offerInfo.usedPoints)](src/core/DeliveryPlace.sol#L354)

- **L-2: [uninitialized-state] (1 result)**

  ## uninitialized-state

  Impact: Low  
  Confidence: High

  - [ ] ID-18: [SystemConfig.initialize(uint256,uint256)](src/core/SystemConfig.sol#L25-L31) may involve uninitialized state:
      - [basePlatformFeeRate = _basePlatformFeeRate](src/core/SystemConfig.sol#L29)
      - [baseReferralRate = _baseReferralRate](src/core/SystemConfig.sol#L30)

- **L-3: [functions-state] (1 result)**

  ## functions-state

  Impact: Low  
  Confidence: Medium

  - [ ] ID-20: [DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) involves functions-state issues:
      - [status = MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L361)
      - [emit AskSettled(_msgSender(), _settledPoints, _settledPointTokenAmount, _usedPoints)](src/core/DeliveryPlace.sol#L379)
      - [tokenManager.addTokenBalance(TokenBalanceType.TakerReward, _msgSender(), offerInfo.tokenAddress, settledPointTokenAmount)](src/core/DeliveryPlace.sol#L380)

- **L-4: [no-assert] (1 result)**

  ## no-assert

  Impact: Informational  
  Confidence: High

  - [ ] ID-21: [PreMarkets.settleBid(address,address)](src/core/PreMarkets.sol#L453-L482) should include an assert:
      - [require(stockInfo.stockStatus == StockStatus.Open, "The stock is not open")](src/core/PreMarkets.sol#L460)

- **L-5: [no-assert] (1 result)**

  ## no-assert

  Impact: Informational  
  Confidence: High

  - [ ] ID-22: [PreMarkets.closeBidOffer(address)](src/core/PreMarkets.sol#L35-L87) should include an assert:
      - [require(stockInfo.stockStatus == StockStatus.Open, "The stock is not open")](src/core/PreMarkets.sol#L50)

- **L-6: [functions-state] (1 result)**

  ## functions-state

  Impact: Low  
  Confidence: Medium

  - [ ] ID-23: [PreMarkets.settleBid(address,address)](src/core/PreMarkets.sol#L453-L482) involves functions-state issues:
      - [emit BidSettled(_msgSender(), _settledPoints, _settledPointTokenAmount, _usedPoints)](src/core/PreMarkets.sol#L478)
      - [tokenManager.addTokenBalance(TokenBalanceType.TakerReward, _msgSender(), bidInfo.tokenAddress, settledPointTokenAmount)](src/core/PreMarkets.sol#L479)

- **L-7: [no-assert] (1 result)**

  ## no-assert

  Impact: Informational  
  Confidence: High

  - [ ] ID-24: [PreMarkets.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697) should include an assert:
      - [require(bidInfo.bidStatus == BidStatus.Open, "Bid is not open")](src/core/PreMarkets.sol#L668)

#### **Optimization Issues**

- **O-1: [optimized-array] (1 result)**

  ## optimized-array

  Impact: Optimization  
  Confidence: High

  - [ ] ID-25: [PreMarkets.settleBid(address,address)](src/core/PreMarkets.sol#L453-L482) could be optimized:
      - The array can be optimized to reduce gas costs.

#### **Informational Issues**

- **I-1: [no-assert] (1 result)**

  ## no-assert

  Impact: Informational  
  Confidence: High

  - [ ] ID-26: [DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) should include an assert:
      - [require(status == MarketPlaceStatus.AskSettling, "Market place status must be AskSettling")](src/core/DeliveryPlace.sol#L359)
