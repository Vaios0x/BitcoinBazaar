#!/bin/bash

# Redeploy BitcoinBaazar Contracts to Stacks Testnet
echo "🚀 Redeploying BitcoinBaazar Contracts to Stacks Testnet..."

# Set contract names
NFT_CORE="nft-core-fixed"
MARKETPLACE="marketplace"
BITCOIN_ORACLE="bitcoin-oracle"

echo "📋 Contracts to deploy:"
echo "  - $NFT_CORE"
echo "  - $MARKETPLACE" 
echo "  - $BITCOIN_ORACLE"

# Deploy NFT Core
echo "🎨 Deploying NFT Core contract..."
clarinet contract publish --manifest ./Clarinet.toml --contract $NFT_CORE

# Deploy Marketplace
echo "🏪 Deploying Marketplace contract..."
clarinet contract publish --manifest ./Clarinet.toml --contract $MARKETPLACE

# Deploy Bitcoin Oracle
echo "🔮 Deploying Bitcoin Oracle contract..."
clarinet contract publish --manifest ./Clarinet.toml --contract $BITCOIN_ORACLE

echo "✅ All contracts deployment initiated!"
echo "📋 Check deployment status in the explorer"
echo "⏳ This may take a few minutes to confirm..."

# Wait for user confirmation
read -p "Press Enter to continue after all deployments are confirmed..."

echo "🎉 Contracts redeployed successfully!"
echo "🔗 Check the explorer for new contract addresses"
