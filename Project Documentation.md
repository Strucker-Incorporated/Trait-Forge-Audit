# TraitForge

## NFT Honeypot Game with Strategic P2P Gameplay

### Abstract

TraitForge is a revolutionary NFT project that introduces an engaging game revolving around a central honeypot, offering strategic gameplay and strong value-accrual elements. It contrasts traditional NFT projects, which often lack compelling roadmaps or value mechanisms. By incorporating strategic gameplay, airdrops, and an elite community. TraitForge aims to become a pivotal NFT game that attracts players of all backgrounds.

### Introduction

NFT projects are often characterized by lackluster gameplay and speculative profiteering. TraitForge aims to change this by creating a vibrant ecosystem where entities (NFTs) are central to gameplay and economic activity.

### Entities

TraitForge entities are NFTs with unique, programmatically generated art and traits. Each generation offers 10,000 entities with four main physical traits, 3 gameplay traits and an assigned role: Forger or Merger.

- **Generation 1 Mint:** The first generation starts with 10,000 entities at prices beginning at 0.005 ETH and increasing incrementally up to 0.25 ETH.

### Honeypot - "Nuke Fund"

The Nuke Fund accumulates ETH from game fees and mints. Players can claim a portion of the fund based on their entity’s Nuke Factor, which determines the percentage of the Honeypot an entity can claim upon "nuking." Nuking permanently removes the entity from the game.

### Entropy

Each entity's traits and parameters are derived from a 6-digit entropy value. Parameters include:
- **Role (Forger or Merger)**
- **Nuke Factor**
- **Performance Factor**
- **Forge Potential**

### Gameplay Features

1. **Minting Entities:**
   - Mint unique entities with varying traits.
   - Compete to secure higher entropy values.

2. **Trading:**
   - Buy and sell entities on the TraitForge marketplace.
   - Tailored for the unique dynamics of the game.

3. **Forging:**
   - Combine two entities to forge a new one.
   - A new entity inherits averaged traits from its parents.

4. **Nuking:**
   - Claim a share of the Nuke Fund by nuking an entity, removing it from the game infinitely.

### Generations

Entities evolve through generations, with each generation capped at 10,000 entities. Generation 1 directly mints Generation 2 entities via forging, up to Generation 10.
When the entire generation mints out, the minting will begin at the point of how many entities exist in the next gen. eg, Gen-1 mints out, 50 gen-2s already exist from forging, gen-2 minting will start at #51.

### Economics

- **Nuke Fund Income:** 10% of Forge fees and sales, and 100% of Mint fees go into the Nuke Fund.
- **Dev & DAO Funds:** 10% of all Nuke Fund income streams to the Dev/DAO Fund.
- **Airdrop:** Players who mint or forge entities are recorded in the Airdrop Contract, securing 50% of the total $TRAIT supply.

### $TRAIT Token

- **Supply:** 1 billion tokens.
- **Distribution:**
  - 50% Airdrop
  - 30% Devs
  - 10% Investors
  - 10% Liquidity

### Strategy

The game has multiple strategies: "Hold to Age," "Forge till Death," "Sell from Mint," or "Nuke to Win." to name a few.

### Conclusion

TraitForge reimagines the NFT gaming landscape with its strategic gameplay and robust economic mechanics. The project offers an immersive, lucrative experience that scales from a niche game to an industry behemoth.

### Requirements

- **Contracts:**
  - Airdrop Contract (Airdrop Mechanics)
  - DAOFund (Post Airdrop Economical System)
  - DevFund (Pre Airdrop Revenue System)
  - Forging Contract (Rules for Forging Entities)
  - Trading Contract (Rules for Trading Entities)
  - Entropy Generator Contract (Entropy Generation and Derivation)
  - NukeFund Contract (Rules for Nuking + HoneyPot Fund Management)
  - $TRAIT (ERC20 token contract)
  - NFT Contract (Entity traits, Ownership and Rules for Minting/Forging)

# Airdrop Guide

## Overview

The TraitForge airdrop allocates tokens based on the entropy of the entities you've minted or forged. The higher the entropy, the greater your airdrop allocation.

### Entropy-based Allocation

The airdrop rewards players who have minted or forged entities with higher entropy. For example:

- **Allocation Mapping**: Users addresses are mapped in the smart-contract, the mapping is 'userInfo' which maps and combines all entropies of tokens you've minted/forged into one number. Larger userInfo recieves a higher allocation from the $TRAIT Airdrop.

### Address Mapping

When you mint or forge an entity, your wallet address is automatically mapped and recorded in our system. This ensures that your address is eligible for any airdrop tokens based on your 'userInfo' value.

### Key Highlights

- Your wallet address is mapped automatically when minting or forging.
- Higher entropy entities yield a greater token allocation.
- The Airdrop will occur and if you have an allocation, you must claim your allocation.

