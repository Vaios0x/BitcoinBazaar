# Clean Contracts Script for Windows PowerShell
Write-Host "Cleaning Clarity contracts..." -ForegroundColor Cyan

# List of contracts to clean
$contracts = @(
    "contracts/nft-core-sip009.clar",
    "contracts/marketplace-sbtc.clar", 
    "contracts/bitcoin-oracle-advanced.clar",
    "contracts/gaming-nft-simple.clar",
    "contracts/nft-defi-simple.clar",
    "contracts/lazy-mint-simple.clar",
    "contracts/analytics-simple.clar",
    "contracts/governance-simple.clar",
    "contracts/escrow-simple-fixed.clar",
    "contracts/rewards-simple.clar"
)

# Function to clean a contract file
function Clean-Contract {
    param($file)
    Write-Host "Cleaning $file..." -ForegroundColor Yellow
    
    if (Test-Path $file) {
        # Create a backup
        Copy-Item $file "$file.backup"
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Split by the first occurrence of a new contract header
        $lines = $content -split "`n"
        $cleanedLines = @()
        $foundFirstContract = $false
        
        foreach ($line in $lines) {
            if ($line -match "^;; [a-zA-Z-]+\.clar") {
                if (-not $foundFirstContract) {
                    $foundFirstContract = $true
                    $cleanedLines += $line
                } else {
                    # Stop at the second contract header
                    break
                }
            } elseif ($foundFirstContract) {
                $cleanedLines += $line
            }
        }
        
        # Write the cleaned content back
        $cleanedLines | Out-File $file -Encoding UTF8
        Write-Host "Cleaned $file" -ForegroundColor Green
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}

# Clean all contracts
foreach ($contract in $contracts) {
    Clean-Contract $contract
}

Write-Host "Contract cleaning completed!" -ForegroundColor Green
Write-Host "Running clarinet check..." -ForegroundColor Cyan

# Run clarinet check
$result = & clarinet check 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "All contracts are now clean and valid!" -ForegroundColor Green
} else {
    Write-Host "Some contracts still have issues. Manual review needed." -ForegroundColor Red
    Write-Host $result
}
