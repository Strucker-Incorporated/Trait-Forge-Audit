### **Final Modified Report**

#### **High Issues**
- **H-1: Unprotected initializer**
## H-1: Unprotected initializer

Consider protecting the initializer functions with modifiers.

<details><summary>1 Found Instances</summary>


- Found in src/utils/Rescuable.sol [Line: 33](src/utils/Rescuable.sol#L33)

    ```solidity
        function initializeOwnership(address _newOwner) external {
    ```

</details>

- **H-3: Sending native Eth is not protected from these functions**
## H-3: Sending native Eth is not protected from these functions.

Introduce checks for `msg.sender` in the function

<details><summary>2 Found Instances</summary>


- Found in src/core/TokenManager.sol [Line: 137](src/core/TokenManager.sol#L137)

    ```solidity
        function withdraw(
    ```

- Found in src/utils/Rescuable.sol [Line: 64](src/utils/Rescuable.sol#L64)

    ```solidity
        function rescue(
    ```

</details>



#### **Medium Issues**
- **M-1: [incorrect-equality] (8 results)**
## incorrect-equality
Impact: Medium
Confidence: High
 - [ ] ID-0
[DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) uses a dangerous strict equality:
    - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L360)

src/core/DeliveryPlace.sol#L335-L433


 - [ ] ID-1
[DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
    - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L249)

src/core/DeliveryPlace.sol#L222-L325


 - [ ] ID-2
[DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
    - [offerInfo.offerType == OfferType.Bid](src/core/DeliveryPlace.sol#L238)

src/core/DeliveryPlace.sol#L222-L325


 - [ ] ID-3
[DeliveryPlace.closeBidTaker(address)](src/core/DeliveryPlace.sol#L96-L212) uses a dangerous strict equality:
    - [makerInfo.offerSettleType == OfferSettleType.Protected](src/core/DeliveryPlace.sol#L122)

src/core/DeliveryPlace.sol#L96-L212


 - [ ] ID-4
[DeliveryPlace.closeBidTaker(address)](src/core/DeliveryPlace.sol#L96-L212) uses a dangerous strict equality:
    - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L153)

src/core/DeliveryPlace.sol#L96-L212


 - [ ] ID-5
[DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
    - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L277)

src/core/DeliveryPlace.sol#L222-L325


 - [ ] ID-6
[DeliveryPlace.closeBidOffer(address)](src/core/DeliveryPlace.sol#L35-L87) uses a dangerous strict equality:
    - [offerInfo.offerType == OfferType.Ask](src/core/DeliveryPlace.sol#L47)

src/core/DeliveryPlace.sol#L35-L87


 - [ ] ID-7
[DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses a dangerous strict equality:
    - [_settledPoints == offerInfo.usedPoints](src/core/DeliveryPlace.sol#L276)

src/core/DeliveryPlace.sol#L222-L325

- **M-2: [reentrancy-no-eth] (3 results)**
## reentrancy-no-eth
Impact: Medium
Confidence: Medium
 - [ ] ID-8
Reentrancy in [PreMarktes.abortAskOffer(address,address)](src/core/PreMarkets.sol#L536-L635):
    External calls:
    - [tokenManager.addTokenBalance(TokenBalanceType.MakerRefund,_msgSender(),makerInfo.tokenAddress,makerRefundAmount)](src/core/PreMarkets.sol#L624-L629)
    State variables written after the call(s):
    - [offerInfo.abortOfferStatus = AbortOfferStatus.Aborted](src/core/PreMarkets.sol#L631)
    [PerMarketsStorage.offerInfoMap](src/storage/PerMarketsStorage.sol#L22) can be used in cross function reentrancies:
    - [PreMarktes.abortAskOffer(address,address)](src/core/PreMarkets.sol#L536-L635)
    - [PreMarktes.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697)
    - [PreMarktes.closeOffer(address,address)](src/core/PreMarkets.sol#L406-L460)
    - [PreMarktes.createOffer(CreateOfferParams)](src/core/PreMarkets.sol#L39-L157)
    - [PreMarktes.createTaker(address,uint256)](src/core/PreMarkets.sol#L164-L284)
    - [PreMarktes.getOfferInfo(address)](src/core/PreMarkets.sol#L787-L791)
    - [PreMarktes.listOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L295-L396)
    - [PerMarketsStorage.offerInfoMap](src/storage/PerMarketsStorage.sol#L22)
    - [PreMarktes.relistOffer(address,address)](src/core/PreMarkets.sol#L470-L526)
    - [PreMarktes.settleAskTaker(address,address,uint256,uint256)](src/core/PreMarkets.sol#L759-L781)
    - [PreMarktes.settledAskOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L738-L749)
    - [PreMarktes.updateOfferStatus(address,OfferStatus)](src/core/PreMarkets.sol#L705-L713)
    - [offerInfo.offerStatus = OfferStatus.Settled](src/core/PreMarkets.sol#L632)
    [PerMarketsStorage.offerInfoMap](src/storage/PerMarketsStorage.sol#L22) can be used in cross function reentrancies:
    - [PreMarktes.abortAskOffer(address,address)](src/core/PreMarkets.sol#L536-L635)
    - [PreMarktes.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697)
    - [PreMarktes.closeOffer(address,address)](src/core/PreMarkets.sol#L406-L460)
    - [PreMarktes.createOffer(CreateOfferParams)](src/core/PreMarkets.sol#L39-L157)
    - [PreMarktes.createTaker(address,uint256)](src/core/PreMarkets.sol#L164-L284)
    - [PreMarktes.getOfferInfo(address)](src/core/PreMarkets.sol#L787-L791)
    - [PreMarktes.listOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L295-L396)
    - [PerMarketsStorage.offerInfoMap](src/storage/PerMarketsStorage.sol#L22)
    - [PreMarktes.relistOffer(address,address)](src/core/PreMarkets.sol#L470-L526)
    - [PreMarktes.settleAskTaker(address,address,uint256,uint256)](src/core/PreMarkets.sol#L759-L781)
    - [PreMarktes.settledAskOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L738-L749)
    - [PreMarktes.updateOfferStatus(address,OfferStatus)](src/core/PreMarkets.sol#L705-L713)

src/core/PreMarkets.sol#L536-L635


 - [ ] ID-9
Reentrancy in [PreMarktes.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697):
    External calls:
    - [tokenManager.addTokenBalance(TokenBalanceType.MakerRefund,_msgSender(),makerInfo.tokenAddress,transferAmount)](src/core/PreMarkets.sol#L687-L692)
    State variables written after the call(s):
    - [stockInfo.stockStatus = StockStatus.Finished](src/core/PreMarkets.sol#L694)
    [PerMarketsStorage.stockInfoMap](src/storage/PerMarketsStorage.sol#L26) can be used in cross function reentrancies:
    - [PreMarktes.abortAskOffer(address,address)](src/core/PreMarkets.sol#L536-L635)
    - [PreMarktes.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697)
    - [PreMarktes.closeOffer(address,address)](src/core/PreMarkets.sol#L406-L460)
    - [PreMarktes.createOffer(CreateOfferParams)](src/core/PreMarkets.sol#L39-L157)
    - [PreMarktes.createTaker(address,uint256)](src/core/PreMarkets.sol#L164-L284)
    - [PreMarktes.getStockInfo(address)](src/core/PreMarkets.sol#L797-L801)
    - [PreMarktes.listOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L295-L396)
    - [PreMarktes.relistOffer(address,address)](src/core/PreMarkets.sol#L470-L526)
    - [PreMarktes.settleAskTaker(address,address,uint256,uint256)](src/core/PreMarkets.sol#L759-L781)
    - [PerMarketsStorage.stockInfoMap](src/storage/PerMarketsStorage.sol#L26)
    - [PreMarktes.updateStockStatus(address,StockStatus)](src/core/PreMarkets.sol#L721-L729)

src/core/PreMarkets.sol#L645-L697


 - [ ] ID-10
Reentrancy in [PreMarktes.closeOffer(address,address)](src/core/PreMarkets.sol#L406-L460):
    External calls:
    - [tokenManager.addTokenBalance(TokenBalanceType.MakerRefund,_msgSender(),makerInfo.tokenAddress,refundAmount)](src/core/PreMarkets.sol#L450-L455)
    State variables written after the call(s):
    - [offerInfo.offerStatus = OfferStatus.Canceled](src/core/PreMarkets.sol#L458)
    [PerMarketsStorage.offerInfoMap](src/storage/PerMarketsStorage.sol#L22) can be used in cross function reentrancies:
    - [PreMarktes.abortAskOffer(address,address)](src/core/PreMarkets.sol#L536-L635)
    - [PreMarktes.abortBidTaker(address,address)](src/core/PreMarkets.sol#L645-L697)
    - [PreMarktes.closeOffer(address,address)](src/core/PreMarkets.sol#L406-L460)
    - [PreMarktes.createOffer(CreateOfferParams)](src/core/PreMarkets.sol#L39-L157)
    - [PreMarktes.createTaker(address,uint256)](src/core/PreMarkets.sol#L164-L284)
    - [PreMarktes.getOfferInfo(address)](src/core/PreMarkets.sol#L787-L791)
    - [PreMarktes.listOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L295-L396)
    - [PerMarketsStorage.offerInfoMap](src/storage/PerMarketsStorage.sol#L22)
    - [PreMarktes.relistOffer(address,address)](src/core/PreMarkets.sol#L470-L526)
    - [PreMarktes.settleAskTaker(address,address,uint256,uint256)](src/core/PreMarkets.sol#L759-L781)
    - [PreMarktes.settledAskOffer(address,uint256,uint256)](src/core/PreMarkets.sol#L738-L749)
    - [PreMarktes.updateOfferStatus(address,OfferStatus)](src/core/PreMarkets.sol#L705-L713)

src/core/PreMarkets.sol#L406-L460


- **M-3: [events-maths] (1 result)**
## events-maths
Impact: Low
Confidence: Medium
 - [ ] ID-19
[SystemConfig.initialize(uint256,uint256)](src/core/SystemConfig.sol#L25-L31) should emit an event for: 
    - [basePlatformFeeRate = _basePlatformFeeRate](src/core/SystemConfig.sol#L29) 
    - [baseReferralRate = _baseReferralRate](src/core/SystemConfig.sol#L30) 

src/core/SystemConfig.sol#L25-L31

- **M-4: [timestamp] (4 results)**
## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-40
[DeliveryPlace.closeBidOffer(address)](src/core/DeliveryPlace.sol#L35-L87) uses timestamp for comparisons
    Dangerous comparisons:
    - [_msgSender() != offerInfo.authority](src/core/DeliveryPlace.sol#L43)
    - [offerInfo.offerType == OfferType.Ask](src/core/DeliveryPlace.sol#L47)
    - [status != MarketPlaceStatus.AskSettling && status != MarketPlaceStatus.BidSettling](src/core/DeliveryPlace.sol#L52-L53)
    - [offerInfo.offerStatus != OfferStatus.Virgin](src/core/DeliveryPlace.sol#L58)

src/core/DeliveryPlace.sol#L35-L87


 - [ ] ID-41
[DeliveryPlace.settleAskMaker(address,uint256)](src/core/DeliveryPlace.sol#L222-L325) uses timestamp for comparisons
    Dangerous comparisons:
    - [_settledPoints > offerInfo.usedPoints](src/core/DeliveryPlace.sol#L230)
    - [offerInfo.offerType == OfferType.Bid](src/core/DeliveryPlace.sol#L238)
    - [offerInfo.offerStatus != OfferStatus.Virgin && offerInfo.offerStatus != OfferStatus.Canceled](src/core/DeliveryPlace.sol#L243-L244)
    - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L249)
    - [_msgSender() != offerInfo.authority](src/core/DeliveryPlace.sol#L250)
    - [settledPointTokenAmount > 0](src/core/DeliveryPlace.sol#L266)
    - [_settledPoints == offerInfo.usedPoints](src/core/DeliveryPlace.sol#L276)
    - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L277)

src/core/DeliveryPlace.sol#L222-L325


 - [ ] ID-42
[DeliveryPlace.settleAskTaker(address,uint256)](src/core/DeliveryPlace.sol#L335-L433) uses timestamp for comparisons
    Dangerous comparisons:
    - [status == MarketPlaceStatus.AskSettling](src/core/DeliveryPlace.sol#L360)
    - [_msgSender() != offerInfo.authority](src/core/DeliveryPlace.sol#L361)
    - [settledPointTokenAmount > 0](src/core/DeliveryPlace.sol#L376)

src/core/DeliveryPlace.sol#L335-L433


 - [ ] ID-43
[DeliveryPlace.closeBidTaker(address)](src/core/DeliveryPlace.sol#L96-L212) uses timestamp for comparisons
    Dangerous comparisons:
    - [makerInfo.offerSettleType == OfferSettleType.Protected](src/core/DeliveryPlace.sol#L122)
    - [offerInfo.offerStatus != OfferStatus.Settled](src/core/DeliveryPlace.sol#L143)
    - [offerInfo.usedPoints > offerInfo.settledPoints](src/core/DeliveryPlace.sol#L152)
    - [offerInfo.offerStatus == OfferStatus.Virgin](src/core/DeliveryPlace.sol#L153)

src/core/DeliveryPlace.sol#L96-L212

- **M-5: [assembly] (1 result)**
## assembly
Impact: Informational
Confidence: High
 - [ ] ID-44
[Address.isContract(address)](src/libraries/Address.sol#L11-L17) uses assembly
    - [INLINE ASM](src/libraries/Address.sol#L13-L15)

src/libraries/Address.sol#L11-L17

- **M-6: [reentrancy-unlimited-gas] (2 results)**
## reentrancy-unlimited-gas
Impact: Informational
Confidence: Medium
 - [ ] ID-49
Reentrancy in [TokenManager.withdraw(address,TokenBalanceType)](src/core/TokenManager.sol#L137-L189):
    External calls:
    - [address(msg.sender).transfer(claimAbleAmount)](src/core/TokenManager.sol#L169)
    Event emitted after the call(s):
    - [Withdraw(_msgSender(),_tokenAddress,_tokenBalanceType,claimAbleAmount)](src/core/TokenManager.sol#L183-L188)

src/core/TokenManager.sol#L137-L189


 - [ ] ID-50
Reentrancy in [Rescuable.rescue(address,address,uint256)](src/utils/Rescuable.sol#L64-L76):
    External calls:
    - [address(to).transfer(amount)](src/utils/Rescuable.sol#L70)
    Event emitted after the call(s):
    - [Rescue(to,token,amount)](src/utils/Rescuable.sol#L75)

src/utils/Rescuable.sol#L64-L76

- **M-7: [constable-states] (1 result)**

## constable-states
Impact: Optimization
Confidence: High
 - [ ] ID-56
[UpgradeableStorage.tadleFactory](src/storage/UpgradeableStorage.sol#L14) should be constant 

src/storage/UpgradeableStorage.sol#L14

- **M-8: [immutable-states] (2 results)**
## immutable-states
Impact: Optimization
Confidence: High
 - [ ] ID-57
[TadleFactory.guardian](src/factory/TadleFactory.sol#L21) should be immutable 

src/factory/TadleFactory.sol#L21

#### **Low Issues**
- **L-5: Define and use constant variables instead of using literals**
## L-5: Define and use `constant` variables instead of using literals

If the same constant literal value is used multiple times, create a constant state variable and reference it throughout the contract.

<details><summary>22 Found Instances</summary>


- Found in src/core/DeliveryPlace.sol [Line: 101](src/core/DeliveryPlace.sol#L101)

    ```solidity
            if (stockInfo.preOffer == address(0x0)) {
    ```

- Found in src/core/DeliveryPlace.sol [Line: 127](src/core/DeliveryPlace.sol#L127)

    ```solidity
                if (stockInfo.offer == address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 45](src/core/PreMarkets.sol#L45)

    ```solidity
            if (params.points == 0x0 || params.amount == 0x0) {
    ```

- Found in src/core/PreMarkets.sol [Line: 71](src/core/PreMarkets.sol#L71)

    ```solidity
            if (makerInfoMap[makerAddr].authority != address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 75](src/core/PreMarkets.sol#L75)

    ```solidity
            if (offerInfoMap[offerAddr].authority != address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 79](src/core/PreMarkets.sol#L79)

    ```solidity
            if (stockInfoMap[stockAddr].authority != address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 142](src/core/PreMarkets.sol#L142)

    ```solidity
                preOffer: address(0x0),
    ```

- Found in src/core/PreMarkets.sol [Line: 170](src/core/PreMarkets.sol#L170)

    ```solidity
            if (_points == 0x0) {
    ```

- Found in src/core/PreMarkets.sol [Line: 207](src/core/PreMarkets.sol#L207)

    ```solidity
            if (stockInfoMap[stockAddr].authority != address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 250](src/core/PreMarkets.sol#L250)

    ```solidity
                offer: address(0x0)
    ```

- Found in src/core/PreMarkets.sol [Line: 300](src/core/PreMarkets.sol#L300)

    ```solidity
            if (_amount == 0x0) {
    ```

- Found in src/core/PreMarkets.sol [Line: 326](src/core/PreMarkets.sol#L326)

    ```solidity
            if (stockInfo.offer != address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 365](src/core/PreMarkets.sol#L365)

    ```solidity
            if (offerInfoMap[offerAddr].authority != address(0x0)) {
    ```

- Found in src/core/PreMarkets.sol [Line: 439](src/core/PreMarkets.sol#L439)

    ```solidity
                stockInfo.preOffer == address(0x0)
    ```

- Found in src/core/PreMarkets.sol [Line: 504](src/core/PreMarkets.sol#L504)

    ```solidity
                stockInfo.preOffer == address(0x0)
    ```

- Found in src/core/PreMarkets.sol [Line: 570](src/core/PreMarkets.sol#L570)

    ```solidity
                stockInfo.preOffer != address(0x0)
    ```

- Found in src/core/PreMarkets.sol [Line: 847](src/core/PreMarkets.sol#L847)

    ```solidity
            if (referralInfo.referrer == address(0x0)) {
    ```

- Found in src/core/TokenManager.sol [Line: 75](src/core/TokenManager.sol#L75)

    ```solidity
            if (capitalPoolAddr == address(0x0)) {
    ```

- Found in src/core/TokenManager.sol [Line: 245](src/core/TokenManager.sol#L245)

    ```solidity
                IERC20(_token).allowance(_from, address(this)) == 0x0
    ```

- Found in src/utils/Rescuable.sol [Line: 34](src/utils/Rescuable.sol#L34)

    ```solidity
            if (owner() != address(0x0)) {
    ```

- Found in src/utils/Rescuable.sol [Line: 69](src/utils/Rescuable.sol#L69)

    ```solidity
            if (token == address(0x0)) {
    ```

</details>

- **L-9: Large literal values multiples of 10000 can be replaced with scientific notation**
## L-9: Large literal values multiples of 10000 can be replaced with scientific notation

Use `e` notation, for example: `1e18`, instead of its full numeric value.

<details><summary>5 Found Instances</summary>


- Found in src/libraries/Constants.sol [Line: 11](src/libraries/Constants.sol#L11)

    ```solidity
        uint256 internal constant PLATFORM_FEE_DECIMAL_SCALER = 1_000_000;
    ```

- Found in src/libraries/Constants.sol [Line: 14](src/libraries/Constants.sol#L14)

    ```solidity
        uint256 internal constant EACH_TRADE_TAX_DECIMAL_SCALER = 10_000;
    ```

- Found in src/libraries/Constants.sol [Line: 17](src/libraries/Constants.sol#L17)

    ```solidity
        uint256 internal constant COLLATERAL_RATE_DECIMAL_SCALER = 10_000;
    ```

- Found in src/libraries/Constants.sol [Line: 23](src/libraries/Constants.sol#L23)

    ```solidity
        uint256 internal constant REFERRAL_RATE_DECIMAL_SCALER = 1_000_000;
    ```

- Found in src/libraries/Constants.sol [Line: 26](src/libraries/Constants.sol#L26)

    ```solidity
        uint256 internal constant REFERRAL_BASE_RATE = 300_000;
    ```

</details>



