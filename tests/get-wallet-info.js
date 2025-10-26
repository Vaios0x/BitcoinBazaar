/**
 * BitcoinBazaar - Get Wallet Info
 * Obtener información del wallet usando la secret key
 */

// Tu secret key configurada
const SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

async function getWalletInfo() {
  console.log('🔐 === INFORMACIÓN DE WALLET ===\n')

  try {
    console.log('🔑 Secret Key configurada:', SECRET_KEY.substring(0, 20) + '...')
    
    // Verificar que la secret key tenga el formato correcto
    const words = SECRET_KEY.split(' ')
    console.log(`📝 Número de palabras: ${words.length}`)
    
    if (words.length !== 12) {
      console.log('❌ Error: La secret key debe tener 12 palabras')
      return false
    }
    
    console.log('✅ Formato de secret key correcto')
    
    // Mostrar las primeras y últimas palabras para verificación
    console.log(`📝 Primera palabra: ${words[0]}`)
    console.log(`📝 Última palabra: ${words[words.length - 1]}`)

    console.log('\n📋 === INSTRUCCIONES PARA OBTENER TU DIRECCIÓN ===')
    console.log('1. Abre Leather wallet en tu navegador')
    console.log('2. Haz clic en "Import Wallet"')
    console.log('3. Selecciona "Import with Secret Key"')
    console.log('4. Ingresa tu secret key:')
    console.log(`   ${SECRET_KEY}`)
    console.log('5. Haz clic en "Import"')
    console.log('6. Tu dirección aparecerá en el wallet')

    console.log('\n🔗 === ENLACES ÚTILES ===')
    console.log('🌐 Leather Wallet: https://leather.io')
    console.log('🌐 Explorer: https://explorer.hiro.so/?chain=testnet')
    console.log('🚰 Faucet: https://explorer.hiro.so/faucet?chain=testnet')

    console.log('\n💰 === VERIFICAR FONDOS ===')
    console.log('1. Una vez que tengas tu dirección, verifica tu balance')
    console.log('2. Si no tienes STX, ve al faucet')
    console.log('3. Solicita STX de testnet')
    console.log('4. Espera a que se confirme la transacción')

    console.log('\n🚀 === EJECUTAR TESTS ===')
    console.log('Una vez que tengas fondos, ejecuta:')
    console.log('npm run test:integration')

    return true

  } catch (error) {
    console.error('❌ Error obteniendo información:', error.message)
    return false
  }
}

// Ejecutar
getWalletInfo().catch(console.error)
