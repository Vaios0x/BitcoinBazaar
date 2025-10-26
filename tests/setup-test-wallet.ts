/**
 * BitcoinBazaar - Test Wallet Setup
 * Configuración y verificación de wallet para testing
 */

import { StacksTestnet } from '@stacks/network'
import { getAddressFromPrivateKey, TransactionVersion } from '@stacks/transactions'

interface WalletInfo {
  address: string
  balance: {
    stx: number
    sbtc: number
  }
  hasFunds: boolean
}

class TestWalletSetup {
  private network: StacksTestnet
  private secretKey: string

  constructor(secretKey: string) {
    this.secretKey = secretKey
    this.network = new StacksTestnet()
    this.network.coreApiUrl = 'https://api.testnet.hiro.so'
  }

  /**
   * Obtener información del wallet
   */
  async getWalletInfo(): Promise<WalletInfo> {
    try {
      const address = getAddressFromPrivateKey(this.secretKey, TransactionVersion.Testnet)
      
      // Obtener balance STX
      const stxResponse = await fetch(`${this.network.coreApiUrl}/extended/v1/address/${address}/stx`)
      const stxData = await stxResponse.json()
      const stxBalance = stxData.balance ? parseFloat(stxData.balance) / 1000000 : 0

      // Obtener balance sBTC (simulado - en realidad necesitarías verificar el contrato sBTC)
      const sbtcBalance = 0 // TODO: Implementar verificación de balance sBTC

      return {
        address,
        balance: {
          stx: stxBalance,
          sbtc: sbtcBalance
        },
        hasFunds: stxBalance > 1 // Necesitamos al menos 1 STX para testing
      }
    } catch (error) {
      throw new Error(`Error getting wallet info: ${error}`)
    }
  }

  /**
   * Verificar si el wallet tiene fondos suficientes
   */
  async checkFunds(): Promise<boolean> {
    const walletInfo = await this.getWalletInfo()
    return walletInfo.hasFunds
  }

  /**
   * Obtener enlaces útiles
   */
  getUsefulLinks(address: string) {
    return {
      explorer: `https://explorer.hiro.so/address/${address}?chain=testnet`,
      faucet: 'https://explorer.hiro.so/faucet?chain=testnet',
      api: `https://api.testnet.hiro.so/extended/v1/address/${address}/stx`
    }
  }

  /**
   * Imprimir información del wallet
   */
  async printWalletInfo() {
    console.log('🔐 === TEST WALLET INFORMATION ===')
    
    try {
      const walletInfo = await this.getWalletInfo()
      const links = this.getUsefulLinks(walletInfo.address)

      console.log(`📍 Address: ${walletInfo.address}`)
      console.log(`💰 STX Balance: ${walletInfo.balance.stx} STX`)
      console.log(`🪙 sBTC Balance: ${walletInfo.balance.sbtc} sBTC`)
      console.log(`✅ Has Funds: ${walletInfo.hasFunds ? 'YES' : 'NO'}`)
      
      console.log('\n🔗 === USEFUL LINKS ===')
      console.log(`🌐 Explorer: ${links.explorer}`)
      console.log(`🚰 Faucet: ${links.faucet}`)
      console.log(`📡 API: ${links.api}`)

      if (!walletInfo.hasFunds) {
        console.log('\n⚠️  === FUNDS REQUIRED ===')
        console.log('Para ejecutar los tests necesitas al menos 1 STX en testnet')
        console.log('1. Ve al faucet: https://explorer.hiro.so/faucet?chain=testnet')
        console.log('2. Solicita STX de testnet')
        console.log('3. Espera a que se confirme la transacción')
        console.log('4. Ejecuta los tests nuevamente')
      }

    } catch (error) {
      console.error('❌ Error getting wallet info:', error)
    }
  }
}

/**
 * Configurar wallet para testing
 */
export async function setupTestWallet(secretKey: string) {
  const setup = new TestWalletSetup(secretKey)
  await setup.printWalletInfo()
  return setup
}

/**
 * Verificar configuración antes de ejecutar tests
 */
export async function verifyTestSetup(secretKey: string): Promise<boolean> {
  try {
    const setup = new TestWalletSetup(secretKey)
    const hasFunds = await setup.checkFunds()
    
    if (!hasFunds) {
      console.log('❌ Wallet no tiene fondos suficientes para testing')
      return false
    }
    
    console.log('✅ Wallet configurado correctamente para testing')
    return true
  } catch (error) {
    console.error('❌ Error verificando configuración:', error)
    return false
  }
}

export { TestWalletSetup }
