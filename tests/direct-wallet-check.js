/**
 * BitcoinBazaar - Direct Wallet Check
 * Verificación directa usando la API de Stacks
 */

// Tu secret key configurada
const SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

async function checkWalletDirectly() {
  console.log('🔐 === VERIFICACIÓN DIRECTA DE WALLET ===\n')

  try {
    console.log('🔑 Secret Key configurada:', SECRET_KEY.substring(0, 20) + '...')
    
    // Para obtener la dirección real, necesitamos usar las librerías de Stacks
    // Por ahora, vamos a verificar si podemos hacer una consulta directa a la API
    console.log('📡 Verificando conectividad con la API de Stacks...')
    
    const testUrl = 'https://api.testnet.hiro.so/v2/info'
    const testResponse = await fetch(testUrl)
    
    if (!testResponse.ok) {
      throw new Error(`API no disponible: ${testResponse.status}`)
    }
    
    const testData = await testResponse.json()
    console.log('✅ API de Stacks disponible')
    console.log(`📊 Network: ${testData.network_id}`)
    console.log(`📊 Chain: ${testData.chain_id}`)

    // Ahora vamos a intentar obtener información de un wallet de ejemplo
    // para verificar que la API funciona
    console.log('\n🔍 Verificando API de balances...')
    
    // Usar una dirección de ejemplo para verificar que la API funciona
    const exampleAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    const balanceUrl = `https://api.testnet.hiro.so/extended/v1/address/${exampleAddress}/stx`
    
    const balanceResponse = await fetch(balanceUrl)
    if (balanceResponse.ok) {
      const balanceData = await balanceResponse.json()
      console.log('✅ API de balances funciona')
      console.log(`📊 Balance de ejemplo: ${balanceData.balance ? parseFloat(balanceData.balance) / 1000000 : 0} STX`)
    }

    console.log('\n📋 === INFORMACIÓN IMPORTANTE ===')
    console.log('Para obtener tu dirección real desde la secret key, necesitas:')
    console.log('1. Usar las librerías de Stacks correctamente')
    console.log('2. O usar un explorador de wallets como Leather')
    console.log('3. O calcular la dirección manualmente')

    console.log('\n🔗 === ENLACES ÚTILES ===')
    console.log('🌐 Explorer: https://explorer.hiro.so/?chain=testnet')
    console.log('🚰 Faucet: https://explorer.hiro.so/faucet?chain=testnet')
    console.log('📡 API: https://api.testnet.hiro.so')

    console.log('\n🚀 === PRÓXIMOS PASOS ===')
    console.log('1. Abre Leather wallet')
    console.log('2. Importa tu wallet con la secret key')
    console.log('3. Verifica que tengas STX en testnet')
    console.log('4. Si no tienes fondos, usa el faucet')
    console.log('5. Ejecuta los tests con: npm run test:integration')

    return true

  } catch (error) {
    console.error('❌ Error verificando wallet:', error.message)
    
    console.log('\n🔧 === SOLUCIÓN ===')
    console.log('1. Verifica tu conexión a internet')
    console.log('2. Asegúrate de que la API de Stacks esté disponible')
    console.log('3. Usa Leather wallet para verificar tu dirección')
    
    return false
  }
}

// Ejecutar verificación
checkWalletDirectly().catch(console.error)
