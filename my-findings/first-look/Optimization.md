# ***Optimizations**

### Constable States
- **EntropyGenerator**:
  - `batchSize1` should be `constant` ([L14](contracts/EntropyGenerator/EntropyGenerator.sol#L14))
  - `maxNumberIndex` should be `constant` ([L18](contracts/EntropyGenerator/EntropyGenerator.sol#L18))
  - `maxSlotIndex` should be `constant` ([L17](contracts/EntropyGenerator/EntropyGenerator.sol#L17))
  - `batchSize2` should be `constant` ([L15](contracts/EntropyGenerator/EntropyGenerator.sol#L15))

- **TraitForgeNft**:
  - `maxTokensPerGen` should be `constant` ([L22](contracts/TraitForgeNft/TraitForgeNft.sol#L22))
