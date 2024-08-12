# Tadle - Findings Report

# Table of contents
- ## [Contest Summary](#contest-summary)
- ## [Results Summary](#results-summary)
- ## High Risk Findings
    - ### [H-01. Sending Native ETH is Not Protected from  Functions: `tillIn` and `withdraw`](#H-01)
- ## Medium Risk Findings
    - ### [M-01. incorrect-equality](#M-01)
    - ### [M-02. Re-entrancy-Eth](#M-02)


# <a id='contest-summary'></a>Contest Summary

### Sponsor: Tadle

### Dates: Aug 5th, 2024 - Aug 12th, 2024

[See more contest details here](https://codehawks.cyfrin.io/c/2024-08-tadle)

# <a id='results-summary'></a>Results Summary

### Number of findings:
- High: 1
- Medium: 2
- Low: 0


# High Risk Findings

## <a id='H-01'></a>H-01. Sending Native ETH is Not Protected from  Functions: `tillIn` and `withdraw`            



### Summary

The `TokenManager` contract contains functions `tillIn` and `withdraw` that handle native ETH transactions. These functions lack adequate access control, which could allow unauthorized users or contracts to deposit or withdraw ETH, potentially compromising the security of the contract.

* [src/core/TokenManager.sol](src/core/TokenManager.sol#L137) [Line: 137](src/core/TokenManager.sol#L137)

## Vulnerability Details

The functions `tillIn` and `withdraw` handle ETH without strict checks on `msg.sender`. The `tillIn` function allows any caller to deposit ETH into the contract, and the `withdraw` function allows any caller to withdraw ETH, assuming the contract's state allows it. This could be exploited by malicious actors to deposit and withdraw ETH without proper authorization.

* **Function `tillIn`:** Allows deposits of ETH without restricting who can call it. The check for sufficient ETH (`msg.value < _amount`) cannot prevent unauthorized deposits.
* **Function `withdraw`:** Allows ETH withdrawals without restricting who can request a withdrawal. This function transfers ETH directly to the `msg.sender`, potentially allowing unauthorized users to claim funds.

## Impact

* **Unauthorized Deposits:** Malicious users could deposit ETH into the contract, potentially crowding out legitimate operations or misappropriating funds.
* **Unauthorized Withdrawals:** Attackers could withdraw ETH without proper authorization, leading to financial loss or unauthorized access to the contract’s funds.

The impact is high as it directly affects the contract's ability to manage ETH securely, risking potential financial losses and undermining the trust in the contract’s operations.

***

## Tools Used

* **Forge**
* Foundry

## Exploit Code

To demonstrate the potential exploit, here is a simplified contract that interacts with the vulnerable `TokenManager` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenManager.sol";

contract MaliciousUser {
    TokenManager public tokenManager;

    constructor(address _tokenManager) {
        tokenManager = TokenManager(_tokenManager);
    }

    // Function to exploit the vulnerability and withdraw ETH
    function exploitWithdraw() external {
        // Assumes the contract has some ETH and the exploit succeeds
        tokenManager.withdraw(address(0), TokenManager.TokenBalanceType.PointToken);
    }

    // Function to exploit the vulnerability and deposit ETH
    function exploitDeposit() external payable {
        // Send ETH to the contract to exploit the tillIn function
        tokenManager.tillIn(address(this), address(0), msg.value, false);
    }
}
```

## Recommendations

1. **Implement Access Control:**

   * Add appropriate access control modifiers (e.g., `onlyOwner` or custom role-based access control) to the `tillIn` and `withdraw` functions. Ensure that only authorized users or contracts can call these functions.

   ```solidity
   modifier onlyAuthorized() {
       require(/* condition for authorized access */, "Not authorized");
       _;
   }

   function tillIn(/* parameters */) external payable onlyAuthorized {
       // Function logic
   }

   function withdraw(/* parameters */) external onlyAuthorized {
       // Function logic
   }
   ```

2. **Verify ETH Handling:**
   * Ensure that ETH deposits and withdrawals are handled securely. Consider adding checks to validate the caller's authorization and to prevent unauthorized access.

***

    
# Medium Risk Findings

## <a id='M-01'></a>M-01. incorrect-equality            



## Summary

The `incorrect-equality` issue arises from the use of strict equality checks in the `DeliveryPlace` contract. These checks may lead to unintended behavior if the conditions they compare do not account for all possible states or edge cases. This can result in security vulnerabilities or incorrect execution of contract logic.

## Vulnerability Details

Strict Equality Checks in the identified Functions Below compare values directly without considering potential edge cases or variations in state, making them a vulnerablity.

### Affected Functions and Lines

* **ID-0**: `DeliveryPlace.settleAskTaker(address,uint256)`
  * **Line 360**: `status == MarketPlaceStatus.AskSettling`
  * **Details**: The strict equality check here may not handle all possible `status` values or transitions properly.

* **ID-1**: `DeliveryPlace.settleAskMaker(address,uint256)`
  * **Line 249**: `status == MarketPlaceStatus.AskSettling`
  * **Details**: Similar to ID-0, this check may not be comprehensive in evaluating all possible `status` values.

* **ID-2**: `DeliveryPlace.settleAskMaker(address,uint256)`
  * **Line 238**: `offerInfo.offerType == OfferType.Bid`
  * **Details**: This check may not account for all `offerType` values, potentially leading to incorrect offer handling.

* **ID-3**: `DeliveryPlace.closeBidTaker(address)`
  * **Line 122**: `makerInfo.offerSettleType == OfferSettleType.Protected`
  * **Details**: The equality check may fail to consider all `offerSettleType` scenarios, impacting bid closure.

* **ID-4**: `DeliveryPlace.closeBidTaker(address)`
  * **Line 153**: `offerInfo.offerStatus == OfferStatus.Virgin`
  * **Details**: This check may be insufficient for verifying the `offerStatus`, potentially causing improper bid closure.

* **ID-5**: `DeliveryPlace.settleAskMaker(address,uint256)`
  * **Line 277**: `offerInfo.offerStatus == OfferStatus.Virgin`
  * **Details**: The strict equality check may not handle all states of `offerStatus` correctly, affecting settlement.

* **ID-6**: `DeliveryPlace.closeBidOffer(address)`
  * **Line 47**: `offerInfo.offerType == OfferType.Ask`
  * **Details**: The check here might miss certain `offerType` values, impacting bid offer closure.

* **ID-7**: `DeliveryPlace.settleAskMaker(address,uint256)`
  * **Line 276**: `_settledPoints == offerInfo.usedPoints`
  * **Details**: The equality check could lead to errors if `_settledPoints` and `offerInfo.usedPoints` are not aligned as expected.

## Impact

The use of strict equality checks can lead to unintended behavior if the comparisons do not account for all possible states. This may result in improper handling of contract states or transitions, causing vulnerabilities or incorrect contract operations, such as unauthorized refunds, invalid stock operations, or improper settlements.

## Tools Used

* **Slither**: Static analysis tool for detecting vulnerabilities in Solidity code.
* **Solidity Compiler**: Used for compiling and analyzing the smart contract code.

# Exploit

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../src/core/DeliveryPlace.sol";

contract ExploitIncorrectEquality {
    DeliveryPlace private deliveryPlace;

    // Constructor to deploy the DeliveryPlace contract
    constructor() {
        deliveryPlace = new DeliveryPlace();
    }

    // Function to exploit the strict equality issue
    function exploit() public {
        address maliciousAddress = address(this); // Using this contract as a malicious actor
        uint256 exploitAmount = 0; // Use a value that could potentially exploit the equality issue

        // Exploit ID-0, ID-1
        deliveryPlace.settleAskTaker(maliciousAddress, exploitAmount);
        deliveryPlace.settleAskMaker(maliciousAddress, exploitAmount);

        // Exploit ID-2
        deliveryPlace.settleAskMaker(maliciousAddress, exploitAmount);

        // Exploit ID-3
        deliveryPlace.closeBidTaker(maliciousAddress);

        // Exploit ID-4
        deliveryPlace.closeBidTaker(maliciousAddress);

        // Exploit ID-5
        deliveryPlace.settleAskMaker(maliciousAddress, exploitAmount);

        // Exploit ID-6
        deliveryPlace.closeBidOffer(maliciousAddress);

        // Exploit ID-7
        deliveryPlace.settleAskMaker(maliciousAddress, exploitAmount);
    }
}

```

## Recommendations

1. **Improve Equality Checks**: Replace strict equality checks with more comprehensive conditions that account for all potential states and variations.

2. **Add Edge Case Handling**: Implement additional checks and balances to handle edge cases or unexpected values, ensuring robust and secure contract logic.

- ### [M-02. Re-entrancy-Eth](#M-02)

The `PreMarkets` smart contract has been identified with reentrancy vulnerabilities in three functions: `abortAskOffer`, `abortBidTaker`, and `closeOffer`. These vulnerabilities can be exploited to manipulate contract state and potentially cause unauthorized fund transfers.

## Vulnerability Details

**Vulnerabilities:**

1. **Reentrancy in `abortAskOffer`**:
   - **Lines Affected:** 536-635
   - **External Call:** `tokenManager.addTokenBalance(...)`
   - **State Variable Written After Call:** `offerInfo.abortOfferStatus`

2. **Reentrancy in `abortBidTaker`**:
   - **Lines Affected:** 645-697
   - **External Call:** `tokenManager.addTokenBalance(...)`
   - **State Variable Written After Call:** `stockInfo.stockStatus`

3. **Reentrancy in `closeOffer`**:
   - **Lines Affected:** 406-460
   - **External Call:** `tokenManager.addTokenBalance(...)`
   - **State Variable Written After Call:** `offerInfo.offerStatus`

**Issue Description:**
These functions are vulnerable because they make external calls before updating state variables. This ordering allows attackers to re-enter the contract during the external call, potentially exploiting the contract's state before it is properly updated.

## Impact

Exploitation of these vulnerabilities can lead to:
- **Unauthorized Fund Transfers:** Attackers can exploit the contract to withdraw or misappropriate funds.
- **State Manipulation:** Attackers can alter the contract's state in an unintended manner, leading to possible denial of service or incorrect functionality.
- **Financial Loss:** Users or the contract owner could suffer financial losses due to the reentrancy attacks.

## Tools Used

- **Solidity:** For writing and deploying the smart contract.
- **Remix IDE:** For developing and testing the smart contract code.
- **Ethers.js / Web3.js:** For interacting with the Ethereum blockchain and smart contracts.
- **Custom Exploit Contract:** Used to demonstrate and exploit the reentrancy vulnerabilities.

## Recommendations

1. **Use Checks-Effects-Interactions Pattern:** 
   - Ensure that state changes are performed before making any external calls to mitigate the risk of reentrancy attacks.

2. **Implement Reentrancy Guards:**
   - Use reentrancy guards (e.g., the `nonReentrant` modifier) to prevent reentrant calls and protect against such attacks.

3. **Review and Refactor Code:**
   - Thoroughly review and refactor the contract code to follow best practices for security and ensure that all external calls are made after state changes.

4. **Conduct Comprehensive Testing:**
   - Perform extensive testing, including automated and manual tests, to identify and address potential vulnerabilities before deployment.






