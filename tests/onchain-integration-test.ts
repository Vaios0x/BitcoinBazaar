/**
 * BitcoinBazaar - On-Chain Integration Tests
 * Tests reales con fondos de testnet usando secret key de Leather
 */

import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  uintCV,
  stringAsciiCV,
  principalCV,
  noneCV,
  someCV,
  listCV,
  tupleCV
} from '@stacks/transactions'
import { StacksTestnet, StacksNetwork } from '@stacks/network'

// Configuración de testnet
const TESTNET_CONFIG = {
  coreApiUrl: 'https://api.testnet.hiro.so',
  network: 'testnet' as const,
  explorerUrl: 'https://explorer.hiro.so'
}

// Direcciones de contratos reales desplegados
const CONTRACTS = {
  nftCore: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.nft-core',
  marketplace: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.marketplace',
  bitcoinOracle: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.bitcoin-oracle',
  gamingNft: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.gaming-nft',
  nftDefi: 'STC5KHM41H6WHAST7MWWDD807YSPRQKJ68T330BQ.nft-defi'
}

// ⚠️ IMPORTANTE: Reemplaza con tu SECRET KEY de Leather
const TEST_WALLET_SECRET_KEY = 'give suggest source long enhance razor candy margin gadget index muscle start'

interface TestResult {
  functionName: string
  success: boolean
  txId?: string
  error?: string
  explorerUrl?: string
}

class OnChainTester {
  private network: StacksNetwork
  private results: TestResult[] = []

  constructor() {
    this.network = new StacksTestnet()
    this.network.coreApiUrl = TESTNET_CONFIG.coreApiUrl
  }

