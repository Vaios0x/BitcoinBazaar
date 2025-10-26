#!/bin/bash

# Clean Contracts Script
# Removes duplicate content from all Clarity contracts

echo "🧹 Cleaning Clarity contracts..."

# List of contracts to clean
contracts=(
    "contracts/nft-core-sip009.clar"
    "contracts/marketplace-sbtc.clar"
    "contracts/bitcoin-oracle-advanced.clar"
    "contracts/gaming-nft-simple.clar"
    "contracts/nft-defi-simple.clar"
    "contracts/lazy-mint-simple.clar"
    "contracts/analytics-simple.clar"
    "contracts/governance-simple.clar"
    "contracts/escrow-simple-fixed.clar"
    "contracts/rewards-simple.clar"
)

# Function to clean a contract file
clean_contract() {
    local file="$1"
    echo "Cleaning $file..."
    
    # Create a backup
    cp "$file" "$file.backup"
    
    # Extract only the first occurrence of the contract content
    # This removes any duplicate content that might have been appended
    awk '
    BEGIN { in_contract = 0; content_started = 0 }
    /^;; [a-zA-Z-]+\.clar/ {
        if (content_started == 0) {
            content_started = 1
            in_contract = 1
            print $0
        } else {
            exit
        }
    }
    in_contract == 1 && content_started == 1 {
        print $0
    }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
}

# Clean all contracts
for contract in "${contracts[@]}"; do
    if [ -f "$contract" ]; then
        clean_contract "$contract"
        echo "✅ Cleaned $contract"
    else
        echo "⚠️  File not found: $contract"
    fi
done

echo "🎉 Contract cleaning completed!"
echo "📋 Running clarinet check..."

# Run clarinet check
clarinet check

if [ $? -eq 0 ]; then
    echo "✅ All contracts are now clean and valid!"
else
    echo "❌ Some contracts still have issues. Manual review needed."
fi
