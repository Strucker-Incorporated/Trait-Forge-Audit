// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Airdrop/IAirdrop.sol";

contract MaliciousContract {
    IAirdrop public airdropContract;
    IERC20 public traitToken;

    constructor(address _airdropAddress, address _traitTokenAddress) {
        airdropContract = IAirdrop(_airdropAddress);
        traitToken = IERC20(_traitTokenAddress);
    }

    function attack(uint256 amount) external {
        // Approve the Airdrop contract to transfer tokens on behalf of this contract
        traitToken.approve(address(airdropContract), amount);

        // Call the startAirdrop function on the Airdrop contract
        (bool success, ) = address(airdropContract).call(
            abi.encodeWithSignature("startAirdrop(uint256)", amount)
        );
        require(success, "Attack failed");
    }
}
