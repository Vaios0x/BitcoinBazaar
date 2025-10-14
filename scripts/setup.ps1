# BitcoinBazaar Setup Script for Windows

Write-Host "🚀 Setting up BitcoinBazaar Development Environment" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check Node.js version
$nodeVersion = (node -v).Substring(1).Split('.')[0]
if ([int]$nodeVersion -lt 18) {
    Write-Host "❌ Node.js version 18+ required. Current version: $(node -v)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js $(node -v) detected" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Check if Clarinet is installed
if (-not (Get-Command clarinet -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing Clarinet..." -ForegroundColor Yellow
    $clarinetUrl = "https://github.com/hirosystems/clarinet/releases/download/latest/clarinet-windows-x64.zip"
    $tempPath = "$env:TEMP\clarinet.zip"
    $installPath = "$env:LOCALAPPDATA\clarinet"
    
    Invoke-WebRequest -Uri $clarinetUrl -OutFile $tempPath
    Expand-Archive -Path $tempPath -DestinationPath $installPath -Force
    Remove-Item $tempPath
    
    # Add to PATH
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($currentPath -notlike "*$installPath*") {
        [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$installPath", "User")
    }
    
    Write-Host "✅ Clarinet installed" -ForegroundColor Green
}

# Setup environment
Write-Host "⚙️ Setting up environment..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Copy-Item "env.example" ".env.local"
    Write-Host "📝 Created .env.local from template" -ForegroundColor Green
    Write-Host "⚠️  Please edit .env.local with your configuration" -ForegroundColor Yellow
}

# Run tests
Write-Host "🧪 Running smart contract tests..." -ForegroundColor Yellow
clarinet test

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Some tests failed. Please check the output above." -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env.local with your configuration" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "3. Run 'clarinet deploy --testnet' to deploy contracts" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
