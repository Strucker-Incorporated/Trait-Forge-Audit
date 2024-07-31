-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil scopefile aderyn rust

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

all:  install build

# Clean the repo
clean:; forge clean


# Install necessary dependencies including Rust and Aderyn
install:; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && cargo install aderyn && forge install foundry-rs/forge-std --no-commit && forge install openzeppelin/openzeppelin-contracts --no-commit && forge install openzeppelin/openzeppelin-contracts-upgradeable --no-commit

# Install Rust
rust:; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env

# Install Aderyn
aderyn:; cargo install aderyn && aderyn .

# Update Dependencies
update:; forge update

openzeppelin:; forge install openzeppelin/openzeppelin-contracts --no-commit


build:; forge build

test:; forge test

snapshot:; forge snapshot

format:; forge fmt

anvil:; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

# Run Slither and output findings to slither_report.md, including ignored findings
slither:; slither . \
    --config-file slither.config.json \
    --checklist \
    --show-ignored-findings \
    > slither_report.md


scope:; tree ./src/ | sed 's/└/#/g; s/──/--/g; s/├/#/g; s/│ /|/g; s/│/|/g'

scopefile:; @tree ./src/ | sed 's/└/#/g' | awk -F '── ' '!/\.sol$$/ { path[int((length($$0) - length($$2))/2)] = $$2; next } { p = "src"; for(i=2; i<=int((length($$0) - length($$2))/2); i++) if (path[i] != "") p = p "/" path[i]; print p "/" $$2; }' > scope.txt