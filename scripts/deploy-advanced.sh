#!/bin/bash

# Advanced Deployment Script for BitcoinBazaar with sBTC Integration
# This script deploys SIP-009 compliant contracts with sBTC support

echo "🚀 Deploying BitcoinBazaar Advanced Contracts to Stacks Testnet..."
echo "📋 Features: SIP-009 NFTs, sBTC Integration, Advanced Oracle"

# Set contract names
CONTRACTS=(
    "nft-core-sip009"
    "marketplace-sbtc" 
    "bitcoin-oracle-advanced"
)

echo "📋 Contracts to deploy:"
for contract in "${CONTRACTS[@]}"; do
    echo "  - $contract"
done

echo ""
echo "🔧 Advanced Features:"
echo "  ✅ SIP-009 NFT Standard Compliance"
echo "  ✅ sBTC Integration for Bitcoin-native payments"
echo "  ✅ Advanced Bitcoin Price Oracle"
echo "  ✅ Post-conditions for security"
echo "  ✅ Contract-caller authorization"
echo "  ✅ Burn-block-height timestamps"

echo ""
echo "⚠️  IMPORTANT: Configure your mnemonic in settings/Testnet.toml"
echo "   Replace the example mnemonic with your actual wallet mnemonic"

echo ""
echo "📝 Deployment Steps:"
echo "1. Update settings/Testnet.toml with your real mnemonic"
echo "2. Ensure you have STX in your testnet wallet"
echo "3. Run: clarinet deployments generate --testnet --medium-cost"
echo "4. Run: clarinet deployments apply --testnet"

echo ""
echo "🔗 Get testnet STX from faucet:"
echo "   https://explorer.hiro.so/faucet?chain=testnet"

echo ""
echo "🎯 sBTC Integration:"
echo "   - sBTC contract: ST1R1061ZT6KPJXQ7PAXPFB6ZAR6V2W3KGH5RZJFV.sbtc"
echo "   - Bitcoin programable 1:1 with BTC"
echo "   - DeFi integration ready"

echo ""
echo "✅ Advanced deployment instructions completed!"
