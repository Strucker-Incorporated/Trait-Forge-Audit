-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil scopefile aderyn rust echidna slither foundry

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

all: install build

# Clean the repo
clean:
	forge clean

# Install necessary dependencies including Rust, Aderyn, Echidna, Slither, and Foundry
install:
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && cargo install aderyn && forge install foundry-rs/forge-std --no-commit && forge install openzeppelin/openzeppelin-contracts --no-commit && forge install openzeppelin/openzeppelin-contracts-upgradeable --no-commit && $(MAKE) echidna && $(MAKE) slither && $(MAKE) foundry

# Install Rust
rust:
	curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env

# Install Aderyn
aderyn:
	cargo install aderyn && aderyn .

# Install Echidna
echidna:
	curl -L -o echidna-2.2.4-x86_64-linux.tar.gz https://github.com/crytic/echidna/releases/download/v2.2.4/echidna-2.2.4-x86_64-linux.tar.gz
	tar -xzf echidna-2.2.4-x86_64-linux.tar.gz
	sudo chmod +x echidna
	mv echidna /usr/local/bin/echidna

# Install Slither
slither:
	pip install slither-analyzer

# Install Foundry
foundry:
	curl -L https://foundry.paradigm.xyz | bash
	source $HOME/.foundry/env && foundryup

# Update Dependencies
update:
	forge update

openzeppelin:
	forge install openzeppelin/openzeppelin-contracts --no-commit

build:
	forge build

test:
	forge test

snapshot:
	forge snapshot

format:
	forge fmt

anvil:
	anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

# Run Slither and output findings to slither_report.md, including ignored findings
slither:
	slither . \
	    --config-file slither.config.json \
	    --checklist \
	    --show-ignored-findings \
	    > slither_report.md

scope:
	tree ./contracts/ | sed 's/└/#/g; s/──/--/g; s/├/#/g; s/│ /|/g; s/│/|/g'

scopefile:
	@echo "Using existing scope file: scope.txt"