## Next Steps

Keep minting and forging to maximize your airdrop potential. Stay tuned for updates on token distribution, and don't hesitate to reach out with any questions.

---

**Disclaimer**: Make sure you are using the correct wallet address to receive your airdrop. TraitForge will not be responsible for tokens lost due to incorrect address usage.

# TRAIT Token

TRAIT is a token created for the TraitForge ecosystem, implementing a unique buy/burn model to create value and sustainability. Below is a guide to help you understand the basic functionality and structure of TRAIT.

## Overview

- **Token Name:** $TRAIT
- **Total Supply:** 1,000,000,000
- **Standard:** ERC-20
- **Burnable**
- **50% to Airdrop**
- **30% to Devs**
- **10% to Investors**
- **20% to Liquidity**

## Features
-  To secure funding for enhancements and team expansion.
-  To provide rewards that motivate contributors to develop the product.
-  To give everyone an opportunity to support the product's growth and adoption.

### Minting

- At deployment, a specified amount of $TRAIT will minted and airdropped.

### Burning

- The `burn` function allows users to permanently remove a specified amount of tokens from circulation, reducing the total supply.

### Buy/Burn Model

- **Buy:** $TRAIT Tokens will be bought by the DAO Fund with a portion of game revenue.
- **Burn:** The model incorporates a burning mechanism that burns the TRAIT Tokens bought by the DAO. This creates a gradual supply decrease, increasing $TRAIT value. The more game economy, the more the $TRAIT price increases.

### Airdrop Distribution

- The $TRAIT token will be distributed via airdrop to eligible users based on their activities and entity entropy within TraitForge.
- Higher value 'userInfo' receive more $TRAIT tokens.

# Forging Entities

Combine traits to create something unique! Here's how to forge entities in TraitForge.
This is done in the 'Forging' page.

## How Forging Works

1. **Roles:** Each entity is either a Forger or Merger.
   - **Forger:** Lists their entity and sets a fee.
   - **Merger:** Pays the fee to combine their entity with the Forger.
2. **Create a New Entity:**
   - The new entity is forged with traits averaged from both parents.
   - **Forger:** Receives the ETH fee.
   - **Merger:** Gains ownership of the newly forged entity.

Start forging to create powerful combinations!
# Minting Entities

Welcome to the world of TraitForge! To begin your journey, follow these steps to mint your first entity.

## How to Mint an Entity

1. **Visit the Homepage:** Start by heading to the TraitForge.game homepage.
2. **Traits:** Each entity comes with four traits:
   - **nukeFactor**
   - **forgePotential**
   - **performanceFactor**
   - **Forger or Merger.**
3. **Single vs. Batch Minting:** 
   - **Single Minting:** Mint one entity at a time, securing the best available at the time.
   - **Batch Minting:** Mint multiple entities simultaneously based on your budget, you will be automatically refunded any ETH that wasn't spent.

Explore the ecosystem by starting with your unique entity!
# Nuking Entities

Maximize your rewards by engaging with the HoneyPot. Here’s how nuking works.

## How to Nuke an Entity

1. **HoneyPot:** The HoneyPot accumulates most of the game fees, 100% of Mint fee, 10% of Trading and Forging fees.
2. **Nuke Factor:** Each entity has a unique nukeFactor that determines the percentage of the HoneyPot you can claim. nukeFactor increases over time (2.5% per year * performanceFactor).
3. **Claim Your Share:**
   - By nuking your entity, you permanently remove it from the game.
   - In return, you claim a portion of the HoneyPot based on the nukeFactor.

Nuking can be a strategic way to maximize your rewards, but remember that it's a permanent choice!

# Trading Entities

Take advantage of the dynamic TraitForge marketplace to trade your entities.

## How to Trade

1. **Visit the Marketplace:** Access our marketplace through the TraitForge website.
2. **Buying Entities:**
   - Browse through the listed entities.
   - Select the one that suits your strategy.
   - Complete the purchase using your connected wallet.
3. **Selling Entities:**
   - List your entity on the marketplace with a price.
   - Wait for a buyer to complete the transaction.

Our marketplace is designed to be intuitive, similar to other platforms like OpenSea but tailored to the unique dynamics of TraitForge.

# TraitForge FAQ

## What wallets can I connect to the game?

There are hundreds and thousands of wallets you can connect, with the main ones being:

- **MetaMask**
- **Trust Wallet**
- **Coinbase Wallet**

Make sure your chosen wallet is set up and ready for use.

## What chain is TraitForge on?

TraitForge operates on the **Base** blockchain.

For more detailed information on how to interact with TraitForge, check out the comprehensive documentation or reach out to our support team.

---

Stay tuned for more updates!
