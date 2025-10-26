/**
 * BitcoinBazaar - Real Wallet Check
 * Verificación real del wallet usando las librerías de Stacks
 */

// Importar las librerías necesarias
const { getAddressFromPrivateKey, TransactionVersion } = require('@stacks/transactions')

// Tu secret key configurada
const SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

async function checkRealWallet() {
  console.log('🔐 === VERIFICACIÓN REAL DE WALLET ===\n')

  try {
    // Obtener dirección real desde secret key
    console.log('🔑 Calculando dirección desde secret key...')
    const address = getAddressFromPrivateKey(SECRET_KEY, TransactionVersion.Testnet)
    console.log(`📍 Address: ${address}`)

    // Verificar balance usando la API de Stacks
    console.log('💰 Verificando balance STX...')
    const apiUrl = `https://api.testnet.hiro.so/extended/v1/address/${address}/stx`
    
    console.log(`📡 Consultando API: ${apiUrl}`)
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`)
      const errorText = await response.text()
      console.log(`Error details: ${errorText}`)
      return false
    }
    
    const data = await response.json()
    console.log('📊 Datos de la API:', JSON.stringify(data, null, 2))
    
    const stxBalance = data.balance ? parseFloat(data.balance) / 1000000 : 0
    console.log(`💰 STX Balance: ${stxBalance} STX`)

    // Verificar si tiene fondos suficientes
    const hasFunds = stxBalance > 1.0
    console.log(`✅ Has Funds: ${hasFunds ? 'YES' : 'NO'}`)

    if (!hasFunds) {
      console.log('\n⚠️  === FONDOS REQUERIDOS ===')
      console.log('Para ejecutar los tests necesitas al menos 1 STX en testnet')
      console.log('1. Ve al faucet: https://explorer.hiro.so/faucet?chain=testnet')
      console.log('2. Solicita STX de testnet')
      console.log('3. Espera a que se confirme la transacción')
      console.log('4. Ejecuta la verificación nuevamente')
      return false
    }

    // Mostrar enlaces útiles
    console.log('\n🔗 === ENLACES ÚTILES ===')
    console.log(`🌐 Explorer: https://explorer.hiro.so/address/${address}?chain=testnet`)
    console.log(`🚰 Faucet: https://explorer.hiro.so/faucet?chain=testnet`)
    console.log(`📡 API: ${apiUrl}`)

    console.log('\n✅ === WALLET VERIFICADO ===')
    console.log('¡Tu wallet está listo para testing!')
    console.log('\n🚀 Para ejecutar los tests:')
    console.log('npm run test:integration')

    return true

  } catch (error) {
    console.error('❌ Error verificando wallet:', error.message)
    console.error('Stack trace:', error.stack)
    
    console.log('\n🔧 === SOLUCIÓN ===')
    console.log('1. Verifica que tu secret key sea correcta')
    console.log('2. Asegúrate de tener conexión a internet')
    console.log('3. Si el problema persiste, usa el faucet para obtener STX')
    
    return false
  }
}

// Ejecutar verificación
checkRealWallet().catch(console.error)
