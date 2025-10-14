#!/bin/bash

echo "🚀 Deploying BitcoinBazaar to Stacks Testnet"
echo ""

# Check Clarinet installed
if ! command -v clarinet &> /dev/null; then
  echo "❌ Clarinet not found. Installing..."
  curl -L https://github.com/hirosystems/clarinet/releases/download/latest/clarinet-linux-x64.tar.gz | tar xz
  sudo mv clarinet /usr/local/bin/
fi

# Run tests first
echo "🧪 Running test suite..."
clarinet test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Fix errors before deploying."
  exit 1
fi
echo "✅ All tests passed!"

# Deploy to testnet
echo "📦 Deploying contracts to Stacks Testnet..."
clarinet deploy --testnet
if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment successful!"
  echo ""
  echo "📝 Deployed contracts:"
  echo " - nft-core"
  echo " - marketplace-core"
  echo " - bitcoin-oracle"
  echo " - auction"
  echo " - lazy-mint"
  echo " - analytics"
  echo " - governance"
  echo " - escrow"
  echo " - rewards"
  echo ""
  echo "🔗 View on explorer: https://explorer.hiro.so/?chain=testnet"
else
  echo "❌ Deployment failed"
  exit 1
fi
