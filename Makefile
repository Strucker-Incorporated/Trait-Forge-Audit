-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil scopefile aderyn rust echidna

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

all: install build

# Clean the repo
clean:; forge clean

# Install necessary dependencies including Rust, Aderyn, and Echidna
install:; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && cargo install aderyn && forge install foundry-rs/forge-std --no-commit && forge install openzeppelin/openzeppelin-contracts --no-commit && forge install openzeppelin/openzeppelin-contracts-upgradeable --no-commit && $(MAKE) echidna

# Install Rust
rust:; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env

# Install Aderyn
aderyn:; cargo install aderyn && aderyn .

To integrate the download and setup of Echidna into your Makefile, you can add a new target for installing Echidna. Here's how you can modify your Makefile:

makefile
Copy code
-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil scopefile aderyn rust echidna

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

all: install build

# Clean the repo
clean:; forge clean

# Install necessary dependencies including Rust, Aderyn, and Echidna
install:; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && cargo install aderyn && forge install foundry-rs/forge-std --no-commit && forge install openzeppelin/openzeppelin-contracts --no-commit && forge install openzeppelin/openzeppelin-contracts-upgradeable --no-commit && $(MAKE) echidna

# Install Rust
rust:; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env

# Install Aderyn
aderyn:; cargo install aderyn && aderyn .

# Install Echidna
echidna:
	curl -L -o echidna-2.2.4-aarch64-macos.tar.gz https://github.com/crytic/echidna/releases/download/v2.2.4/echidna-2.2.4-aarch64-macos.tar.gz
	tar -xzf echidna-2.2.4-aarch64-macos.tar.gz
	chmod +x echidna
	mv echidna /usr/local/bin/echidna


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

scope:; tree ./contracts/ | sed 's/└/#/g; s/──/--/g; s/├/#/g; s/│ /|/g; s/│/|/g'

scopefile:; @echo "Using existing scope file: scope.txt"
