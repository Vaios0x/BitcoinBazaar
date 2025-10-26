# BitcoinBazaar sBTC Simple Deployment Script
# Deploy sBTC contracts one by one to avoid hanging

Write-Host "🚀 BitcoinBazaar sBTC Simple Deployment" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Function to deploy a single contract
function Deploy-Contract {
    param(
        [string]$ContractName,
        [string]$ContractFile
    )
    
    Write-Host "📦 Deploying $ContractName..." -ForegroundColor Blue
    
    # Create individual deployment plan
    $planContent = @"
id: 0
name: "$ContractName Deployment"
network: testnet
stacks-node: "https://api.testnet.hiro.so"
bitcoin-node: "http://blockstack:blockstacksystem@bitcoind.testnet.stacks.co:18332"
plan:
  batches:
    - id: 0
      transactions:
        - contract-publish:
            contract-name: $ContractName
            expected-sender: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR
            cost: 50000
            path: "contracts/$ContractFile"
            anchor-block-only: true
            clarity-version: 3
      epoch: "3.2"
"@
    
    $planFile = "deployments/temp-$ContractName-plan.yaml"
    $planContent | Out-File -FilePath $planFile -Encoding UTF8
    
    try {
        # Deploy with timeout
        $process = Start-Process -FilePath "clarinet" -ArgumentList "deployments", "apply", "--deployment-plan-path", $planFile -NoNewWindow -PassThru -RedirectStandardOutput "deploy-$ContractName.log" -RedirectStandardError "deploy-$ContractName-error.log"
        
        # Wait for completion with timeout
        $timeout = 60 # 60 seconds timeout
        $process.WaitForExit($timeout * 1000)
        
        if ($process.ExitCode -eq 0) {
            Write-Host "✅ $ContractName deployed successfully!" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ $ContractName deployment failed" -ForegroundColor Red
            Get-Content "deploy-$ContractName-error.log" | Write-Host -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Error deploying $ContractName : $($_.Exception.Message)" -ForegroundColor Red
        return $false
    } finally {
        # Cleanup
        if (Test-Path $planFile) { Remove-Item $planFile }
        if (Test-Path "deploy-$ContractName.log") { Remove-Item "deploy-$ContractName.log" }
        if (Test-Path "deploy-$ContractName-error.log") { Remove-Item "deploy-$ContractName-error.log" }
    }
}

# Deploy contracts one by one
$contracts = @(
    @{Name="marketplace-sbtc-real"; File="marketplace-sbtc-real.clar"},
    @{Name="gaming-nft-sbtc-real"; File="gaming-nft-sbtc-real.clar"},
    @{Name="nft-defi-sbtc-real"; File="nft-defi-sbtc-real.clar"},
    @{Name="analytics-sbtc-real"; File="analytics-sbtc-real.clar"}
)

$successCount = 0
$totalCount = $contracts.Count

foreach ($contract in $contracts) {
    Write-Host "`n🔄 Deploying $($contract.Name)..." -ForegroundColor Yellow
    
    if (Deploy-Contract -ContractName $contract.Name -ContractFile $contract.File) {
        $successCount++
        Write-Host "✅ $($contract.Name) completed!" -ForegroundColor Green
    } else {
        Write-Host "❌ $($contract.Name) failed!" -ForegroundColor Red
    }
    
    # Wait between deployments
    Start-Sleep -Seconds 5
}

Write-Host "`n🎉 Deployment Summary:" -ForegroundColor Green
Write-Host "✅ Successful: $successCount/$totalCount" -ForegroundColor Green
Write-Host "❌ Failed: $($totalCount - $successCount)/$totalCount" -ForegroundColor Red

if ($successCount -eq $totalCount) {
    Write-Host "`n🚀 All sBTC contracts deployed successfully!" -ForegroundColor Green
    Write-Host "🔗 Contract Addresses:" -ForegroundColor Cyan
    Write-Host "   - marketplace-sbtc-real: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.marketplace-sbtc-real" -ForegroundColor White
    Write-Host "   - gaming-nft-sbtc-real: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.gaming-nft-sbtc-real" -ForegroundColor White
    Write-Host "   - nft-defi-sbtc-real: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.nft-defi-sbtc-real" -ForegroundColor White
    Write-Host "   - analytics-sbtc-real: ST29PFXYP90ZPXMRWXY6181CWHWS57JZWABP9EXMR.analytics-sbtc-real" -ForegroundColor White
} else {
    Write-Host "`n⚠️ Some deployments failed. Check the logs above." -ForegroundColor Yellow
}
