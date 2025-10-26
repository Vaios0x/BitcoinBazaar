#!/usr/bin/env ts-node

/**
 * BitcoinBazaar - Test Suite Runner
 * Ejecuta todos los tests on-chain con fondos reales
 */

import { OnChainTester, runIntegrationTests } from './onchain-integration-test'
import { setupTestWallet, verifyTestSetup } from './setup-test-wallet'

// ⚠️ CONFIGURACIÓN REQUERIDA
const TEST_WALLET_SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

interface TestConfig {
  secretKey: string
  runWalletCheck: boolean
  runAllTests: boolean
  verbose: boolean
}

class TestRunner {
  private config: TestConfig

  constructor(config: TestConfig) {
    this.config = config
  }

  /**
   * Ejecutar verificación de wallet
   */
  async runWalletCheck() {
    console.log('🔐 === WALLET VERIFICATION ===')
    
    if (this.config.secretKey === 'YOUR_LEATHER_SECRET_KEY_HERE') {
      console.error('❌ ERROR: Debes configurar tu SECRET KEY de Leather')
      console.log('\n📝 === CÓMO OBTENER TU SECRET KEY ===')
      console.log('1. Abre Leather wallet en tu navegador')
      console.log('2. Ve a Settings (⚙️)')
      console.log('3. Selecciona "Export Private Key"')
      console.log('4. Copia la secret key')
      console.log('5. Reemplaza YOUR_LEATHER_SECRET_KEY_HERE en este archivo')
      console.log('\n⚠️  IMPORTANTE: Nunca compartas tu secret key con nadie')
      return false
    }

    try {
      await setupTestWallet(this.config.secretKey)
      const isValid = await verifyTestSetup(this.config.secretKey)
      
      if (!isValid) {
        console.log('\n❌ Wallet no está listo para testing')
        return false
      }
      
      console.log('\n✅ Wallet verificado correctamente')
      return true
    } catch (error) {
      console.error('❌ Error verificando wallet:', error)
      return false
    }
  }

  /**
   * Ejecutar todos los tests on-chain
   */
  async runAllTests() {
    console.log('\n🚀 === EXECUTING ON-CHAIN TESTS ===')
    
    try {
      const tester = new OnChainTester()
      await tester.runAllTests()
      return true
    } catch (error) {
      console.error('❌ Error ejecutando tests:', error)
      return false
    }
  }

  /**
   * Ejecutar suite completa
   */
  async run() {
    console.log('🎯 === BITCOINBAZAAR TEST SUITE ===')
    console.log(`📅 Timestamp: ${new Date().toISOString()}`)
    console.log(`🔧 Configuration: ${JSON.stringify(this.config, null, 2)}`)

    let success = true

    // Paso 1: Verificar wallet
    if (this.config.runWalletCheck) {
      const walletOk = await this.runWalletCheck()
      if (!walletOk) {
        console.log('\n❌ Wallet check failed. Aborting tests.')
        return false
      }
    }

    // Paso 2: Ejecutar tests on-chain
    if (this.config.runAllTests) {
      const testsOk = await this.runAllTests()
      if (!testsOk) {
        console.log('\n❌ On-chain tests failed.')
        success = false
      }
    }

    // Resumen final
    console.log('\n📊 === FINAL SUMMARY ===')
    if (success) {
      console.log('✅ All tests completed successfully!')
    } else {
      console.log('❌ Some tests failed. Check the logs above.')
    }

    return success
  }
}

/**
 * Función principal
 */
async function main() {
  const args = process.argv.slice(2)
  
  // Parsear argumentos
  const config: TestConfig = {
    secretKey: TEST_WALLET_SECRET_KEY,
    runWalletCheck: !args.includes('--skip-wallet-check'),
    runAllTests: !args.includes('--skip-tests'),
    verbose: args.includes('--verbose')
  }

  // Mostrar ayuda si se solicita
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🎯 BitcoinBazaar Test Suite

Usage: npm run test:integration [options]

Options:
  --skip-wallet-check    Skip wallet verification
  --skip-tests          Skip on-chain tests
  --verbose             Enable verbose logging
  --help, -h            Show this help

Examples:
  npm run test:integration                    # Run all tests
  npm run test:integration --skip-wallet-check  # Skip wallet check
  npm run test:integration --verbose          # Verbose output
`)
    return
  }

  const runner = new TestRunner(config)
  const success = await runner.run()
  
  process.exit(success ? 0 : 1)
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
}

export { TestRunner, main }
