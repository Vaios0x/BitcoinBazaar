# Manual Deployment Script for BitcoinBazaar Contracts
# This script deploys contracts manually to Stacks Testnet

Write-Host "🚀 Deploying BitcoinBazaar Contracts to Stacks Testnet..." -ForegroundColor Green

# Set contract names
$contracts = @(
    "nft-core-fixed",
    "marketplace-core-simple", 
    "bitcoin-oracle-simple"
)

Write-Host "📋 Contracts to deploy:" -ForegroundColor Yellow
foreach ($contract in $contracts) {
    Write-Host "  - $contract" -ForegroundColor Cyan
}

Write-Host "`n⚠️  IMPORTANT: You need to configure a real mnemonic in settings/Testnet.toml" -ForegroundColor Red
Write-Host "   Replace the example mnemonic with your actual wallet mnemonic" -ForegroundColor Red

Write-Host "`n📝 Steps to complete deployment:" -ForegroundColor Yellow
Write-Host "1. Update settings/Testnet.toml with your real mnemonic" -ForegroundColor White
Write-Host "2. Ensure you have STX in your testnet wallet" -ForegroundColor White
Write-Host "3. Run: clarinet deployments generate --testnet --medium-cost" -ForegroundColor White
Write-Host "4. Run: clarinet deployments apply --testnet" -ForegroundColor White

Write-Host "`n🔗 Get testnet STX from faucet:" -ForegroundColor Green
Write-Host "   https://explorer.hiro.so/faucet?chain=testnet" -ForegroundColor Cyan

Write-Host "`n✅ Manual deployment instructions completed!" -ForegroundColor Green
