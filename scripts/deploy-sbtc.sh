#!/bin/bash

# BitcoinBazaar sBTC Integration Deployment Script
# Deploy contracts with real sBTC integration to Stacks Testnet

echo "🚀 BitcoinBazaar sBTC Integration Deployment"
echo "============================================="

# Check if clarinet is installed
if ! command -v clarinet &> /dev/null; then
    echo "❌ Clarinet CLI not found. Please install it first."
    echo "   Visit: https://github.com/hirosystems/clarinet"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "Clarinet.toml" ]; then
    echo "❌ Clarinet.toml not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Pre-deployment checks..."
echo "✅ Clarinet CLI found"
echo "✅ Project directory confirmed"

# Generate deployment plan for sBTC contracts
echo "📝 Generating sBTC deployment plan..."
clarinet deployments generate --testnet

# Apply the deployment plan
echo "🚀 Deploying sBTC contracts to Stacks Testnet..."
clarinet deployments apply --testnet

if [ $? -eq 0 ]; then
    echo "✅ sBTC contracts deployed successfully!"
    echo ""
    echo "🔗 Contract Addresses:"
    echo "   - marketplace-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace-sbtc"
    echo "   - gaming-nft-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft-sbtc"
    echo "   - nft-defi-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi-sbtc"
    echo "   - analytics-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics-sbtc"
    echo ""
    echo "🌉 sBTC Bridge: https://sbtc.stacks.co"
    echo "🔍 Explorer: https://explorer.stacks.co"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "🎉 sBTC Integration Complete!"
echo "Your contracts now support both STX and sBTC payments."
