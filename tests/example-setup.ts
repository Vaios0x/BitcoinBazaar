/**
 * BitcoinBazaar - Example Test Setup
 * Ejemplo de cómo configurar y ejecutar los tests
 */

import { setupTestWallet } from './setup-test-wallet'
import { OnChainTester } from './onchain-integration-test'

// ⚠️ PASO 1: CONFIGURAR TU SECRET KEY
const YOUR_SECRET_KEY = 'YOUR_LEATHER_SECRET_KEY_HERE'

/**
 * Ejemplo de configuración paso a paso
 */
async function exampleSetup() {
  console.log('🎯 === BITCOINBAZAAR TEST SETUP EXAMPLE ===\n')

  // Paso 1: Verificar configuración
  if (YOUR_SECRET_KEY === 'YOUR_LEATHER_SECRET_KEY_HERE') {
    console.log('❌ PASO 1: Configurar Secret Key')
    console.log('1. Abre Leather wallet')
    console.log('2. Ve a Settings > Export Private Key')
    console.log('3. Copia la secret key')
    console.log('4. Reemplaza YOUR_LEATHER_SECRET_KEY_HERE en este archivo')
    console.log('\n⚠️  IMPORTANTE: Solo usa secret keys de TESTNET\n')
    return
  }

  console.log('✅ PASO 1: Secret Key configurada\n')

  // Paso 2: Verificar wallet
  console.log('🔐 PASO 2: Verificando wallet...')
  try {
    await setupTestWallet(YOUR_SECRET_KEY)
    console.log('✅ Wallet verificado correctamente\n')
  } catch (error) {
    console.error('❌ Error verificando wallet:', error)
    return
  }

  // Paso 3: Ejecutar tests
  console.log('🧪 PASO 3: Ejecutando tests on-chain...')
  try {
    const tester = new OnChainTester()
    await tester.runAllTests()
    console.log('✅ Tests completados\n')
  } catch (error) {
    console.error('❌ Error ejecutando tests:', error)
    return
  }

  console.log('🎉 === SETUP COMPLETADO ===')
  console.log('¡Todos los tests se ejecutaron correctamente!')
}

/**
 * Ejemplo de test individual
 */
async function exampleIndividualTest() {
  console.log('🧪 === EJEMPLO DE TEST INDIVIDUAL ===\n')

  // Ejemplo: Test de mint NFT
  console.log('Ejemplo: Crear un NFT')
  console.log('```typescript')
  console.log('const txId = await mintNFT(')
  console.log('  "Mi NFT Bitcoin",')
  console.log('  "NFT creado en test",')
  console.log('  "https://ipfs.io/ipfs/QmHash123",')
  console.log('  10 // 10% royalty')
  console.log(')')
  console.log('console.log("NFT creado:", txId)')
  console.log('```\n')

  // Ejemplo: Test de marketplace
  console.log('Ejemplo: Listar NFT para venta')
  console.log('```typescript')
  console.log('const txId = await listNFT(')
  console.log('  1, // NFT ID')
  console.log('  1.5, // Precio en STX')
  console.log('  "STX" // Token de pago')
  console.log(')')
  console.log('console.log("NFT listado:", txId)')
  console.log('```\n')
}

/**
 * Ejemplo de verificación de resultados
 */
async function exampleResultVerification() {
  console.log('📊 === VERIFICACIÓN DE RESULTADOS ===\n')

  console.log('1. Revisar logs en consola')
  console.log('2. Verificar transacciones en explorer:')
  console.log('   https://explorer.hiro.so/?chain=testnet')
  console.log('3. Revisar archivo de resultados JSON')
  console.log('4. Verificar balances en tu wallet\n')

  console.log('🔗 Enlaces útiles:')
  console.log('- Explorer: https://explorer.hiro.so/?chain=testnet')
  console.log('- Faucet: https://explorer.hiro.so/faucet?chain=testnet')
  console.log('- API: https://api.testnet.hiro.so')
}

// Ejecutar ejemplos
if (require.main === module) {
  exampleSetup()
    .then(() => exampleIndividualTest())
    .then(() => exampleResultVerification())
    .catch(console.error)
}

export { exampleSetup, exampleIndividualTest, exampleResultVerification }
