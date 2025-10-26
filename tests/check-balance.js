/**
 * BitcoinBazaar - Check Balance
 * Verificar balance de una dirección específica
 */

// Función para verificar balance de una dirección
async function checkBalance(address) {
  console.log('💰 === VERIFICACIÓN DE BALANCE ===\n')

  try {
    console.log(`📍 Address: ${address}`)
    
    // Verificar balance usando la API de Stacks
    console.log('📡 Consultando API de Stacks...')
    const apiUrl = `https://api.testnet.hiro.so/extended/v1/address/${address}/stx`
    
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`)
      return false
    }
    
    const data = await response.json()
    const stxBalance = data.balance ? parseFloat(data.balance) / 1000000 : 0
    
    console.log(`💰 STX Balance: ${stxBalance} STX`)
    console.log(`📊 Balance en microSTX: ${data.balance}`)
    
    // Verificar si tiene fondos suficientes para testing
    const hasFunds = stxBalance > 1.0
    console.log(`✅ Has Funds: ${hasFunds ? 'YES' : 'NO'}`)
    
    if (hasFunds) {
      console.log('\n🎉 === ¡WALLET LISTO PARA TESTING! ===')
      console.log('Tu wallet tiene fondos suficientes para ejecutar los tests')
      console.log('\n🚀 Para ejecutar los tests:')
      console.log('npm run test:integration')
    } else {
      console.log('\n⚠️  === FONDOS REQUERIDOS ===')
      console.log('Para ejecutar los tests necesitas al menos 1 STX en testnet')
      console.log('1. Ve al faucet: https://explorer.hiro.so/faucet?chain=testnet')
      console.log('2. Solicita STX de testnet')
      console.log('3. Espera a que se confirme la transacción')
      console.log('4. Ejecuta este script nuevamente')
    }
    
    // Mostrar enlaces útiles
    console.log('\n🔗 === ENLACES ÚTILES ===')
    console.log(`🌐 Explorer: https://explorer.hiro.so/address/${address}?chain=testnet`)
    console.log(`🚰 Faucet: https://explorer.hiro.so/faucet?chain=testnet`)
    console.log(`📡 API: ${apiUrl}`)
    
    return hasFunds

  } catch (error) {
    console.error('❌ Error verificando balance:', error.message)
    return false
  }
}

// Función principal
async function main() {
  console.log('🔐 === VERIFICADOR DE BALANCE ===\n')
  
  // Obtener dirección del usuario
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('📝 Uso: node tests/check-balance.js <dirección>')
    console.log('📝 Ejemplo: node tests/check-balance.js ST1ABC123XYZ456')
    console.log('\n💡 Para obtener tu dirección:')
    console.log('1. Abre Leather wallet')
    console.log('2. Importa tu wallet con la secret key')
    console.log('3. Copia tu dirección')
    return
  }
  
  const address = args[0]
  console.log(`🔍 Verificando balance para: ${address}`)
  
  const hasFunds = await checkBalance(address)
  
  if (hasFunds) {
    console.log('\n✅ ¡Listo para testing!')
  } else {
    console.log('\n❌ Necesitas obtener fondos primero')
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { checkBalance }
