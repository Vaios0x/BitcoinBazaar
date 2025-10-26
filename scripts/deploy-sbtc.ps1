# BitcoinBazaar sBTC Integration Deployment Script
# Deploy contracts with real sBTC integration to Stacks Testnet

Write-Host "🚀 BitcoinBazaar sBTC Integration Deployment" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if clarinet is installed
try {
    $clarinetVersion = clarinet --version
    Write-Host "✅ Clarinet CLI found: $clarinetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Clarinet CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "   Visit: https://github.com/hirosystems/clarinet" -ForegroundColor Yellow
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "Clarinet.toml")) {
    Write-Host "❌ Clarinet.toml not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Pre-deployment checks..." -ForegroundColor Blue
Write-Host "✅ Clarinet CLI found" -ForegroundColor Green
Write-Host "✅ Project directory confirmed" -ForegroundColor Green

# Generate deployment plan for sBTC contracts
Write-Host "📝 Generating sBTC deployment plan..." -ForegroundColor Blue
clarinet deployments generate --testnet

# Apply the deployment plan
Write-Host "🚀 Deploying sBTC contracts to Stacks Testnet..." -ForegroundColor Blue
clarinet deployments apply --testnet

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ sBTC contracts deployed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Contract Addresses:" -ForegroundColor Cyan
    Write-Host "   - marketplace-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace-sbtc" -ForegroundColor White
    Write-Host "   - gaming-nft-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft-sbtc" -ForegroundColor White
    Write-Host "   - nft-defi-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi-sbtc" -ForegroundColor White
    Write-Host "   - analytics-sbtc: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics-sbtc" -ForegroundColor White
    Write-Host ""
    Write-Host "🌉 sBTC Bridge: https://sbtc.stacks.co" -ForegroundColor Yellow
    Write-Host "🔍 Explorer: https://explorer.stacks.co" -ForegroundColor Yellow
} else {
    Write-Host "❌ Deployment failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 sBTC Integration Complete!" -ForegroundColor Green
Write-Host "Your contracts now support both STX and sBTC payments." -ForegroundColor Green
