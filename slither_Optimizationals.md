Summary
 - [constable-states](#constable-states) (5 results) (Optimization)
 - [immutable-states](#immutable-states) (5 results) (Optimization)
## constable-states
Impact: Optimization
Confidence: High
 - [ ] ID-0
[EntropyGenerator.batchSize1](contracts/EntropyGenerator/EntropyGenerator.sol#L14) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L14


 - [ ] ID-1
[EntropyGenerator.maxNumberIndex](contracts/EntropyGenerator/EntropyGenerator.sol#L18) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L18


 - [ ] ID-2
[EntropyGenerator.maxSlotIndex](contracts/EntropyGenerator/EntropyGenerator.sol#L17) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L17


 - [ ] ID-3
[EntropyGenerator.batchSize2](contracts/EntropyGenerator/EntropyGenerator.sol#L15) should be constant 

contracts/EntropyGenerator/EntropyGenerator.sol#L15


 - [ ] ID-4
[TraitForgeNft.maxTokensPerGen](contracts/TraitForgeNft/TraitForgeNft.sol#L22) should be constant 

contracts/TraitForgeNft/TraitForgeNft.sol#L22


## immutable-states
Impact: Optimization
Confidence: High
 - [ ] ID-5
[DAOFund.token](contracts/DAOFund/DAOFund.sol#L8) should be immutable 

contracts/DAOFund/DAOFund.sol#L8


 - [ ] ID-6
[DAOFund.uniswapV2Router](contracts/DAOFund/DAOFund.sol#L9) should be immutable 

contracts/DAOFund/DAOFund.sol#L9


 - [ ] ID-7
[EntityTrading.nftContract](contracts/EntityTrading/EntityTrading.sol#L12) should be immutable 

contracts/EntityTrading/EntityTrading.sol#L12


 - [ ] ID-8
[Trait._decimals](contracts/Trait/Trait.sol#L8) should be immutable 

contracts/Trait/Trait.sol#L8


 - [ ] ID-9
[EntityForging.nftContract](contracts/EntityForging/EntityForging.sol#L11) should be immutable 

contracts/EntityForging/EntityForging.sol#L11


