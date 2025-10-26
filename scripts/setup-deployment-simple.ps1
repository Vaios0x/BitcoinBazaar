# Setup Deployment Script for BitcoinBazaar
Write-Host "BitcoinBazaar - Setup para Despliegue en Testnet" -ForegroundColor Cyan
Write-Host ""

Write-Host "Pasos para configurar el despliegue:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Obtener STX de Testnet:" -ForegroundColor White
Write-Host "   - Ve a: https://explorer.hiro.so/sandbox/faucet?chain=testnet" -ForegroundColor Gray
Write-Host "   - Conecta tu wallet (Leather/Xverse)" -ForegroundColor Gray
Write-Host "   - Solicita STX de testnet" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Configurar Mnemonic Real:" -ForegroundColor White
Write-Host "   - Abre tu wallet (Leather/Xverse)" -ForegroundColor Gray
Write-Host "   - Ve a Settings > Show Secret Key" -ForegroundColor Gray
Write-Host "   - Copia tu mnemonic" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Actualizar settings/Testnet.toml:" -ForegroundColor White
Write-Host "   - Reemplaza el mnemonic de ejemplo" -ForegroundColor Gray
Write-Host "   - Guarda el archivo" -ForegroundColor Gray
Write-Host ""

# Show current mnemonic
$currentMnemonic = (Get-Content "settings/Testnet.toml" | Select-String "mnemonic").Line
if ($currentMnemonic -match "abandon abandon abandon") {
    Write-Host "Mnemonic actual es de ejemplo (no funcional):" -ForegroundColor Red
    Write-Host $currentMnemonic -ForegroundColor Gray
    Write-Host ""
    Write-Host "Necesitas configurar un mnemonic real para desplegar" -ForegroundColor Red
} else {
    Write-Host "Mnemonic configurado (no es de ejemplo)" -ForegroundColor Green
    Write-Host $currentMnemonic -ForegroundColor Gray
}

Write-Host ""
Write-Host "Costos de despliegue:" -ForegroundColor Yellow
Write-Host "   - bitcoin-oracle: 0.040730 STX" -ForegroundColor Gray
Write-Host "   - marketplace: 0.056310 STX" -ForegroundColor Gray
Write-Host "   - nft-core: 0.040500 STX" -ForegroundColor Gray
Write-Host "   - Total: 0.137540 STX" -ForegroundColor White
Write-Host ""

Write-Host "Comandos para desplegar:" -ForegroundColor Yellow
Write-Host "   clarinet deployments apply --testnet" -ForegroundColor Gray
Write-Host ""

Write-Host "Verificar despliegue:" -ForegroundColor Yellow
Write-Host "   https://explorer.hiro.so/?chain=testnet" -ForegroundColor Gray
Write-Host ""

Write-Host "Tienes un mnemonic real configurado? Si no, sigue los pasos arriba." -ForegroundColor Cyan
