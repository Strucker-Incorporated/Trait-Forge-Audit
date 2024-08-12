### **Filtered Report**

#### **High Issues**
1. **H-1: Unprotected initializer**  
   **Status:** New issue  
   **Action:** Keep in report

2. **H-2: Uninitialized State Variables**  
   **Status:** **Duplicate** of [Low-6] Missing zero address check in constructor  
   **Action:** **Remove from report**

3. **H-3: Sending native Eth is not protected from these functions.**  
   **Status:** New issue  
   **Action:** Keep in report

4. **H-4: Contract locks Ether without a withdraw function.**  
   **Status:** **Duplicate** of [Medium-3] Contract contains payable functions but no withdraw/sweep function  
   **Action:** **Remove from report**

#### **Low Issues**
1. **L-1: Centralization Risk for trusted owners**  
   **Status:** **Duplicate** of [Medium-1] Privileged functions can create points of failure  
   **Action:** **Remove from report**

2. **L-2: Unsafe ERC20 Operations should not be used**  
   **Status:** **Duplicate** of [NonCritical-1] Unsafe use of transfer()/transferFrom() with IERC20  
   **Action:** **Remove from report**

3. **L-3: Solidity pragma should be specific, not wide**  
   **Status:** **Duplicate** of [Low-25] Avoid floating pragma in non-interface/library files  
   **Action:** **Remove from report**

4. **L-4: Missing checks for address(0) when assigning values to address state variables**  
   **Status:** **Duplicate** of [Low-2] Missing checks for address(0x0) when updating address state variables  
   **Action:** **Remove from report**

5. **L-5: Define and use constant variables instead of using literals**  
   **Status:** New issue  
   **Action:** Keep in report

6. **L-6: Event is missing indexed fields**  
   **Status:** **Duplicate** of [Low-24] Indexed strings/bytes in events can result in data loss  
   **Action:** **Remove from report**

7. **L-7: PUSH0 is not supported by all chains**  
   **Status:** **Duplicate** of [Low-4] Solidity version 0.8.23 won't work on all chains due to MCOPY / [Low-26] Solidity version 0.8.20 won't work on all chains due to PUSH0  
   **Action:** **Remove from report**

8. **L-8: Modifiers invoked only once can be shoe-horned into the function**  
   **Status:** **Duplicate** of [Gas-17] Inline modifiers used only once  
   **Action:** **Remove from report**

9. **L-9: Large literal values multiples of 10000 can be replaced with scientific notation**  
   **Status:** New issue  
   **Action:** Keep in report

10. **L-10: Internal functions called only once can be inlined**  
    **Status:** **Duplicate** of [Gas-19] Internal functions only used once can be inlined to save gas  
    **Action:** **Remove from report**

11. **L-11: Unused Custom Error**  
    **Status:** New issue  
    **Action:** Keep in report

#### **Medium Issues**
- [incorrect-equality] (8 results) **Status:** New issue  
  **Action:** Keep in report

- [reentrancy-no-eth] (3 results) **Status:** New issue  
  **Action:** Keep in report

- [uninitialized-local] (2 results) **Status:** **Duplicate** of [Low-27] Read only reentrancy risk detected  
  **Action:** **Remove from report**

- [events-maths] (1 result) **Status:** New issue  
  **Action:** Keep in report

- [missing-zero-check] (4 results) **Status:** **Duplicate** of [Low-2] Missing checks for address(0x0) when updating address state variables  
  **Action:** **Remove from report**

- [reentrancy-events] (16 results) **Status:** **Duplicate** of [Low-21] Functions calling contracts/addresses with transfer hooks are missing reentrancy guards  
  **Action:** **Remove from report**

- [timestamp] (4 results) **Status:** New issue  
  **Action:** Keep in report

- [assembly] (1 result) **Status:** New issue  
  **Action:** Keep in report

- [cyclomatic-complexity] (1 result) **Status:** **Duplicate** of [NonCritical-20] Cyclomatic complexity in functions  
  **Action:** **Remove from report**

- [low-level-calls] (3 results) **Status:** **Duplicate** of [Low-16] Low Level Calls to Custom Addresses  
  **Action:** **Remove from report**

- [reentrancy-unlimited-gas] (2 results) **Status:** New issue  
  **Action:** Keep in report

- [unused-import] (4 results) **Status:** **Duplicate** of [NonCritical-21] Unused import  
  **Action:** **Remove from report**

- [unused-state] (1 result) **Status:** **Duplicate** of [NonCritical-9] Avoid updating storage when the value hasn't changed  
  **Action:** **Remove from report**

- [constable-states] (1 result) **Status:** New issue  
  **Action:** Keep in report

- [immutable-states] (2 results) **Status:** New issue  
  **Action:** Keep in report

### **Final Modified Report**

#### **High Issues**
- **H-1: Unprotected initializer**
- **H-3: Sending native Eth is not protected from these functions**

#### **Low Issues**
- **L-5: Define and use constant variables instead of using literals**
- **L-9: Large literal values multiples of 10000 can be replaced with scientific notation**
- **L-11: Unused Custom Error**

#### **Medium Issues**
- [incorrect-equality] (8 results)
- [reentrancy-no-eth] (3 results)
- [events-maths] (1 result)
- [timestamp] (4 results)
- [assembly] (1 result)
- [reentrancy-unlimited-gas] (2 results)
- [constable-states] (1 result)
- [immutable-states] (2 results)

---
