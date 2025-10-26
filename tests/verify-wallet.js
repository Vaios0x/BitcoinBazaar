/**
 * BitcoinBazaar - Wallet Verification
 * Verificación simple del wallet con fondos
 */

const { StacksTestnet } = require('@stacks/network')
const { getAddressFromPrivateKey, TransactionVersion } = require('@stacks/transactions')

// Tu secret key configurada
const SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

async function verifyWallet() {
  console.log('🔐 === VERIFICACIÓN DE WALLET ===\n')

  try {
    // Obtener dirección del wallet
    const address = getAddressFromPrivateKey(SECRET_KEY, TransactionVersion.Testnet)
    console.log(`📍 Address: ${address}`)

    // Configurar red
    const network = new StacksTestnet()
    network.coreApiUrl = 'https://api.testnet.hiro.so'

    // Obtener balance STX
    console.log('💰 Verificando balance STX...')
    const stxResponse = await fetch(`${network.coreApiUrl}/extended/v1/address/${address}/stx`)
    const stxData = await stxResponse.json()
    const stxBalance = stxData.balance ? parseFloat(stxData.balance) / 1000000 : 0

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
    console.log(`📡 API: https://api.testnet.hiro.so/extended/v1/address/${address}/stx`)

    console.log('\n✅ === WALLET VERIFICADO ===')
    console.log('¡Tu wallet está listo para testing!')
    console.log('\n🚀 Para ejecutar los tests:')
    console.log('npm run test:integration')

    return true

  } catch (error) {
    console.error('❌ Error verificando wallet:', error.message)
    return false
  }
}

// Ejecutar verificación
verifyWallet().catch(console.error)