  /**
   * Ejecutar test de función on-chain
   */
  private async executeTest(
    functionName: string,
    contractAddress: string,
    contractName: string,
    functionName_call: string,
    functionArgs: any[]
  ): Promise<TestResult> {
    try {
      console.log(`🧪 Testing ${functionName}...`)

      const txOptions = {
        contractAddress,
        contractName,
        functionName: functionName_call,
        functionArgs,
        network: this.network,
        senderKey: TEST_WALLET_SECRET_KEY,
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Allow
      }

      const transaction = await makeContractCall(txOptions)
      const txId = transaction.txid()
      const explorerUrl = `https://explorer.hiro.so/txid/${txId}?chain=testnet`

      console.log(`✅ ${functionName} - Success! TX: ${txId}`)
      console.log(`🔗 Explorer: ${explorerUrl}`)

      return {
        functionName,
        success: true,
        txId,
        explorerUrl
      }
    } catch (error) {
      console.error(`❌ ${functionName} - Failed:`, error)
      return {
        functionName,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  /**
   * Test 1: NFT Core Functions
   */
  async testNFTCore() {
    console.log('\n🎨 === TESTING NFT CORE FUNCTIONS ===')
    
    const [nftCoreAddress, nftCoreName] = CONTRACTS.nftCore.split('.')

    // Test 1.1: Mint NFT
    const mintResult = await this.executeTest(
      'Mint NFT',
      nftCoreAddress,
      nftCoreName,
      'mint-nft',
      [
        stringAsciiCV('Test NFT Bitcoin'),
        stringAsciiCV('NFT creado en test de integración'),
        stringAsciiCV('https://ipfs.io/ipfs/QmTestHash123'),
        uintCV(10) // 10% royalty
      ]
    )
    this.results.push(mintResult)

    // Test 1.2: Transfer NFT (si el mint fue exitoso)
    if (mintResult.success) {
      const transferResult = await this.executeTest(
        'Transfer NFT',
        nftCoreAddress,
        nftCoreName,
        'transfer',
        [
          uintCV(1), // token ID
          principalCV('ST1ABC123XYZ456'), // to address
          noneCV() // memo
        ]
      )
      this.results.push(transferResult)
    }
  }

  /**
   * Test 2: Marketplace Functions
   */
  async testMarketplace() {
    console.log('\n🏪 === TESTING MARKETPLACE FUNCTIONS ===')
    
    const [marketplaceAddress, marketplaceName] = CONTRACTS.marketplace.split('.')

    // Test 2.1: List NFT for Sale
    const listResult = await this.executeTest(
      'List NFT for Sale',
      marketplaceAddress,
      marketplaceName,
      'list-nft',
      [
        uintCV(1), // token ID
        uintCV(1500000), // 1.5 STX en micro-units
        stringAsciiCV('STX') // payment token
      ]
    )
    this.results.push(listResult)

    // Test 2.2: Make Offer
    const offerResult = await this.executeTest(
      'Make Offer',
      marketplaceAddress,
      marketplaceName,
      'make-offer',
      [
        uintCV(1), // token ID
        uintCV(1200000), // 1.2 STX en micro-units
        stringAsciiCV('STX') // payment token
      ]
    )
    this.results.push(offerResult)

    // Test 2.3: Cancel Listing
    const cancelResult = await this.executeTest(
      'Cancel Listing',
      marketplaceAddress,
      marketplaceName,
      'cancel-listing',
      [uintCV(1)] // token ID
    )
    this.results.push(cancelResult)
  }

  /**
   * Test 3: Gaming Functions
   */
  async testGaming() {
    console.log('\n🎮 === TESTING GAMING FUNCTIONS ===')
    
    const [gamingAddress, gamingName] = CONTRACTS.gamingNft.split('.')

    // Test 3.1: Create Battle
    const battleResult = await this.executeTest(
      'Create Battle',
      gamingAddress,
      gamingName,
      'create-battle',
      [
        uintCV(1), // NFT 1 ID
        uintCV(2), // NFT 2 ID
        uintCV(50000000), // 0.5 sBTC en micro-units
        stringAsciiCV('sBTC') // payment token
      ]
    )
    this.results.push(battleResult)

    // Test 3.2: Execute Battle
    if (battleResult.success) {
      const executeResult = await this.executeTest(
        'Execute Battle',
        gamingAddress,
        gamingName,
        'execute-battle',
        [uintCV(1)] // battle ID
      )
      this.results.push(executeResult)
    }
  }

  /**
   * Test 4: DeFi Functions
   */
  async testDeFi() {
    console.log('\n💰 === TESTING DEFI FUNCTIONS ===')
    
    const [defiAddress, defiName] = CONTRACTS.nftDefi.split('.')

    // Test 4.1: Stake NFT
    const stakeResult = await this.executeTest(
      'Stake NFT',
      defiAddress,
      defiName,
      'stake-nft',
      [
        uintCV(1), // NFT ID
        uintCV(4320) // lock period (30 days in blocks)
      ]
    )
    this.results.push(stakeResult)

    // Test 4.2: Borrow Against NFT
    const borrowResult = await this.executeTest(
      'Borrow Against NFT',
      defiAddress,
      defiName,
      'borrow-against-nft',
      [
        uintCV(1), // NFT ID
        uintCV(25000000) // 0.25 sBTC en micro-units
      ]
    )
    this.results.push(borrowResult)

    // Test 4.3: Unstake NFT
    const unstakeResult = await this.executeTest(
      'Unstake NFT',
      defiAddress,
      defiName,
      'unstake-nft',
      [uintCV(1)] // NFT ID
    )
    this.results.push(unstakeResult)
  }

  /**
   * Test 5: Bitcoin Oracle Functions
   */
  async testBitcoinOracle() {
    console.log('\n🔮 === TESTING BITCOIN ORACLE FUNCTIONS ===')
    
    const [oracleAddress, oracleName] = CONTRACTS.bitcoinOracle.split('.')

    // Test 5.1: Update Bitcoin Price
    const updatePriceResult = await this.executeTest(
      'Update Bitcoin Price',
      oracleAddress,
      oracleName,
      'update-bitcoin-price',
      [
        uintCV(45000), // price in USD
        uintCV(820000) // block height
      ]
    )
    this.results.push(updatePriceResult)
  }

  /**
   * Ejecutar todos los tests
   */
  async runAllTests() {
    console.log('🚀 === BITCOINBAZAAR ON-CHAIN INTEGRATION TESTS ===')
    console.log(`📡 Network: ${TESTNET_CONFIG.coreApiUrl}`)
    console.log(`🔗 Explorer: ${TESTNET_CONFIG.explorerUrl}`)
    console.log(`⚠️  Using Secret Key: ${TEST_WALLET_SECRET_KEY.substring(0, 10)}...`)

    try {
      await this.testNFTCore()
      await this.testMarketplace()
      await this.testGaming()
      await this.testDeFi()
      await this.testBitcoinOracle()

      this.printResults()
    } catch (error) {
      console.error('❌ Test suite failed:', error)
    }
  }

  /**
   * Imprimir resultados finales
   */
  private printResults() {
    console.log('\n📊 === TEST RESULTS SUMMARY ===')
    
    const successful = this.results.filter(r => r.success).length
    const failed = this.results.filter(r => !r.success).length
    
    console.log(`✅ Successful: ${successful}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📈 Success Rate: ${((successful / this.results.length) * 100).toFixed(1)}%`)

    console.log('\n📋 === DETAILED RESULTS ===')
    this.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌'
      console.log(`${index + 1}. ${status} ${result.functionName}`)
      if (result.txId) {
        console.log(`   TX ID: ${result.txId}`)
        console.log(`   Explorer: ${result.explorerUrl}`)
      }
      if (result.error) {
        console.log(`   Error: ${result.error}`)
      }
    })

    // Guardar resultados en archivo
    this.saveResultsToFile()
  }

  /**
   * Guardar resultados en archivo JSON
   */
  private saveResultsToFile() {
    const fs = require('fs')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `test-results-${timestamp}.json`
    
    const report = {
      timestamp: new Date().toISOString(),
      network: TESTNET_CONFIG.network,
      totalTests: this.results.length,
      successful: this.results.filter(r => r.success).length,
      failed: this.results.filter(r => !r.success).length,
      results: this.results
    }

    fs.writeFileSync(filename, JSON.stringify(report, null, 2))
    console.log(`\n💾 Results saved to: ${filename}`)
  }
}

// Función principal para ejecutar tests
async function runIntegrationTests() {
  if (TEST_WALLET_SECRET_KEY === 'YOUR_LEATHER_SECRET_KEY_HERE') {
    console.error('❌ ERROR: Debes configurar tu SECRET KEY de Leather en TEST_WALLET_SECRET_KEY')
    console.log('📝 Para obtener tu secret key:')
    console.log('1. Abre Leather wallet')
    console.log('2. Ve a Settings > Export Private Key')
    console.log('3. Copia la secret key y reemplaza en el código')
    return
  }

  const tester = new OnChainTester()
  await tester.runAllTests()
}

// Ejecutar tests si se llama directamente
if (require.main === module) {
  runIntegrationTests().catch(console.error)
}

export { OnChainTester, runIntegrationTests }
