#!/usr/bin/env ts-node

/**
 * BitcoinBazaar - Quick Check
 * Verificación rápida del sistema de testing
 */

import { setupTestWallet } from './setup-test-wallet'
import { TEST_CONFIG } from './test-config'

// ⚠️ CONFIGURAR TU SECRET KEY AQUÍ
const SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

async function quickCheck() {
  console.log('⚡ === BITCOINBAZAAR QUICK CHECK ===\n')

  // Verificar configuración
  if (!SECRET_KEY || SECRET_KEY.length < 20) {
    console.log('❌ CONFIGURACIÓN REQUERIDA')
    console.log('1. Edita tests/quick-check.ts')
    console.log('2. Reemplaza YOUR_LEATHER_SECRET_KEY_HERE con tu secret key')
    console.log('3. Ejecuta nuevamente\n')
    return
  }

  console.log('✅ Secret key configurada\n')

  // Verificar wallet
  console.log('🔐 Verificando wallet...')
  try {
    await setupTestWallet(SECRET_KEY)
    console.log('✅ Wallet verificado\n')
  } catch (error) {
    console.error('❌ Error verificando wallet:', error)
    return
  }

  // Mostrar configuración
  console.log('📋 === CONFIGURACIÓN DE TESTING ===')
  console.log(`🌐 Network: ${TEST_CONFIG.network.name}`)
  console.log(`📡 API: ${TEST_CONFIG.network.coreApiUrl}`)
  console.log(`🔗 Explorer: ${TEST_CONFIG.network.explorerUrl}`)
  console.log(`💰 Min Balance: ${TEST_CONFIG.testing.minStxBalance} STX`)
  console.log(`⏱️  Timeout: ${TEST_CONFIG.testing.testTimeout}ms`)
  console.log(`🔄 Retries: ${TEST_CONFIG.testing.retryAttempts}`)

  // Mostrar contratos
  console.log('\n📄 === CONTRATOS DESPLEGADOS ===')
  Object.entries(TEST_CONFIG.contracts).forEach(([name, address]) => {
    console.log(`${name}: ${address}`)
  })

  // Mostrar comandos
  console.log('\n🚀 === COMANDOS DISPONIBLES ===')
  console.log('npm run test:integration     # Ejecutar todos los tests')
  console.log('npm run test:wallet         # Solo verificar wallet')
  console.log('npm run test:onchain        # Solo tests on-chain')
  console.log('npm run test:integration --verbose  # Modo verbose')

  console.log('\n✅ === QUICK CHECK COMPLETADO ===')
  console.log('¡El sistema está listo para testing!')
}

// Ejecutar si se llama directamente
if (require.main === module) {
  quickCheck().catch(console.error)
}

export { quickCheck }
