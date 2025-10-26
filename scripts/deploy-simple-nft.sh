#!/bin/bash

# Deploy Simple NFT Contract to Stacks Testnet
# This script deploys a working NFT contract

echo "🚀 Deploying Simple NFT Contract to Stacks Testnet..."

# Set the contract name
CONTRACT_NAME="simple-nft"

# Deploy the contract using clarinet
clarinet contract publish --manifest ./Clarinet.toml

echo "✅ Contract deployment initiated!"
echo "📋 Contract Name: $CONTRACT_NAME"
echo "🔗 Check deployment status in the explorer"
echo "⏳ This may take a few minutes to confirm..."

# Wait for user confirmation
read -p "Press Enter to continue after deployment is confirmed..."
